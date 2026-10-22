const coachCourse = document.getElementById("coachCourse");
const coachStatus = document.getElementById("coachStatus");
const coachOutput = document.getElementById("coachOutput");
const sandboxCanvas = document.getElementById("sandboxCanvas");
const sandboxContext = sandboxCanvas.getContext("2d");
const TILE_SIZE = 24;
const VIEW_COLUMNS = sandboxCanvas.width / TILE_SIZE;
const VIEW_ROWS = sandboxCanvas.height / TILE_SIZE;
const WORLD_WIDTH = 72;
const WORLD_HEIGHT = 52;
const HOTBAR_ITEMS = ["wood", "stone", "berries", "planks", "walls", "torches", "campfires", "crystals"];
const ITEM_NAMES = {
  wood: "WOOD",
  stone: "STONE",
  berries: "BERRIES",
  planks: "PLANKS",
  walls: "WALLS",
  torches: "TORCHES",
  campfires: "CAMPFIRES",
  crystals: "CRYSTALS",
  gel: "SLIME GEL"
};
const RECIPES = [
  { id: "planks", label: "4 PLANKS", cost: { wood: 2 }, gives: { planks: 4 } },
  { id: "walls", label: "2 WALLS", cost: { wood: 3, stone: 1 }, gives: { walls: 2 } },
  { id: "torches", label: "2 TORCHES", cost: { wood: 1, stone: 1 }, gives: { torches: 2 } },
  { id: "campfires", label: "1 CAMPFIRE", cost: { wood: 4, stone: 3 }, gives: { campfires: 1 } },
  { id: "heal", label: "EAT BERRIES (+25 HP)", cost: { berries: 2 }, heal: 25 }
];

let world = null;
let player = null;
let animationFrame = 0;
let lastWorldSave = 0;
let lastHudUpdate = 0;
let quizQuestion = null;
let quizCooldownUntil = 0;
let quizResolved = false;
let selectedHotbarIndex = 0;
let gameRandom = Math.random;
let lastPlayerAttack = 0;
let sandboxPlayerSprites = {};
let sandboxPlayerSpritePending = false;
let sandboxPlayerSpriteVersion = 0;

function createRandom(seed){
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let next = value;
    next = Math.imul(next ^ next >>> 15, next | 1);
    next ^= next + Math.imul(next ^ next >>> 7, next | 61);
    return ((next ^ next >>> 14) >>> 0) / 4294967296;
  };
}

function createWorld(seed = Math.floor(Math.random() * 0x7fffffff)){
  gameRandom = createRandom(seed);
  const tiles = Array.from({ length: WORLD_HEIGHT }, (_, y) =>
    Array.from({ length: WORLD_WIDTH }, (_, x) => {
      const edge = x < 2 || y < 2 || x >= WORLD_WIDTH - 2 || y >= WORLD_HEIGHT - 2;
      if (edge && gameRandom() < .82) return "water";
      if (y > WORLD_HEIGHT - 7 && gameRandom() < .65) return "sand";
      if (gameRandom() < .1) return "dirt";
      return "grass";
    })
  );
  const objects = [];
  const centerX = Math.floor(WORLD_WIDTH / 2);
  const centerY = Math.floor(WORLD_HEIGHT / 2);
  const reserved = new Set();
  const reserve = (x, y, width = 1, height = 1) => {
    for (let row = y - 2; row < y + height + 2; row += 1) {
      for (let column = x - 2; column < x + width + 2; column += 1) {
        reserved.add(`${column},${row}`);
      }
    }
  };
  reserve(centerX, centerY);
  reserve(centerX + 1, centerY - 3, 3, 2);
  reserve(centerX + 4, centerY);
  reserve(centerX + 3, centerY + 1);
  reserve(centerX - 2, centerY + 3);

  objects.push(
    { id: "camp", type: "cabin", x: centerX + 1, y: centerY - 3, hp: 1 },
    { id: "workbench", type: "workbench", x: centerX - 2, y: centerY + 3, hp: 1 },
    { id: "study-shrine", type: "shrine", x: centerX + 4, y: centerY, hp: 1 },
    { id: "field-guide", type: "guide", x: centerX + 3, y: centerY + 1, hp: 1 },
    { id: "campfire", type: "campfire", x: centerX + 1, y: centerY + 1, hp: 1 }
  );

  let nextId = 0;
  for (let y = 3; y < WORLD_HEIGHT - 3; y += 1) {
    for (let x = 3; x < WORLD_WIDTH - 3; x += 1) {
      if (reserved.has(`${x},${y}`) || objects.some(object => object.x === x && object.y === y)) continue;
      if (tiles[y][x] === "water") continue;
      const roll = gameRandom();
      if (roll < .065) objects.push({ id: `tree-${nextId++}`, type: "tree", x, y, hp: 3 });
      else if (roll < .085) objects.push({ id: `rock-${nextId++}`, type: "rock", x, y, hp: 3 });
      else if (roll < .091) objects.push({ id: `ore-${nextId++}`, type: "ore", x, y, hp: 3 });
      else if (roll < .096) objects.push({ id: `rabbit-${nextId++}`, type: "rabbit", x, y, hp: 1, nextMove: 0 });
      else if (roll < .103) objects.push({ id: `slime-${nextId++}`, type: "slime", x, y, hp: 2, nextMove: 0 });
    }
  }

  return {
    seed,
    tiles,
    objects,
    player: { x: centerX, y: centerY, dx: 1, dy: 0, hp: 100, maxHp: 100 },
    inventory: { wood: 8, stone: 6, berries: 3, planks: 0, walls: 0, torches: 0, campfires: 0, crystals: 0, gel: 0 },
    selectedCourse: "AP Physics 1",
    defeated: false
  };
}

function loadWorld(){
  try {
    const saved = localStorage.getItem("apArcadeScholarWilds");
    const data = saved ? JSON.parse(saved) : null;
    if (data?.tiles?.length === WORLD_HEIGHT && data.tiles.every(row => row.length === WORLD_WIDTH)
        && Array.isArray(data.objects) && data.player && data.inventory) {
      return data;
    }
  } catch (error) {
    console.error("Saved Scholar's Wilds world could not be loaded.", error);
  }
  return createWorld();
}

function saveWorld(){
  if (!world) return;
  localStorage.setItem("apArcadeScholarWilds", JSON.stringify(world));
  window.scheduleAccountProgressSync?.();
}

function refreshFreeFeatures(){
  document.getElementById("sandboxAccessStatus").textContent =
    "The Scholar's Wilds and all study features are free. Your world saves in this browser and with your account.";
  if (!coachCourse.options.length) {
    const courses = window.APArcadeStudyData?.courses() || [];
    coachCourse.replaceChildren(...courses.map(course => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      return option;
    }));
  }
  updateCoachStatus();
  if (world && !document.getElementById("sandboxShell").classList.contains("hidden")) resumeSandbox();
}

function updateCoachStatus(){
  if (!coachCourse.value) return;
  const count = window.APArcadeStudyData?.wrongQuestionCount(coachCourse.value) || 0;
  document.getElementById("coachMistakeCount").textContent = count
    ? `${count} distinct missed question${count === 1 ? "" : "s"} saved for this course. Up to 8 recent misses shape each study guide.`
    : `No missed questions saved yet for ${coachCourse.value}. Practice some MCQs and miss one to build a personal study guide.`;
}

coachCourse.addEventListener("change", updateCoachStatus);

function buildCoachLesson(course, mistakes){
  const unitMistakes = new Map();
  mistakes.forEach(mistake => {
    const unit = mistake.unit || "Course review";
    unitMistakes.set(unit, (unitMistakes.get(unit) || 0) + 1);
  });
  const focus = [...unitMistakes.entries()].sort((left, right) => right[1] - left[1])[0];
  const lines = [
    `${course.toUpperCase()} — PERSONAL STUDY GUIDE`,
    `Built from ${mistakes.length} recent missed question${mistakes.length === 1 ? "" : "s"}.`,
    "",
    "YOUR REVIEW PRIORITY",
    focus
      ? `${focus[0]} has the most misses in this set (${focus[1]}). Start there, then revisit the other topics below.`
      : "Review each topic below, then use the retrieval prompts to check your understanding.",
    "",
    "QUESTION-BY-QUESTION FEEDBACK"
  ];

  mistakes.forEach((mistake, index) => {
    lines.push(
      "",
      `${index + 1}. ${mistake.unit || "Course review"}`,
      `Question: ${mistake.question}`,
      `Your answer: ${mistake.chosenAnswer}`,
      `Correct answer: ${mistake.correctAnswer}`,
      `Why: ${mistake.explanation || "Review the worked solution for this item and identify the principle that supports the correct choice."}`,
      "Study move: Explain in your own words why the correct choice follows from the question, and what makes your selected choice less suitable."
    );
  });

  lines.push(
    "",
    "RETRIEVAL PRACTICE",
    "Without looking at the answer key, summarize the rule or method used in each explanation. Then solve a fresh practice question from the priority unit and explain each step before checking your answer.",
    "",
    "This guide uses the app's saved answers and authored explanations. It does not infer your private reasoning or generate new subject-matter claims."
  );
  return lines.join("\n");
}

function runStudyCoach(){
  const course = coachCourse.value;
  const mistakes = window.APArcadeStudyData?.getCoachMistakes(course, 8) || [];
  coachOutput.classList.add("hidden");
  coachOutput.textContent = "";
  if (!mistakes.length) {
    coachStatus.textContent = "There are no saved missed questions for this course yet. Try a few practice MCQs first.";
    return;
  }
  coachOutput.textContent = buildCoachLesson(course, mistakes);
  coachOutput.classList.remove("hidden");
  coachStatus.textContent = "Your personalized study guide is ready. Review the feedback, then practice the priority unit.";
}

function startSandbox(){
  document.getElementById("sandboxShell").classList.remove("hidden");
  document.getElementById("sandboxStartButton").classList.add("hidden");
  if (!world) world = loadWorld();
  world.selectedCourse = document.getElementById("sandboxCourse").value || world.selectedCourse || "AP Physics 1";
  renderSandboxHotbar();
  renderCraftingRecipes();
  updateSandboxHud();
  resumeSandbox();
  saveWorld();
}

function resumeSandbox(){
  if (!world || animationFrame
      || !document.getElementById("sandbox").classList.contains("active")
      || document.getElementById("sandboxShell").classList.contains("hidden")) return;
  animationFrame = requestAnimationFrame(gameLoop);
}

function stopSandbox(){
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = 0;
}

function gameLoop(timestamp){
  if (!world) {
    animationFrame = 0;
    return;
  }
  if (document.getElementById("sandboxQuiz").classList.contains("hidden")) {
    updateEntities(Date.now());
  }
  drawWorld();
  if (timestamp - lastHudUpdate >= 120) {
    updateSandboxHud();
    lastHudUpdate = timestamp;
  }
  if (timestamp - lastWorldSave > 5000) {
    saveWorld();
    lastWorldSave = timestamp;
  }
  animationFrame = requestAnimationFrame(gameLoop);
}

function drawWorld(){
  const cameraX = Math.max(0, Math.min(WORLD_WIDTH - VIEW_COLUMNS, world.player.x - Math.floor(VIEW_COLUMNS / 2)));
  const cameraY = Math.max(0, Math.min(WORLD_HEIGHT - VIEW_ROWS, world.player.y - Math.floor(VIEW_ROWS / 2)));
  sandboxContext.clearRect(0, 0, sandboxCanvas.width, sandboxCanvas.height);
  for (let row = 0; row < VIEW_ROWS; row += 1) {
    for (let column = 0; column < VIEW_COLUMNS; column += 1) {
      const x = cameraX + column;
      const y = cameraY + row;
      drawTile(x, y, column * TILE_SIZE, row * TILE_SIZE);
    }
  }
  const visibleObjects = world.objects
    .filter(object => object.x >= cameraX - 1 && object.x <= cameraX + VIEW_COLUMNS
      && object.y >= cameraY - 1 && object.y <= cameraY + VIEW_ROWS)
    .sort((left, right) => left.y - right.y);
  visibleObjects.forEach(object => drawObject(object, (object.x - cameraX) * TILE_SIZE, (object.y - cameraY) * TILE_SIZE));
  drawPlayer((world.player.x - cameraX) * TILE_SIZE, (world.player.y - cameraY) * TILE_SIZE);
  if (world.defeated) {
    sandboxContext.fillStyle = "rgba(12, 8, 24, .78)";
    sandboxContext.fillRect(0, 0, sandboxCanvas.width, sandboxCanvas.height);
    sandboxContext.fillStyle = "#ffe7a0";
    sandboxContext.font = "20px monospace";
    sandboxContext.textAlign = "center";
    sandboxContext.fillText("YOU FELL IN THE WILDS", sandboxCanvas.width / 2, sandboxCanvas.height / 2);
  }
}

function drawTile(x, y, px, py){
  const type = world.tiles[y][x];
  const colors = { grass: "#4c9b55", dirt: "#93633f", sand: "#c2a05c", water: "#376d9a", floor: "#a47745" };
  sandboxContext.fillStyle = colors[type] || colors.grass;
  sandboxContext.fillRect(px, py, TILE_SIZE, TILE_SIZE);
  const detail = (x * 31 + y * 17 + world.seed) % 7;
  if (type === "grass" && detail < 3) {
    sandboxContext.fillStyle = detail === 0 ? "#84bf5e" : "#39794a";
    sandboxContext.fillRect(px + 5 + detail * 3, py + 5 + detail * 2, 3, 3);
  } else if (type === "water") {
    sandboxContext.fillStyle = detail < 3 ? "#5c99b5" : "#2d5c88";
    sandboxContext.fillRect(px + 4 + detail, py + 8, 7, 2);
  } else if (type === "floor") {
    sandboxContext.fillStyle = "#74482f";
    sandboxContext.fillRect(px, py + 11, TILE_SIZE, 2);
    sandboxContext.fillRect(px + 11, py, 2, TILE_SIZE);
  }
  sandboxContext.strokeStyle = "rgba(26, 40, 43, .1)";
  sandboxContext.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
}

function drawObject(object, px, py){
  const ctx = sandboxContext;
  if (object.type === "tree") {
    ctx.fillStyle = "#65412f";
    ctx.fillRect(px + 9, py + 11, 7, 13);
    ctx.fillStyle = "#28653d";
    ctx.fillRect(px + 3, py + 3, 18, 13);
    ctx.fillStyle = "#52a24e";
    ctx.fillRect(px + 6, py, 12, 12);
    ctx.fillStyle = "#8ac05b";
    ctx.fillRect(px + 7, py + 3, 5, 4);
  } else if (object.type === "rock" || object.type === "ore") {
    ctx.fillStyle = "#484d5a";
    ctx.fillRect(px + 3, py + 9, 18, 12);
    ctx.fillStyle = object.type === "ore" ? "#68d9d1" : "#979eaa";
    ctx.fillRect(px + 7, py + 6, 10, 12);
    ctx.fillStyle = "#d5e0d8";
    ctx.fillRect(px + 9, py + 8, 4, 3);
  } else if (object.type === "slime") {
    ctx.fillStyle = "#276249";
    ctx.fillRect(px + 3, py + 13, 19, 9);
    ctx.fillStyle = "#71d46a";
    ctx.fillRect(px + 4, py + 7, 16, 12);
    ctx.fillStyle = "#f7f0cf";
    ctx.fillRect(px + 8, py + 10, 3, 4);
    ctx.fillRect(px + 15, py + 10, 3, 4);
    ctx.fillStyle = "#263344";
    ctx.fillRect(px + 9, py + 11, 1, 2);
    ctx.fillRect(px + 16, py + 11, 1, 2);
  } else if (object.type === "rabbit") {
    ctx.fillStyle = "#e4d9ae";
    ctx.fillRect(px + 6, py + 9, 13, 10);
    ctx.fillRect(px + 7, py + 3, 4, 9);
    ctx.fillRect(px + 14, py + 3, 4, 9);
    ctx.fillStyle = "#33283d";
    ctx.fillRect(px + 15, py + 11, 2, 2);
  } else if (object.type === "guide") {
    drawPerson(px, py, "#d0a2e8", "#f1d1a7", "#56447c");
    ctx.fillStyle = "#fff0a4";
    ctx.fillRect(px + 17, py + 4, 5, 5);
  } else if (object.type === "shrine") {
    ctx.fillStyle = "#554978";
    ctx.fillRect(px + 2, py + 5, 20, 18);
    ctx.fillStyle = "#9f80c7";
    ctx.fillRect(px + 5, py + 2, 14, 18);
    ctx.fillStyle = "#7de1d3";
    ctx.fillRect(px + 9, py + 7, 6, 8);
    ctx.fillStyle = "#f1d877";
    ctx.fillRect(px + 11, py + 9, 2, 4);
  } else if (object.type === "workbench") {
    ctx.fillStyle = "#6c422c";
    ctx.fillRect(px + 2, py + 7, 20, 9);
    ctx.fillStyle = "#ba8050";
    ctx.fillRect(px + 2, py + 4, 20, 5);
    ctx.fillStyle = "#47342b";
    ctx.fillRect(px + 5, py + 15, 3, 8);
    ctx.fillRect(px + 16, py + 15, 3, 8);
  } else if (object.type === "cabin") {
    ctx.fillStyle = "#5e3e32";
    ctx.fillRect(px + 1, py + 12, TILE_SIZE * 2 - 2, TILE_SIZE - 7);
    ctx.fillStyle = "#a54842";
    ctx.fillRect(px - 3, py + 5, TILE_SIZE * 2 + 6, 11);
    ctx.fillStyle = "#dec182";
    ctx.fillRect(px + 8, py + 16, 8, 8);
    ctx.fillStyle = "#49364a";
    ctx.fillRect(px + 10, py + 18, 4, 6);
  } else if (object.type === "wall") {
    ctx.fillStyle = "#81563b";
    ctx.fillRect(px + 1, py + 3, TILE_SIZE - 2, TILE_SIZE - 3);
    ctx.fillStyle = "#b37b4c";
    ctx.fillRect(px + 4, py + 6, TILE_SIZE - 8, 3);
    ctx.fillRect(px + 4, py + 14, TILE_SIZE - 8, 3);
  } else if (object.type === "torch") {
    ctx.fillStyle = "#794529";
    ctx.fillRect(px + 10, py + 9, 5, 14);
    ctx.fillStyle = "#f6b94c";
    ctx.fillRect(px + 8, py + 2, 9, 9);
    ctx.fillStyle = "#fff2a3";
    ctx.fillRect(px + 11, py + 4, 4, 5);
  } else if (object.type === "campfire") {
    ctx.fillStyle = "#74442f";
    ctx.fillRect(px + 4, py + 13, 17, 5);
    ctx.fillRect(px + 7, py + 18, 13, 3);
    ctx.fillStyle = "#e7733f";
    ctx.fillRect(px + 8, py + 6, 10, 10);
    ctx.fillStyle = "#ffd866";
    ctx.fillRect(px + 11, py + 3, 5, 8);
  }
}

function drawPerson(px, py, shirt, skin, pants){
  sandboxContext.fillStyle = "#384a44";
  sandboxContext.fillRect(px + 5, py + 20, 15, 4);
  sandboxContext.fillStyle = pants;
  sandboxContext.fillRect(px + 7, py + 16, 12, 7);
  sandboxContext.fillStyle = shirt;
  sandboxContext.fillRect(px + 5, py + 8, 16, 10);
  sandboxContext.fillStyle = skin;
  sandboxContext.fillRect(px + 8, py + 2, 11, 9);
  sandboxContext.fillStyle = "#4a352f";
  sandboxContext.fillRect(px + 7, py + 1, 13, 4);
}

function refreshSandboxPlayerSprite(){
  const profileSprite = document.getElementById("profileHeroSprite");
  if (!profileSprite) return;
  const version = ++sandboxPlayerSpriteVersion;
  const directions = ["down", "left", "right", "up"];
  sandboxPlayerSprites = {};
  sandboxPlayerSpritePending = true;
  let pendingSprites = directions.length;

  const finishSprite = () => {
    pendingSprites -= 1;
    sandboxPlayerSpritePending = pendingSprites > 0;
    if (world) drawWorld();
  };

  for (const direction of directions) {
    const sprite = profileSprite.cloneNode(true);
    sprite.setAttribute("width", "96");
    sprite.setAttribute("height", "128");
    const sourceElements = [profileSprite, ...profileSprite.querySelectorAll("*")];
    const spriteElements = [sprite, ...sprite.querySelectorAll("*")];
    for (const [index, element] of spriteElements.entries()) {
      const computed = getComputedStyle(sourceElements[index]);
      for (const property of ["fill", "stroke", "stroke-width", "fill-opacity", "stroke-opacity", "opacity", "display", "visibility"]) {
        element.style.setProperty(property, computed.getPropertyValue(property));
      }
    }

    const skin = sprite.querySelector(".player-skin");
    const eyes = sprite.querySelector(".player-eye");
    const hair = sprite.querySelector(".player-hair");
    const weapon = sprite.querySelector(".hero-weapon");
    if (direction === "up") {
      skin.style.display = "none";
      eyes.style.display = "none";
      weapon.style.display = "none";
      hair.setAttribute("d", "M25 8h46v8h8v15h-8v17h-8v10H38V48H27V31H18V18h7z");
    } else if (direction === "left" || direction === "right") {
      skin.setAttribute("d", "M36 26h33v24H58v8H38v-8h-3v-6h-8v-7h8v-5h1z");
      eyes.setAttribute("d", "M37 34h6v7h-6z");
      if (direction === "right") {
        const mirrored = document.createElementNS("http://www.w3.org/2000/svg", "g");
        mirrored.setAttribute("transform", "translate(96 0) scale(-1 1)");
        while (sprite.firstChild) mirrored.append(sprite.firstChild);
        sprite.append(mirrored);
      }
    }

    const image = new Image();
    let spriteUrl;
    image.onload = () => {
      URL.revokeObjectURL(spriteUrl);
      if (version !== sandboxPlayerSpriteVersion) return;
      sandboxPlayerSprites[direction] = image;
      finishSprite();
    };
    image.onerror = () => {
      URL.revokeObjectURL(spriteUrl);
      if (version !== sandboxPlayerSpriteVersion) return;
      console.error(`Could not render the customized ${direction}-facing profile sprite in the sandbox.`);
      finishSprite();
    };
    try {
      const svg = new XMLSerializer().serializeToString(sprite);
      spriteUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      image.src = spriteUrl;
    } catch (error) {
      console.error(`Could not prepare the customized ${direction}-facing profile sprite for the sandbox.`, error);
      finishSprite();
    }
  }
}

function drawPlayer(px, py){
  const { dx, dy } = world.player;
  const direction = dy < 0 ? "up" : dx < 0 ? "left" : dx > 0 ? "right" : "down";
  if (!sandboxPlayerSprites[direction] && !sandboxPlayerSpritePending) refreshSandboxPlayerSprite();
  const sprite = sandboxPlayerSprites[direction];
  if (!sprite) return;

  sandboxContext.imageSmoothingEnabled = false;
  sandboxContext.drawImage(sprite, px + 3, py, 18, 24);
}

window.refreshSandboxPlayerSprite = refreshSandboxPlayerSprite;

function getObjectAt(x, y){
  return world.objects.find(object => object.x === x && object.y === y);
}

function isSolid(x, y){
  if (x < 1 || y < 1 || x >= WORLD_WIDTH - 1 || y >= WORLD_HEIGHT - 1) return true;
  if (world.tiles[y][x] === "water") return true;
  return world.objects.some(object =>
    (object.x === x && object.y === y && ["tree", "rock", "ore", "cabin", "wall", "workbench"].includes(object.type))
    || (object.type === "cabin" && x === object.x + 1 && y === object.y)
  );
}

function moveSandboxPlayer(dx, dy){
  if (!world || world.defeated || document.activeElement?.tagName === "TEXTAREA") return;
  world.player.dx = dx;
  world.player.dy = dy;
  const nextX = world.player.x + dx;
  const nextY = world.player.y + dy;
  if (!isSolid(nextX, nextY)) {
    world.player.x = nextX;
    world.player.y = nextY;
  } else {
    const object = getObjectAt(nextX, nextY);
    if (object?.type === "slime") showSandboxMessage("A wild slime blocks the way. Face it and press ATTACK!");
  }
  updateSandboxHud();
}

function getFacingObject(){
  return getObjectAt(world.player.x + world.player.dx, world.player.y + world.player.dy);
}

function mineSandbox(){
  if (!world || world.defeated) return;
  const target = getFacingObject();
  if (!target || !["tree", "rock", "ore"].includes(target.type)) {
    showSandboxMessage("Face a tree, rock, or glowing ore vein to mine it.");
    return;
  }
  target.hp -= 1;
  if (target.hp > 0) {
    showSandboxMessage(`${target.type.toUpperCase()} hit! ${target.hp} more tool strike${target.hp === 1 ? "" : "s"}.`);
    return;
  }
  const resources = target.type === "tree" ? { wood: 3 } : target.type === "ore" ? { stone: 2, crystals: 1 } : { stone: 3 };
  Object.entries(resources).forEach(([item, amount]) => addInventory(item, amount));
  world.objects = world.objects.filter(object => object.id !== target.id);
  showSandboxMessage(`Mined ${target.type}. Gathered ${Object.entries(resources).map(([item, amount]) => `${amount} ${ITEM_NAMES[item]}`).join(" + ")}.`);
  saveWorld();
  drawWorld();
}

function attackSandboxEntity(){
  if (!world || world.defeated) return;
  if (Date.now() - lastPlayerAttack < 280) return;
  lastPlayerAttack = Date.now();
  const target = world.objects.find(object => object.type === "slime"
    && Math.abs(object.x - world.player.x) + Math.abs(object.y - world.player.y) <= 2);
  if (!target) {
    showSandboxMessage("No hostile creature is close enough. Slimes emerge in the deeper woods.");
    return;
  }
  target.hp -= 1;
  if (target.hp <= 0) {
    world.objects = world.objects.filter(object => object.id !== target.id);
    addInventory("gel", 1);
    if (gameRandom() < .35) addInventory("berries", 1);
    showSandboxMessage("Slime defeated! It dropped slime gel.");
  } else {
    showSandboxMessage("You struck the slime! Keep attacking.");
  }
  drawWorld();
  saveWorld();
}

function buildSandbox(){
  if (!world || world.defeated) return;
  const item = HOTBAR_ITEMS[selectedHotbarIndex];
  const x = world.player.x + world.player.dx;
  const y = world.player.y + world.player.dy;
  if (item === "planks") {
    if (world.inventory.planks < 1) return showSandboxMessage("Craft planks at the workbench before placing a floor tile.");
    if (isSolid(x, y) || world.tiles[y][x] === "water") return showSandboxMessage("That spot is blocked.");
    world.inventory.planks -= 1;
    world.tiles[y][x] = "floor";
  } else if (["walls", "torches", "campfires"].includes(item)) {
    if (world.inventory[item] < 1) return showSandboxMessage(`Craft ${ITEM_NAMES[item].toLowerCase()} before placing them.`);
    if (isSolid(x, y) || world.tiles[y][x] === "water") return showSandboxMessage("That spot is blocked.");
    world.inventory[item] -= 1;
    const type = { walls: "wall", torches: "torch", campfires: "campfire" }[item];
    world.objects.push({ id: `${type}-${Date.now()}-${gameRandom()}`, type, x, y, hp: 1 });
  } else {
    return showSandboxMessage("Select planks, walls, torches, or a campfire to build.");
  }
  updateSandboxHud();
  drawWorld();
  saveWorld();
  showSandboxMessage("Built! Keep gathering and crafting to expand your camp.");
}

function interactSandbox(){
  if (!world || world.defeated) return;
  const nearby = world.objects
    .filter(object => Math.abs(object.x - world.player.x) + Math.abs(object.y - world.player.y) <= 2)
    .sort((left, right) =>
      Math.abs(left.x - world.player.x) + Math.abs(left.y - world.player.y)
      - Math.abs(right.x - world.player.x) - Math.abs(right.y - world.player.y)
    )[0];
  if (!nearby) return showSandboxMessage("Explore the meadow. Look for the shrine, your workbench, and the field guide.");
  if (nearby.type === "shrine") return askSandboxQuestion();
  if (nearby.type === "guide") {
    showSandboxMessage("FIELD GUIDE: The shrine turns AP questions into crystals. Bring crystals and ore to craft useful camp gear.");
    return;
  }
  if (nearby.type === "workbench") {
    toggleSandboxCrafting(true);
    showSandboxMessage("Workbench ready. Craft planks, walls, torches, or a campfire.");
    return;
  }
  if (nearby.type === "cabin") return showSandboxMessage("Your camp cabin. The wilds are yours to shape.");
  if (nearby.type === "rabbit") {
    world.objects = world.objects.filter(object => object.id !== nearby.id);
    addInventory("berries", 1);
    showSandboxMessage("A friendly rabbit shared a berry and hopped into the grass.");
    drawWorld();
    saveWorld();
    return;
  }
  if (nearby.type === "campfire") {
    world.player.hp = Math.min(world.player.maxHp, world.player.hp + 15);
    updateSandboxHud();
    showSandboxMessage("Rested by the fire. Restored 15 HP.");
    return;
  }
  if (nearby.type === "slime") return attackSandboxEntity();
  showSandboxMessage("You look around, but find nothing to do here.");
}

function askSandboxQuestion(){
  if (Date.now() < quizCooldownUntil) {
    const seconds = Math.ceil((quizCooldownUntil - Date.now()) / 1000);
    return showSandboxMessage(`The shrine is gathering another question. Return in ${seconds} seconds.`);
  }
  const course = document.getElementById("sandboxCourse").value || world.selectedCourse;
  world.selectedCourse = course;
  quizQuestion = window.APArcadeStudyData?.getPracticeQuestion(course);
  if (!quizQuestion) return showSandboxMessage("No AP questions are available for that course yet.");
  quizResolved = false;
  const quiz = document.getElementById("sandboxQuiz");
  document.getElementById("sandboxQuizQuestion").textContent = `${quizQuestion.unit} • ${quizQuestion.text}`;
  document.getElementById("sandboxQuizFeedback").textContent = "Answer correctly to earn a knowledge crystal.";
  document.getElementById("sandboxQuizContinue").classList.add("hidden");
  const answers = document.getElementById("sandboxQuizAnswers");
  answers.replaceChildren(...quizQuestion.answers.map((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => answerSandboxQuestion(index));
    return button;
  }));
  quiz.classList.remove("hidden");
}

function answerSandboxQuestion(choice){
  if (!quizQuestion || quizResolved) return;
  quizResolved = true;
  const result = window.APArcadeStudyData.recordPracticeAnswer(quizQuestion, choice);
  document.querySelectorAll("#sandboxQuizAnswers .answer").forEach((button, index) => {
    button.disabled = true;
    if (index === quizQuestion.correct) button.classList.add("correct");
    else if (index === choice) button.classList.add("wrong");
  });
  if (result.correct) {
    addInventory("crystals", 1);
    addInventory("berries", 1);
    document.getElementById("sandboxQuizFeedback").textContent =
      `Correct! +1 knowledge crystal, +1 berry, +8 XP. ${result.explanation}`;
  } else {
    document.getElementById("sandboxQuizFeedback").textContent =
      `Not quite. The answer is ${result.correctAnswer}. ${result.explanation}`;
  }
  quizCooldownUntil = Date.now() + 10000;
  updateCoachStatus();
  updateSandboxHud();
  saveWorld();
  document.getElementById("sandboxQuizContinue").classList.remove("hidden");
}

function closeSandboxQuiz(){
  document.getElementById("sandboxQuiz").classList.add("hidden");
  quizQuestion = null;
  drawWorld();
}

function toggleSandboxCrafting(forceOpen = false){
  if (!world || world.defeated) return;
  const menu = document.getElementById("sandboxCrafting");
  const open = forceOpen || menu.classList.contains("hidden");
  menu.classList.toggle("hidden", !open);
  if (open) {
    const nearWorkbench = world.objects.some(object => object.type === "workbench"
      && Math.abs(object.x - world.player.x) + Math.abs(object.y - world.player.y) <= 5);
    showSandboxMessage(nearWorkbench
      ? "Workbench nearby. Choose a recipe; its material cost is listed on the button."
      : "Crafting needs a workbench within 5 tiles. Find the workbench near camp.");
  }
}

function renderCraftingRecipes(){
  const menu = document.getElementById("sandboxCrafting");
  menu.replaceChildren(...RECIPES.map(recipe => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${recipe.label} · ${Object.entries(recipe.cost).map(([item, count]) => `${count} ${ITEM_NAMES[item]}`).join(" + ")}`;
    button.addEventListener("click", () => craftSandboxItem(recipe.id));
    return button;
  }));
}

function craftSandboxItem(recipeId){
  if (!world || world.defeated) return;
  if (!world.objects.some(object => object.type === "workbench"
      && Math.abs(object.x - world.player.x) + Math.abs(object.y - world.player.y) <= 5)) {
    showSandboxMessage("Crafting recipes need a workbench within 5 tiles. Head back to camp.");
    return;
  }
  const recipe = RECIPES.find(item => item.id === recipeId);
  if (!recipe) throw new Error(`Crafting recipe ${recipeId} is unavailable.`);
  const missing = Object.entries(recipe.cost).find(([item, count]) => world.inventory[item] < count);
  if (missing) return showSandboxMessage(`Need ${missing[1]} more ${ITEM_NAMES[missing[0]].toLowerCase()} to craft this.`);
  Object.entries(recipe.cost).forEach(([item, count]) => { world.inventory[item] -= count; });
  Object.entries(recipe.gives || {}).forEach(([item, count]) => addInventory(item, count));
  if (recipe.heal) {
    world.player.hp = Math.min(world.player.maxHp, world.player.hp + recipe.heal);
    updateSandboxHud();
  }
  showSandboxMessage(`Crafted ${recipe.label.toLowerCase()}.`);
  renderSandboxHotbar();
  saveWorld();
}

function useSelectedSandboxItem(){
  if (!world || world.defeated) return;
  const item = HOTBAR_ITEMS[selectedHotbarIndex];
  if (item === "berries" && world.inventory.berries > 0) {
    world.inventory.berries -= 1;
    world.player.hp = Math.min(world.player.maxHp, world.player.hp + 12);
    updateSandboxHud();
    renderSandboxHotbar();
    saveWorld();
    showSandboxMessage("Ate a berry. Restored 12 HP.");
  }
}

function addInventory(item, amount){
  world.inventory[item] = (world.inventory[item] || 0) + amount;
  renderSandboxHotbar();
}

function updateEntities(timestamp){
  for (const object of [...world.objects]) {
    if (!["slime", "rabbit"].includes(object.type) || timestamp < object.nextMove) continue;
    object.nextMove = timestamp + (object.type === "slime" ? 850 : 1800);
    const dx = world.player.x - object.x;
    const dy = world.player.y - object.y;
    const distance = Math.abs(dx) + Math.abs(dy);
    if (object.type === "slime" && distance <= 1) {
      world.player.hp = Math.max(0, world.player.hp - 8);
      showSandboxMessage("A slime hit you for 8 HP! Fight back or retreat.");
      if (world.player.hp === 0) {
        world.defeated = true;
        document.getElementById("sandboxRespawn").classList.remove("hidden");
        saveWorld();
      }
      continue;
    }
    if (object.type === "slime" && distance > 1 && distance < 8) {
      const stepX = Math.abs(dx) >= Math.abs(dy) ? Math.sign(dx) : 0;
      const stepY = stepX ? 0 : Math.sign(dy);
      if (!isSolid(object.x + stepX, object.y + stepY)
          && !world.objects.some(other => other !== object && other.x === object.x + stepX && other.y === object.y + stepY)) {
        object.x += stepX;
        object.y += stepY;
      }
    } else if (object.type === "rabbit" && gameRandom() < .65) {
      const [stepX, stepY] = [[1, 0], [-1, 0], [0, 1], [0, -1]][Math.floor(gameRandom() * 4)];
      if (!isSolid(object.x + stepX, object.y + stepY)) {
        object.x += stepX;
        object.y += stepY;
      }
    }
  }
}

function respawnSandboxPlayer(){
  if (!world) return;
  const cabin = world.objects.find(object => object.id === "camp");
  world.player.x = cabin.x - 1;
  world.player.y = cabin.y + 2;
  world.player.hp = world.player.maxHp;
  world.defeated = false;
  document.getElementById("sandboxRespawn").classList.add("hidden");
  updateSandboxHud();
  drawWorld();
  saveWorld();
  showSandboxMessage("Back at camp with full HP. Slimes still roam the wilds.");
}

function renderSandboxHotbar(){
  if (!world) return;
  const bar = document.getElementById("sandboxHotbar");
  bar.replaceChildren(...HOTBAR_ITEMS.map((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `hotbar-slot${index === selectedHotbarIndex ? " selected" : ""}`;
    button.setAttribute("aria-label", `${index + 1}: ${ITEM_NAMES[item]}, ${world.inventory[item] || 0}`);
    button.innerHTML = `<small>${index + 1}</small><strong>${ITEM_NAMES[item].slice(0, 2)}</strong><span>${world.inventory[item] || 0}</span>`;
    button.addEventListener("click", () => {
      selectedHotbarIndex = index;
      renderSandboxHotbar();
    });
    return button;
  }));
  updateInventoryDisplay();
}

function updateInventoryDisplay(){
  document.getElementById("sandboxInventory").textContent =
    ["wood", "stone", "berries", "crystals", "gel"]
      .map(item => `${ITEM_NAMES[item]} ${world.inventory[item] || 0}`).join(" · ");
}

function updateSandboxHud(){
  if (!world) return;
  document.getElementById("sandboxHpValue").textContent = `${world.player.hp}/${world.player.maxHp}`;
  document.getElementById("sandboxHpBar").style.width =
    `${world.player.hp / world.player.maxHp * 100}%`;
  document.getElementById("sandboxCoords").textContent =
    `X ${world.player.x} · Y ${world.player.y}`;
  document.getElementById("sandboxBiome").textContent =
    world.tiles[world.player.y]?.[world.player.x] === "sand" ? "SUNLIT SHORE" : "GREEN MEADOW";
  updateInventoryDisplay();
}

function showSandboxMessage(message){
  document.getElementById("sandboxMessage").textContent = message;
}

document.addEventListener("keydown", event => {
  const activePage = document.getElementById("sandbox");
  if (!activePage.classList.contains("active") || document.getElementById("sandboxShell").classList.contains("hidden")) return;
  if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "SUMMARY"].includes(event.target?.tagName)) return;
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
  if (world?.defeated || !document.getElementById("sandboxQuiz").classList.contains("hidden")) return;
  if (key === "w" || key === "arrowup") moveSandboxPlayer(0, -1);
  else if (key === "s" || key === "arrowdown") moveSandboxPlayer(0, 1);
  else if (key === "a" || key === "arrowleft") moveSandboxPlayer(-1, 0);
  else if (key === "d" || key === "arrowright") moveSandboxPlayer(1, 0);
  else if (key === "e") interactSandbox();
  else if (key === " ") mineSandbox();
  else if (key === "b") buildSandbox();
  else if (key === "k") attackSandboxEntity();
  else if (key === "h") useSelectedSandboxItem();
  else if (/^[1-8]$/.test(key)) {
    selectedHotbarIndex = Number(key) - 1;
    renderSandboxHotbar();
  }
});

document.getElementById("sandboxCourse").addEventListener("change", event => {
  if (world) {
    world.selectedCourse = event.target.value;
    saveWorld();
  }
});

const sandboxCourse = document.getElementById("sandboxCourse");
for (const course of window.APArcadeStudyData?.courses() || []) {
  const option = document.createElement("option");
  option.value = course;
  option.textContent = course;
  sandboxCourse.append(option);
}
for (const course of window.APArcadeStudyData?.courses() || []) {
  const option = document.createElement("option");
  option.value = course;
  option.textContent = course;
  coachCourse.append(option);
}

window.refreshFreeFeatures = refreshFreeFeatures;
window.runStudyCoach = runStudyCoach;
window.startSandbox = startSandbox;
window.moveSandboxPlayer = moveSandboxPlayer;
window.interactSandbox = interactSandbox;
window.mineSandbox = mineSandbox;
window.buildSandbox = buildSandbox;
window.attackSandboxEntity = attackSandboxEntity;
window.toggleSandboxCrafting = toggleSandboxCrafting;
window.craftSandboxItem = craftSandboxItem;
window.respawnSandboxPlayer = respawnSandboxPlayer;
window.closeSandboxQuiz = closeSandboxQuiz;
window.refreshCoachStatus = updateCoachStatus;
window.stopSandbox = stopSandbox;
window.resumeSandbox = resumeSandbox;

refreshFreeFeatures();
