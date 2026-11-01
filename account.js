const accountConfig = window.AP_ARCADE_CONFIG || {};
let accountClient = null;
let accountSyncVersion = 0;
let currentAccountUserId = null;
let currentAccountEmail = "";
let accountSyncTimer = 0;
let accountInitializationPromise = null;

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

function hasAny(text, patterns) {
  return patterns.some(pattern => pattern.test(text));
}

function localEnglishGrade(payload) {
  const text = payload.response.toLowerCase().trim();
  const words = text.match(/\b[\w'-]+\b/g) || [];
  const sentences = text.split(/[.!?]+/).map(sentence => sentence.trim()).filter(Boolean);
  const opening = sentences.slice(0, Math.min(4, sentences.length)).join(" ");
  const closing = sentences.slice(-Math.min(3, sentences.length)).join(" ");
  const hasThesis = hasAny(opening, [
    /\b(because|since|thus|therefore|ultimately|overall|essentially)\b/,
    /\b(demonstrates|reveals|shows|argues?|asserts?|suggests?|supports?)\b/,
    /\b(despite|although|through)\b/,
    /\b(therefore|thus|so)\b/,
    /\b(in order to|in the end|as a result)\b/
  ]) || hasAny(text, [
    /\b(thesis|central claim|main claim|controlling idea)\b/,
    /\b(demonstrates|reveals|shows)\s+(that|how)\b/
  ]);
  const evidenceCount = (text.match(/\b(evidence|source|excerpt|passage|text|document|example)\b/g) || []).length;
  const hasSpecificEvidence = evidenceCount >= 2 || hasAny(text, [/\b(paragraph|line|quote|author says|according to)\b/]);
  const hasCommentary = hasAny(text, [/\b(because|therefore|demonstrates|reveals|shows|means|suggests)\b/]);
  const hasQualification = hasAny(text, [/\b(however|although|despite|nevertheless|on the other hand|yet)\b/]);
  const substantive = words.length >= 250 && sentences.length >= 8;

  const openingHasPosition = opening.length > 80 && /\b(is|are|can|should|must|will|may)\b/.test(opening);
  const hasDefensibleOpening = sentences[0]?.split(/\s+/).length >= 12 && openingHasPosition;
  const hasConclusion = sentences.length >= 4 && hasAny(closing, [/ \b(overall|ultimately|therefore|thus|in conclusion)\b/, /\b(proves|demonstrates|shows)\b/]);
  const thesisScore = hasThesis || hasDefensibleOpening || (hasConclusion && words.length >= 300) ? 1 : 0;
  let evidenceScore = 0;
  if (hasSpecificEvidence || evidenceCount > 0) evidenceScore += 1;
  if (hasCommentary || words.length >= 500) evidenceScore += 1;
  if (substantive && evidenceScore >= 2) evidenceScore += 1;
  if (words.length >= 700 && evidenceScore >= 3 && hasCommentary) evidenceScore += 1;
  evidenceScore = Math.min(evidenceScore, 4);
  const sophisticationScore = substantive && (hasQualification || evidenceScore === 4 || words.length >= 900) ? 1 : 0;

  const strengths = [];
  const improvements = [];
  if (thesisScore) strengths.push("The response contains a defensible central claim.");
  else improvements.push("State a clear thesis that directly answers the prompt.");
  if (hasSpecificEvidence) strengths.push("The essay makes specific references to evidence.");
  else improvements.push("Use precise quotations or details from the passage and explain their relevance.");
  if (hasCommentary) strengths.push("The response uses reasoning to explain evidence.");
  else improvements.push("Add commentary explaining how each piece of evidence supports the thesis.");
  if (hasQualification) strengths.push("The argument recognizes a qualification or counterconsideration.");
  else improvements.push("Add nuance or qualify the argument where appropriate.");
  if (words.length < 350) improvements.push(`Develop the response further; it currently contains about ${words.length} words.`);

  return {
    total: thesisScore + evidenceScore + sophisticationScore,
    maxTotal: 6,
    criteria: {
      Thesis: {
        score: thesisScore,
        max: 1,
        reason: thesisScore ? "A defensible thesis was detected." : "A clear line of reasoning in direct response to the prompt was not detected."
      },
      Evidence_and_Commentary: {
        score: evidenceScore,
        max: 4,
        reason: `The response contains about ${words.length} words and evidence/commentary markers were ${evidenceScore ? "partially present" : "limited"}.`
      },
      Sophistication: {
        score: sophisticationScore,
        max: 1,
        reason: sophisticationScore ? "The response appears nuanced, qualified, and developed." : "Add consistent qualification and nuanced reasoning to strengthen sophistication."
      }
    },
    strengths,
    improvements,
    summary: "Free local estimate based on structure, evidence, commentary, development, and nuance. This is not an official AP score."
  };
}

function localAPUSHGrade(payload) {
  const text = payload.response.toLowerCase();
  const words = (text.match(/\b[\w'-]+\b/g) || []).length;
  const isDBQ = /DBQ|document-based/i.test(payload.essayType || "");
  const sentences = text.split(/[.!?]+/).map(sentence => sentence.trim()).filter(Boolean);
  const opening = sentences.slice(0, Math.min(4, sentences.length)).join(" ");
  const hasContext = /\b(context|era|period|preceded|followed|prior|after|time period)\b/.test(text);
  const hasThesis = /\b(thesis|argue|claim|controlling idea|therefore|thus|ultimately|despite|although)\b/.test(opening)
    || /\b(because|through)\b/.test(opening);
  const documentMentions = (text.match(/\bdocument(s)?\s+[a-z0-9]/g) || []).length;
  const hasSourcing = /\b(author|audience|purpose|context|point of view|perspective|source)\b/.test(text);
  const hasOutsideEvidence = /\b(beyond|historical example|also|further evidence|another example)\b/.test(text)
    || words >= 500;
  const hasAnalysis = /\b(because|therefore|demonstrates|resulted|caused|impact|significance|comparison|continuity|change)\b/.test(text);

  let total = 0;
  const criteria = {};
  const add = (name, score, max, reason) => {
    score = Math.min(score, max);
    criteria[name] = { score, max, reason };
    total += score;
  };
  add("Contextualization", hasContext ? 1 : 0, 1, hasContext ? "Historical context was detected." : "Add broader historical context before making the claim.");
  add("Thesis_or_Claim", hasThesis ? 1 : 0, 1, hasThesis ? "A thesis-like claim was detected." : "State a defensible thesis with a line of reasoning.");
  if (isDBQ) {
    add("Evidence_from_Documents", Math.min(documentMentions ? 3 : 0, words >= 300 ? 3 : 2), 3, documentMentions ? "Document references were detected." : "Support the argument with multiple documents.");
    add("Evidence_Beyond_Documents", hasOutsideEvidence ? (words >= 500 ? 2 : 1) : 0, 2, hasOutsideEvidence ? "Outside evidence appears to be present or extended historical evidence was detected." : "Add specific historical evidence beyond the documents.");
    add("Analysis_and_Reasoning", hasAnalysis && hasSourcing ? 2 : hasAnalysis ? 1 : 0, 2, "Use sourcing and explain how evidence supports reasoning.");
  } else {
    add("Evidence", words >= 450 && hasAnalysis ? 2 : hasAnalysis || words >= 300 ? 1 : 0, 2, "Use specific historical evidence and explain its significance.");
    add("Analysis_and_Reasoning", hasAnalysis && words >= 350 ? 2 : hasAnalysis ? 1 : 0, 2, "Explain historical relationships, causation, comparison, or change over time.");
  }
  const improvements = [];
  if (!hasContext) improvements.push("Add accurate historical context before the thesis.");
  if (!hasThesis) improvements.push("Write a clear, defensible thesis.");
  if (isDBQ && !documentMentions) improvements.push("Reference multiple documents by letter and group them into evidence categories.");
  if (isDBQ && !hasSourcing) improvements.push("Use sourcing categories such as author, audience, purpose, context, or point of view.");
  if (!hasAnalysis) improvements.push("Explain how and why the evidence supports the argument.");

  return {
    total: Math.min(total, isDBQ ? 7 : 6),
    maxTotal: isDBQ ? 7 : 6,
    criteria,
    strengths: total >= 3 ? ["The response contains several recognizable rubric elements."] : ["The response has a starting framework that can be developed."],
    improvements: improvements.length ? improvements : ["Continue to refine the precision of evidence and analysis."],
    summary: "Free local estimate based on detectable historical-writing features. This is not an official AP score."
  };
}

window.APArcadeGradeEssay = async function gradeEssay(payload){
  if (!accountInitializationPromise) {
    throw new Error("Essay grading service is not initialized. Refresh the page and try again.");
  }
  await accountInitializationPromise;
  if (!accountClient) {
    throw new Error("Essay grading is unavailable until the Supabase connection is configured.");
  }
  let data;
  let error;
  try {
    const response = await accountClient.functions.invoke("grade-essay", { body: payload });
    data = response.data;
    error = response.error;
  } catch (requestError) {
    try {
      const endpoint = `${accountConfig.supabaseUrl}/functions/v1/grade-essay`;
      const directResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: accountConfig.supabaseAnonKey,
          Authorization: `Bearer ${accountConfig.supabaseAnonKey}`
        },
        body: JSON.stringify(payload)
      });
      if (directResponse.status === 404) {
        throw new Error("The AI grader has not been deployed to the Supabase project.");
      }
      const directData = await directResponse.json().catch(() => null);
      if (!directResponse.ok) {
        throw new Error(directData?.error || directData?.message || `Supabase returned HTTP ${directResponse.status}.`);
      }
      return directData;
    } catch (diagnosticError) {
      if (payload.course === "AP United States History") return localAPUSHGrade(payload);
      return localEnglishGrade(payload);
    }
  }
  if (error) {
    const status = error.context?.status;
    if (payload.course === "AP United States History") return localAPUSHGrade(payload);
    if (payload.course === "AP English Language" || payload.course === "AP English Literature") {
      return localEnglishGrade(payload);
    }
    if (status === 404 || error.message?.includes("NOT_FOUND")) {
      throw new Error("The AI grader has not been deployed to Supabase yet.");
    }
    if (status === 503 || error.message?.includes("not configured")) {
      throw new Error("The AI grader needs its server-side API key configured.");
    }
    const responseMessage = data?.error;
    throw new Error(responseMessage || error.message || "The grading service returned an error.");
  }
  if (!data) throw new Error("The grading service returned no result.");
  return data;
};

accountInitializationPromise = initializeAccount();
