const accountConfig = window.AP_ARCADE_CONFIG || {};
let accountClient = null;
let accountSyncVersion = 0;
let currentAccountUserId = null;
let currentAccountEmail = "";
let accountSyncTimer = 0;

function accountMessage(message){
  const element = document.getElementById("accountStatus");
  if (element) element.textContent = message;
}

function contentMessage(message){
  const element = document.getElementById("publicContentStatus");
  if (element) element.textContent = message;
}

function updateAccountControls(user){
  const signedIn = Boolean(user);
  document.getElementById("accountActions")?.classList.toggle("hidden", !signedIn);
  document.querySelector(".account-form")?.classList.toggle("hidden", signedIn);
  const heading = document.getElementById("accountHeading");
  if (heading) heading.textContent = signedIn ? user.email : "SIGN IN OR JOIN";
}

function parseProgress(value, label){
  if (!value) return null;
  try {
    const progress = JSON.parse(value);
    if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
      throw new Error("Saved progress has an invalid format.");
    }
    return progress;
  } catch (error) {
    console.error(`${label} could not be read.`, error);
    throw new Error(`${label} could not be read. Your saved data was not changed.`);
  }
}

function getLocalProgress(userId){
  const ownerId = localStorage.getItem("apArcadeProgressUserId");
  const cached = parseProgress(localStorage.getItem(`apArcadeProgress:${userId}`), "Account progress");
  if (ownerId && ownerId !== userId) {
    return { progress: cached, needsRestore: Boolean(cached) };
  }
  if (!ownerId && cached) return { progress: cached, needsRestore: true };

  const state = parseProgress(localStorage.getItem("apStemQuestState"), "Browser progress");
  const world = parseProgress(localStorage.getItem("apArcadeScholarWilds"), "Scholar's Wilds save");
  if (!state) return { progress: null, needsRestore: false };
  return { progress: { state, world }, needsRestore: false };
}

function writeLocalProgress(progress, userId){
  if (!progress || typeof progress !== "object" || !progress.state || typeof progress.state !== "object") {
    throw new Error("The account returned progress in an invalid format.");
  }
  localStorage.setItem("apStemQuestState", JSON.stringify(progress.state));
  if (progress.world) localStorage.setItem("apArcadeScholarWilds", JSON.stringify(progress.world));
  else localStorage.removeItem("apArcadeScholarWilds");
  localStorage.setItem("apArcadeProgressUserId", userId);
  localStorage.setItem(`apArcadeProgress:${userId}`, JSON.stringify(progress));
}

function progressTimestamp(progress, fallback = 0){
  const savedAt = Number(progress?.state?.lastSavedAt);
  return Number.isFinite(savedAt) && savedAt > 0 ? savedAt : fallback;
}

function restoreProgress(progress, userId, updatedAt = 0){
  const restored = { ...progress, state: { ...progress.state } };
  const savedAt = Number(restored.state.lastSavedAt);
  if ((!Number.isFinite(savedAt) || savedAt <= 0) && updatedAt) restored.state.lastSavedAt = updatedAt;
  writeLocalProgress(restored, userId);
  window.location.reload();
}

async function syncProgressForAccount(user, version){
  const local = getLocalProgress(user.id);
  const { data: saved, error } = await accountClient
    .from("player_progress")
    .select("progress,updated_at")
    .eq("user_id", user.id)
    .maybeSingle();
  if (version !== accountSyncVersion) return;
  if (error) throw new Error(`Could not load account progress: ${error.message}`);

  const remoteProgress = saved?.progress;
  if (saved && (!remoteProgress || !remoteProgress.state || typeof remoteProgress.state !== "object")) {
    throw new Error("The account returned progress in an invalid format.");
  }
  const remoteUpdatedAt = saved?.updated_at ? Date.parse(saved.updated_at) : 0;
  const localUpdatedAt = progressTimestamp(local.progress);
  const remoteTimestamp = progressTimestamp(remoteProgress, Number.isFinite(remoteUpdatedAt) ? remoteUpdatedAt : 0);

  if (remoteProgress && remoteTimestamp > localUpdatedAt) {
    restoreProgress(remoteProgress, user.id, remoteTimestamp);
    return;
  }
  if (local.needsRestore && local.progress) {
    restoreProgress(local.progress, user.id, localUpdatedAt);
    return;
  }
  if (!local.progress && saved) {
    restoreProgress(remoteProgress, user.id, remoteTimestamp);
    return;
  }
  if (!local.progress && !saved) {
    const ownerId = localStorage.getItem("apArcadeProgressUserId");
    if (ownerId && ownerId !== user.id) {
      localStorage.removeItem("apStemQuestState");
      localStorage.removeItem("apArcadeScholarWilds");
      localStorage.setItem("apArcadeProgressUserId", user.id);
      window.location.reload();
      return;
    }
    throw new Error("No browser progress is available to sync yet. Reload the page and try again.");
  }

  const progress = { ...local.progress, state: { ...local.progress.state } };
  const savedAt = Number(progress.state.lastSavedAt);
  if (!Number.isFinite(savedAt) || savedAt <= 0) progress.state.lastSavedAt = Date.now();
  writeLocalProgress(progress, user.id);
  const { error: saveError } = await accountClient
    .from("player_progress")
    .upsert({
      user_id: user.id,
      progress,
      updated_at: new Date(progress.state.lastSavedAt).toISOString()
    }, { onConflict: "user_id" });
  if (version !== accountSyncVersion) return;
  if (saveError) throw new Error(`Progress is saved on this device, but account sync failed: ${saveError.message}`);
}

async function syncAccountSession(session){
  const version = ++accountSyncVersion;
  const user = session?.user || null;
  const nextUserId = user?.id || null;
  if (currentAccountUserId !== nextUserId && accountSyncTimer) {
    clearTimeout(accountSyncTimer);
    accountSyncTimer = 0;
  }
  currentAccountUserId = nextUserId;
  currentAccountEmail = user?.email || "";
  updateAccountControls(user);
  if (!user) {
    accountMessage("Sign in to sync progress across devices. Your current progress remains saved in this browser.");
    return;
  }

  accountMessage(`Signed in as ${user.email}. Syncing your progress...`);
  try {
    await syncProgressForAccount(user, version);
    if (version === accountSyncVersion) {
      accountMessage(`Signed in as ${user.email}. Your study progress and world are synced to this account.`);
    }
  } catch (error) {
    if (version === accountSyncVersion) {
      accountMessage(error instanceof Error ? error.message : "Could not sync account progress.");
    }
  }
}

async function saveAccountProgress(){
  const userId = currentAccountUserId;
  if (!userId || !accountClient) return;
  const version = accountSyncVersion;
  try {
    const local = getLocalProgress(userId);
    if (!local.progress) throw new Error("No browser progress is available to sync.");
    const progress = { ...local.progress, state: { ...local.progress.state } };
    const savedAt = Number(progress.state.lastSavedAt);
    if (!Number.isFinite(savedAt) || savedAt <= 0) progress.state.lastSavedAt = Date.now();
    writeLocalProgress(progress, userId);
    const { error } = await accountClient
      .from("player_progress")
      .upsert({
        user_id: userId,
        progress,
        updated_at: new Date(progress.state.lastSavedAt).toISOString()
      }, { onConflict: "user_id" });
    if (version !== accountSyncVersion) return;
    if (error) throw new Error(`Progress is saved on this device, but account sync failed: ${error.message}`);
    accountMessage(`Signed in as ${currentAccountEmail}. Your study progress and world are synced to this account.`);
  } catch (error) {
    if (version === accountSyncVersion) {
      accountMessage(error instanceof Error ? error.message : "Could not sync account progress.");
    }
  }
}

window.scheduleAccountProgressSync = () => {
  if (!currentAccountUserId || !accountClient) return;
  clearTimeout(accountSyncTimer);
  accountSyncTimer = window.setTimeout(() => {
    accountSyncTimer = 0;
    void saveAccountProgress();
  }, 1200);
};

function addPublicContentRows(rows){
  const groups = new Map();
  for (const row of rows) {
    if (!row || !["mcq", "frq"].includes(row.content_type) || !row.course || !row.content_key) continue;
    const bank = row.content_type === "mcq" ? unitQuestionBank : frqBank;
    const groupKey = JSON.stringify([row.content_type, row.course, row.content_key]);
    if (!groups.has(groupKey)) groups.set(groupKey, { bank, course: row.course, key: row.content_key, rows: [] });
    groups.get(groupKey).rows.push(row);
  }

  for (const { bank, course, key, rows: groupRows } of groups.values()) {
    if (!bank[course]) continue;
    const original = bank[course][key];
    if (original !== undefined && !Array.isArray(original)) continue;
    const additions = groupRows.flatMap(row => {
      const items = Array.isArray(row.content)
        ? row.content
        : Array.isArray(row.content?.questions) ? row.content.questions : [row.content];
      return items.map((item, index) => {
        const question = Array.isArray(item)
          ? { text: item[0], answers: item[1], correct: item[2], explain: item[3] }
          : item;
        return { ...question, id: `premium-${row.id}-${index + 1}` };
      });
    });
    bank[course][key] = [...(original || []), ...additions];
  }
}

async function loadPublicContent(){
  const { data: rows, error } = await accountClient
    .from("premium_content")
    .select("id,course,content_key,content_type,content");
  if (error) throw new Error(`Could not load the additional free question sets: ${error.message}`);
  addPublicContentRows(rows || []);
  const mcqCount = (rows || []).reduce((count, row) => count + (row.content_type === "mcq"
    ? Array.isArray(row.content) ? row.content.length
      : Array.isArray(row.content?.questions) ? row.content.questions.length : 1
    : 0), 0);
  contentMessage(mcqCount
    ? `${mcqCount} additional free MCQs loaded. Practice runs can include up to 30 questions per unit.`
    : "All available question sets are free. Additional authored sets will appear here when published.");
}

async function createAccountClient(){
  if (!accountConfig.supabaseUrl || !accountConfig.supabaseAnonKey) return null;
  if (!window.supabase?.createClient) throw new Error("Could not load the Supabase client library.");
  return window.supabase.createClient(accountConfig.supabaseUrl, accountConfig.supabaseAnonKey);
}

async function initializeAccount(){
  if (!accountConfig.supabaseUrl || !accountConfig.supabaseAnonKey) {
    accountMessage("Account service is not configured. Progress still saves in this browser.");
    contentMessage("The additional free question sets need the Supabase project connection.");
    return;
  }

  try {
    accountClient = await createAccountClient();
  } catch (error) {
    accountMessage(error instanceof Error ? error.message : "Could not connect to the account service.");
    contentMessage(error instanceof Error ? error.message : "Could not load the additional free question sets.");
    return;
  }

  void loadPublicContent().catch(error => {
    contentMessage(error instanceof Error ? error.message : "Could not load the additional free question sets.");
  });

  accountClient.auth.onAuthStateChange((event, nextSession) => {
    if (event === "INITIAL_SESSION") return;
    window.setTimeout(() => void syncAccountSession(nextSession), 0);
  });

  try {
    const { data: { session }, error } = await accountClient.auth.getSession();
    if (error) throw error;
    await syncAccountSession(session);
  } catch (error) {
    accountMessage(error instanceof Error ? error.message : "Could not connect to the account service.");
    contentMessage(error instanceof Error ? error.message : "Could not load the additional free question sets.");
    return;
  }
}

async function signInAccount(){
  if (!accountClient) return accountMessage("Account service is not configured.");
  const email = document.getElementById("accountEmail").value.trim();
  const password = document.getElementById("accountPassword").value;
  accountMessage("Signing in...");
  try {
    const { error } = await accountClient.auth.signInWithPassword({ email, password });
    if (error) accountMessage(error.message);
  } catch (error) {
    accountMessage(error instanceof Error ? error.message : "Could not sign in.");
  }
}

async function createAccount(){
  if (!accountClient) return accountMessage("Account service is not configured.");
  const email = document.getElementById("accountEmail").value.trim();
  const password = document.getElementById("accountPassword").value;
  if (!email || password.length < 8) {
    return accountMessage("Enter an email and a password with at least 8 characters.");
  }
  accountMessage("Creating account...");
  try {
    const { data, error } = await accountClient.auth.signUp({ email, password });
    if (error) return accountMessage(error.message);
    accountMessage(data.session
      ? "Account created. You are signed in and progress will sync."
      : "Account created. Check your email to confirm it, then sign in.");
  } catch (error) {
    accountMessage(error instanceof Error ? error.message : "Could not create an account.");
  }
}

async function signOutAccount(){
  if (!accountClient) return accountMessage("Account service is not configured.");
  try {
    const { error } = await accountClient.auth.signOut();
    if (error) accountMessage(error.message);
  } catch (error) {
    accountMessage(error instanceof Error ? error.message : "Could not sign out.");
  }
}

window.signInAccount = signInAccount;
window.createAccount = createAccount;
window.signOutAccount = signOutAccount;

initializeAccount();
