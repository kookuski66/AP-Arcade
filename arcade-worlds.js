const arcadeRoot = document.getElementById("arcadeGameContent");
const arcadeTitle = document.getElementById("arcadeGameTitle");
const arcadeType = document.getElementById("arcadeGameType");
const arcadeLevel = document.getElementById("arcadeLevelSelect");
const arcadeStage = { biology: null, chemistry: null, calculus: null, physics: null };
const arcadeLevels = {
  biology: [
    {
      name: "01 • GLYCOLYSIS: LOAD NAD⁺",
      title: "CYTOSOL • GLYCOLYSIS",
      fact: "As glucose is oxidized and split into two pyruvate, NAD⁺ accepts high-energy electrons and H⁺ to become NADH. Glycolysis nets 2 ATP per glucose; oxygen is not required.",
      nodes: [
        { x: 185, label: "GLUCOSE", detail: "Begin with one 6-carbon glucose molecule in the cytosol." },
        { x: 360, label: "NAD⁺ → NADH", detail: "Pick up electrons: oxidation of an intermediate reduces NAD⁺ to NADH." },
        { x: 555, label: "2 PYRUVATE", detail: "The 6-carbon sugar splits into two 3-carbon pyruvate. Net yield: 2 ATP and 2 NADH." }
      ],
      compartment: "CYTOSOL", tint: "#285243", layout: "glycolysis", complete: "Both NADH electron carriers are loaded and pyruvate is ready for transport."
    },
    {
      name: "02 • PYRUVATE OXIDATION + KREBS",
      title: "MITOCHONDRIAL MATRIX • KREBS CYCLE",
      fact: "Pyruvate oxidation releases CO₂ and makes acetyl-CoA. Each acetyl-CoA enters the Krebs cycle; carbon leaves as CO₂ while NAD⁺ and FAD collect electrons as NADH and FADH₂.",
      nodes: [
        { x: 185, label: "PYRUVATE", detail: "A transporter carries pyruvate across the inner membrane into the mitochondrial matrix." },
        { x: 360, label: "ACETYL-CoA", detail: "Pyruvate oxidation releases CO₂ and transfers electrons to NAD⁺, forming NADH." },
        { x: 555, label: "KREBS CYCLE", detail: "The cycle regenerates oxaloacetate and loads NADH and FADH₂; carbon exits as CO₂." }
      ],
      compartment: "MITOCHONDRIAL MATRIX", tint: "#5b3837", layout: "krebs", complete: "NADH and FADH₂ carry captured electrons to the inner mitochondrial membrane."
    },
    {
      name: "03 • ELECTRON TRANSPORT + ATP SYNTHASE",
      title: "INNER MITOCHONDRIAL MEMBRANE",
      fact: "NADH donates electrons to Complex I; FADH₂ enters at Complex II. Electrons pass through ubiquinone, Complex III, cytochrome c, and Complex IV to O₂. Complexes I, III, and IV pump H⁺; ATP synthase uses that gradient.",
      nodes: [
        { x: 150, label: "COMPLEX I", detail: "NADH is oxidized back to NAD⁺. Its electrons enter the chain and Complex I pumps H⁺." },
        { x: 290, label: "COMPLEX II", detail: "FADH₂ donates electrons here. Complex II feeds the chain but does not pump protons." },
        { x: 430, label: "COMPLEX III", detail: "Ubiquinone delivers electrons to Complex III, which pumps H⁺ before passing them to cytochrome c." },
        { x: 565, label: "COMPLEX IV + O₂", detail: "Complex IV pumps H⁺ and transfers electrons to oxygen, the final electron acceptor; water forms." },
        { x: 700, label: "ATP SYNTHASE", detail: "H⁺ flows down its electrochemical gradient through ATP synthase, driving ADP + Pi → ATP." }
      ],
      compartment: "INTERMEMBRANE SPACE ↑ H⁺ | MATRIX ↓ H⁺", tint: "#263f64", layout: "electron-transport", complete: "Electron transport has reduced oxygen to water and powered oxidative phosphorylation."
    },
    {
      name: "04 • PHOTOSYSTEM II → PHOTOSYSTEM I",
      title: "CHLOROPLAST • THYLAKOID MEMBRANE",
      fact: "Light excites electrons in Photosystem II. Water is split to replace them, releasing O₂ and H⁺. Electrons travel through plastoquinone and cytochrome b₆f (which moves H⁺), then plastocyanin to Photosystem I. A second light boost lets ferredoxin and NADP⁺ reductase make NADPH.",
      nodes: [
        { x: 155, label: "H₂O → PSII", detail: "Light excites Photosystem II electrons. Photolysis splits water to replace them, releasing O₂ and H⁺." },
        { x: 300, label: "PLASTOQUINONE", detail: "The excited electron leaves PSII and is carried through the thylakoid membrane by plastoquinone." },
        { x: 445, label: "CYTOCHROME b₆f", detail: "Electron energy drives H⁺ movement into the thylakoid lumen, building a proton gradient." },
        { x: 580, label: "PHOTOSYSTEM I", detail: "A second photon re-excites the arriving electron; light energy is captured again." },
        { x: 710, label: "NADP⁺ → NADPH", detail: "Ferredoxin delivers the electron to NADP⁺ reductase, reducing NADP⁺ to NADPH." }
      ],
      compartment: "THYLAKOID LUMEN ↑ H⁺ | STROMA ↓ H⁺", tint: "#286258", layout: "photosystems", complete: "Light energy has reached NADPH; the proton gradient can also drive ATP synthase."
    }
  ],
  chemistry: [
    { name: "PERIODIC PANIC: ELEMENT SURVIVAL" }
  ],
  calculus: [
    { name: "THE LIMITLESS RUN: PROCEDURALLY GENERATED", fact: "Every ride builds a fresh curve and a new sequence of removable holes, vertical asymptotes, and steep slopes. Read the changing graph and act with momentum." }
  ],
  physics: [
    { name: "01 • HILLTOP SWITCH: IMPULSE", fact: "Impulse J = FΔt equals the change in momentum. A heavier projectile can deliver more impulse at the same speed.", target: { x: 620, y: 205 }, angle: 45, velocity: 15, mass: 2, surface: "Ice", layout: "hill", threshold: 25 },
    { name: "02 • ICE RINK: COEFFICIENT OF FRICTION", fact: "Friction depends on the normal force and coefficient μ. Compare the same launch on ice, concrete, and mud; friction converts mechanical energy into thermal energy.", target: { x: 570, y: 110 }, angle: 38, velocity: 17, mass: 2, surface: "Ice", layout: "ice", threshold: 22 },
    { name: "03 • SPRING GAP: ENERGY TRANSFER", fact: "Gravitational potential energy can become kinetic energy and elastic spring energy. Place a spring bumper before the gap to redirect energy into a higher launch.", target: { x: 660, y: 205 }, angle: 35, velocity: 16, mass: 2, surface: "Concrete", layout: "spring", threshold: 28 },
    { name: "04 • INCLINE HAUL: NORMAL FORCE", fact: "On an incline, the normal force is mg cos θ. Without enough friction or thrust, the component mg sin θ pulls a load back down the ramp.", target: { x: 635, y: 225 }, angle: 32, velocity: 17, mass: 3, surface: "Concrete", layout: "incline", threshold: 35 },
    { name: "05 • DOUBLE SWITCH: ELASTIC COLLISION", fact: "An elastic collision conserves both momentum and kinetic energy. A well-aimed projectile can bounce off the first target and continue toward a second switch.", target: { x: 575, y: 185 }, secondTarget: { x: 710, y: 265 }, angle: 40, velocity: 16, mass: 2, surface: "Concrete", layout: "double", threshold: 24 },
    { name: "06 • TORQUE BRIDGE: ROTATIONAL INERTIA", fact: "Torque τ = rF. Moving a mass farther from the pivot increases its torque; balance clockwise and counterclockwise torques to stabilize a bridge.", target: { x: 645, y: 205 }, angle: 34, velocity: 18, mass: 4, surface: "Concrete", layout: "bridge", threshold: 48 },
    { name: "07 • ORBITAL DOCK: ANGULAR MOMENTUM", fact: "With negligible external torque, L = Iω is conserved. Pulling mass inward lowers rotational inertia and increases angular speed.", target: { x: 620, y: 100 }, angle: 45, velocity: 17, mass: 2, surface: "Ice", layout: "orbit", threshold: 30 },
    { name: "08 • UNDERWATER GATE: BUOYANCY", fact: "Buoyant force equals the weight of displaced fluid. Adjusting ballast changes submarine density; moving water through a narrow pipe increases its flow speed.", target: { x: 400, y: 223 }, angle: 60, velocity: 16, mass: 3, surface: "Mud", layout: "underwater", threshold: 35 }
  ]
};

const arcadeState = {
  subject: "biology",
  level: 0,
  bio: { x: 80, y: 280, vx: 0, vy: 0, width: 34, height: 44, cameraX: 0, keys: new Set(), world: null, grounded: false, groundedPlatform: null, jumpPressed: false, activated: new Set(), completed: false, message: "", health: 3, invulnerable: 0, checkpointX: 80, score: 0, frame: 0, lightBoost: 0 },
  chemistry: { round: 0, score: 0, lives: 3, timeLeft: 12, phase: "playing", phaseTime: 0, playerAtomicNumber: 6, prompt: null, safeAtomicNumbers: [], status: "", lastMoveAt: 0, previousPromptId: "" },
  calc: { world: 0, speed: 3.2, score: 0, running: false, scanner: false, boost: false, tangent: false, chain: false, riemann: false, riemannMethod: "midpoint", leftLimit: "1", rightLimit: "1", limitMessage: "", fall: 0, jumpY: 0, keys: new Set(), completed: false, seed: 0, phases: [], events: [], nextEventAt: 0, invulnerable: 0, frame: 0, message: "", secantUntil: 0, tangentUntil: 0, currentSlope: 0, highScore: 0 },
  physics: { angle: 45, velocity: 15, mass: 2, friction: "Ice", predictor: true, vectors: true, spring: false, time: null, score: 0, energy: 100, lastShotBlocked: false, completed: false }
};

const periodicElementRows = [
  ["H", "Hydrogen", 1.008], ["He", "Helium", 4.0026],
  ["Li", "Lithium", 6.94], ["Be", "Beryllium", 9.0122], ["B", "Boron", 10.81], ["C", "Carbon", 12.011], ["N", "Nitrogen", 14.007], ["O", "Oxygen", 15.999], ["F", "Fluorine", 18.998], ["Ne", "Neon", 20.180],
  ["Na", "Sodium", 22.990], ["Mg", "Magnesium", 24.305], ["Al", "Aluminum", 26.982], ["Si", "Silicon", 28.085], ["P", "Phosphorus", 30.974], ["S", "Sulfur", 32.06], ["Cl", "Chlorine", 35.45], ["Ar", "Argon", 39.948],
  ["K", "Potassium", 39.098], ["Ca", "Calcium", 40.078], ["Sc", "Scandium", 44.956], ["Ti", "Titanium", 47.867], ["V", "Vanadium", 50.942], ["Cr", "Chromium", 51.996], ["Mn", "Manganese", 54.938], ["Fe", "Iron", 55.845], ["Co", "Cobalt", 58.933], ["Ni", "Nickel", 58.693], ["Cu", "Copper", 63.546], ["Zn", "Zinc", 65.38], ["Ga", "Gallium", 69.723], ["Ge", "Germanium", 72.630], ["As", "Arsenic", 74.922], ["Se", "Selenium", 78.971], ["Br", "Bromine", 79.904], ["Kr", "Krypton", 83.798],
  ["Rb", "Rubidium", 85.468], ["Sr", "Strontium", 87.62], ["Y", "Yttrium", 88.906], ["Zr", "Zirconium", 91.224], ["Nb", "Niobium", 92.906], ["Mo", "Molybdenum", 95.95], ["Tc", "Technetium", 98], ["Ru", "Ruthenium", 101.07], ["Rh", "Rhodium", 102.91], ["Pd", "Palladium", 106.42], ["Ag", "Silver", 107.87], ["Cd", "Cadmium", 112.41], ["In", "Indium", 114.82], ["Sn", "Tin", 118.71], ["Sb", "Antimony", 121.76], ["Te", "Tellurium", 127.60], ["I", "Iodine", 126.90], ["Xe", "Xenon", 131.29],
  ["Cs", "Cesium", 132.91], ["Ba", "Barium", 137.33], ["La", "Lanthanum", 138.91], ["Ce", "Cerium", 140.12], ["Pr", "Praseodymium", 140.91], ["Nd", "Neodymium", 144.24], ["Pm", "Promethium", 145], ["Sm", "Samarium", 150.36], ["Eu", "Europium", 151.96], ["Gd", "Gadolinium", 157.25], ["Tb", "Terbium", 158.93], ["Dy", "Dysprosium", 162.50], ["Ho", "Holmium", 164.93], ["Er", "Erbium", 167.26], ["Tm", "Thulium", 168.93], ["Yb", "Ytterbium", 173.05], ["Lu", "Lutetium", 174.97], ["Hf", "Hafnium", 178.49], ["Ta", "Tantalum", 180.95], ["W", "Tungsten", 183.84], ["Re", "Rhenium", 186.21], ["Os", "Osmium", 190.23], ["Ir", "Iridium", 192.22], ["Pt", "Platinum", 195.08], ["Au", "Gold", 196.97], ["Hg", "Mercury", 200.59], ["Tl", "Thallium", 204.38], ["Pb", "Lead", 207.2], ["Bi", "Bismuth", 208.98], ["Po", "Polonium", 209], ["At", "Astatine", 210], ["Rn", "Radon", 222],
  ["Fr", "Francium", 223], ["Ra", "Radium", 226], ["Ac", "Actinium", 227], ["Th", "Thorium", 232.04], ["Pa", "Protactinium", 231.04], ["U", "Uranium", 238.03], ["Np", "Neptunium", 237], ["Pu", "Plutonium", 244], ["Am", "Americium", 243], ["Cm", "Curium", 247], ["Bk", "Berkelium", 247], ["Cf", "Californium", 251], ["Es", "Einsteinium", 252], ["Fm", "Fermium", 257], ["Md", "Mendelevium", 258], ["No", "Nobelium", 259], ["Lr", "Lawrencium", 266], ["Rf", "Rutherfordium", 267], ["Db", "Dubnium", 268], ["Sg", "Seaborgium", 269], ["Bh", "Bohrium", 270], ["Hs", "Hassium", 277], ["Mt", "Meitnerium", 278], ["Ds", "Darmstadtium", 281], ["Rg", "Roentgenium", 282], ["Cn", "Copernicium", 285], ["Nh", "Nihonium", 286], ["Fl", "Flerovium", 289], ["Mc", "Moscovium", 290], ["Lv", "Livermorium", 293], ["Ts", "Tennessine", 294], ["Og", "Oganesson", 294]
];

const alkaliMetals = new Set(["Li", "Na", "K", "Rb", "Cs", "Fr"]);
const alkalineEarthMetals = new Set(["Be", "Mg", "Ca", "Sr", "Ba", "Ra"]);
const metalloids = new Set(["B", "Si", "Ge", "As", "Sb", "Te"]);
const postTransitionMetals = new Set(["Al", "Ga", "In", "Sn", "Tl", "Pb", "Bi", "Po", "Nh", "Fl", "Mc", "Lv"]);
const reactiveNonmetals = new Set(["H", "C", "N", "O", "P", "S", "Se"]);
const halogens = new Set(["F", "Cl", "Br", "I", "At", "Ts"]);
const nobleGases = new Set(["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"]);
const knownElectronegativity = { H: 2.20, Li: .98, Be: 1.57, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Na: .93, Mg: 1.31, Al: 1.61, Si: 1.90, P: 2.19, S: 2.58, Cl: 3.16, K: .82, Ca: 1, Fe: 1.83, Cu: 1.90, Br: 2.96, I: 2.66 };

function periodicPosition(atomicNumber){
  if (atomicNumber === 1) return { period: 1, group: 1, row: 1, column: 1 };
  if (atomicNumber === 2) return { period: 1, group: 18, row: 1, column: 18 };
  const starts = [3, 11, 19, 37, 55, 87];
  const periods = [2, 3, 4, 5, 6, 7];
  const periodIndex = starts.findIndex((start, index) => atomicNumber >= start && atomicNumber < (starts[index + 1] || 119));
  const period = periods[periodIndex];
  const start = starts[periodIndex];
  if (period <= 3) {
    const offset = atomicNumber - start;
    const group = offset < 2 ? offset + 1 : offset + 11;
    return { period, group, row: period, column: group };
  }
  if (period === 6 && atomicNumber >= 58 && atomicNumber <= 71) {
    return { period, group: 3, row: 8, column: atomicNumber - 54 };
  }
  if (period === 7 && atomicNumber >= 90 && atomicNumber <= 103) {
    return { period, group: 3, row: 9, column: atomicNumber - 86 };
  }
  let group = atomicNumber - start + 1;
  if (period >= 6 && atomicNumber >= start + 3) group -= 14;
  return { period, group, row: period, column: group };
}

const periodicElements = periodicElementRows.map(([symbol, name, mass], index) => {
  const atomicNumber = index + 1;
  const position = periodicPosition(atomicNumber);
  const isLanthanide = atomicNumber >= 57 && atomicNumber <= 71;
  const isActinide = atomicNumber >= 89 && atomicNumber <= 103;
  const isTransitionMetal = (atomicNumber >= 21 && atomicNumber <= 30)
    || (atomicNumber >= 39 && atomicNumber <= 48)
    || (atomicNumber >= 72 && atomicNumber <= 80)
    || (atomicNumber >= 104 && atomicNumber <= 112);
  const isHalogen = halogens.has(symbol);
  const isNobleGas = nobleGases.has(symbol);
  const isMetalloid = metalloids.has(symbol);
  const category = alkaliMetals.has(symbol) ? "alkali-metal"
    : alkalineEarthMetals.has(symbol) ? "alkaline-earth"
      : isHalogen ? "halogen"
        : isNobleGas ? "noble-gas"
          : isLanthanide ? "lanthanide"
            : isActinide ? "actinide"
              : isTransitionMetal ? "transition-metal"
                : isMetalloid ? "metalloid"
                  : postTransitionMetals.has(symbol) ? "post-transition"
                    : reactiveNonmetals.has(symbol) ? "nonmetal" : "post-transition";
  const isMetal = !isHalogen && !isNobleGas && !isMetalloid && !reactiveNonmetals.has(symbol);
  const electronegativity = isNobleGas ? null : knownElectronegativity[symbol]
    ?? Math.round((.65 + (position.group - 1) * .16 + (7 - position.period) * .09) * 100) / 100;
  const radiusPm = 240 - (position.group - 1) * 7 + (position.period - 1) * 18;
  return {
    atomicNumber, symbol, name, mass, ...position, category, isMetal,
    isNonmetal: !isMetal && !isMetalloid,
    ion: isMetal ? "cation" : isNobleGas || isMetalloid ? "none" : "anion",
    electronegativity, radiusPm
  };
});

const chemistryPrompts = [
  { id: "radius", text: "Find an element with a large atomic radius.", match: element => element.period >= 5 && element.group <= 2 },
  { id: "electronegativity", text: "Find an element with high electronegativity.", match: element => element.electronegativity !== null && element.electronegativity >= 3 },
  { id: "heavy", text: "Find an element with an atomic mass over 200 u.", match: element => element.mass >= 200 },
  { id: "light", text: "Find an element with an atomic mass under 10 u.", match: element => element.mass < 10 },
  { id: "cation", text: "Find a metal that forms positive ions.", match: element => element.ion === "cation" },
  { id: "anion", text: "Find a nonmetal that forms negative ions.", match: element => element.ion === "anion" },
  { id: "metal", text: "Find any metal.", match: element => element.isMetal },
  { id: "nonmetal", text: "Find any nonmetal.", match: element => element.isNonmetal },
  { id: "noble-gas", text: "Find a stable, unreactive gas.", match: element => element.category === "noble-gas" },
  { id: "halogen", text: "Find a reactive nonmetal that often forms a −1 ion.", match: element => element.category === "halogen" },
  { id: "alkali", text: "Find a reactive metal that forms a +1 ion.", match: element => element.category === "alkali-metal" },
  { id: "alkaline-earth", text: "Find a metal with two valence electrons that often forms a +2 ion.", match: element => element.category === "alkaline-earth" },
  { id: "transition", text: "Find a transition metal.", match: element => element.category === "transition-metal" && element.group < 12 },
  { id: "metalloid", text: "Find an element with both metallic and nonmetallic properties.", match: element => element.category === "metalloid" },
  { id: "period-three", text: "Find an element with three electron shells.", match: element => element.period === 3 }
];

const arcadeLevelNames = Object.fromEntries(Object.entries(arcadeLevels).map(([key, levels]) =>
  [key, levels.map(level => level.name)]
));

function renderArcadeGame(){
  const subject = arcadeState.subject;
  const level = arcadeLevels[subject][arcadeState.level];
  document.querySelectorAll("[data-arcade-game]").forEach(button => {
    const active = button.dataset.arcadeGame === subject;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("arcadeGame").className = `arcade-game ${subject}`;
  arcadeTitle.textContent = subject === "biology" ? "THE CELL: ENERGY RUN"
    : subject === "chemistry" ? "PERIODIC PANIC: ELEMENT SURVIVAL"
      : subject === "calculus" ? "GRAPH SURFER: CURVE RUN"
        : "PROJECTILE LAB: SWITCH PUZZLE";
  arcadeType.textContent = subject === "biology" ? "CELL RUNNER • 2D PLATFORMER"
    : subject === "chemistry" ? "CHEMISTRY • PERIODIC TABLE TILE GAME"
      : subject === "calculus" ? "GRAPH SURFER • CALCULUS TOOLS"
        : "PROJECTILE PUZZLES • MECHANICS";
  arcadeLevel.replaceChildren(...arcadeLevelNames[subject].map((name, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = name;
    option.selected = index === arcadeState.level;
    return option;
  }));
  if (subject === "biology") renderBiology(level);
  else if (subject === "chemistry") renderChemistry(level);
  else if (subject === "calculus") renderCalculus(level);
  else renderPhysics(level);
  prepareArcadeSprite();
}

function drawSlopeField(ctx){
  ctx.strokeStyle = "rgba(142,255,210,.55)";
  ctx.lineWidth = 2;
  for (let px = 55; px < 800; px += 74) {
    for (let py = 70; py < 330; py += 58) {
      const slope = ((px - 400) / 400 - (205 - py) / 130);
      const angle = Math.atan(slope);
      const dx = Math.cos(angle) * 14;
      const dy = Math.sin(angle) * 14;
      ctx.beginPath();
      ctx.moveTo(px - dx, py + dy);
      ctx.lineTo(px + dx, py - dy);
      ctx.stroke();
    }
  }
}

function stageMarkup(canvasId, caption, statusId){
  return `<div class="arcade-stage"><canvas id="${canvasId}" width="800" height="360" aria-label="${caption}"></canvas><div class="arcade-stage-caption"><span>${caption}</span><strong id="${statusId}"></strong></div></div>`;
}

function arcadeRandom(seed){
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createBiologyWorld(level, levelIndex){
  const random = arcadeRandom(7411 + levelIndex * 3907);
  const length = 4400 + levelIndex * 180;
  const platforms = [];
  let x = 0;
  let section = 0;
  if (level.layout === "krebs") {
    for (x = 0; x < length; x += 185, section += 1) {
      const y = 255 + Math.cos(x / length * Math.PI * 2) * 75;
      platforms.push({ id: `cycle-${section}`, x, y, w: 148, h: 22, kind: "cycle", dx: 0 });
    }
  } else {
    while (x < length) {
      const width = 205 + Math.floor(random() * 105);
      const y = 333 + Math.floor(random() * 3) * 13;
      platforms.push({ id: `ground-${section}`, x, y, w: Math.min(width, length - x), h: 26, kind: "membrane", dx: 0 });
      x += width + 48 + Math.floor(random() * 38);
      section += 1;
    }
  }
  if (level.layout === "glycolysis") {
    const branchStart = 2320, branchEnd = 3780;
    for (let index = platforms.length - 1; index >= 0; index -= 1) {
      if (platforms[index].x + platforms[index].w > branchStart && platforms[index].x < branchEnd) platforms.splice(index, 1);
    }
    platforms.push(
      { id: "split-step-1", x: 2300, y: 300, w: 120, h: 20, kind: "branch-a", dx: 0 },
      { id: "split-step-2", x: 2405, y: 265, w: 120, h: 20, kind: "branch-a", dx: 0 }
    );
    for (let index = 0, branchX = 2500; branchX < branchEnd; index += 1, branchX += 190) {
      platforms.push({ id: `pyruvate-a-${index}`, x: branchX, y: 330, w: 150, h: 22, kind: "branch-a", dx: 0 });
      platforms.push({ id: `pyruvate-b-${index}`, x: branchX, y: 220, w: 150, h: 22, kind: "branch-b", dx: 0 });
    }
    platforms.push(
      { id: "merge-step-1", x: 3700, y: 265, w: 120, h: 20, kind: "branch-b", dx: 0 },
      { id: "merge-step-2", x: 3820, y: 310, w: 135, h: 22, kind: "membrane", dx: 0 }
    );
  }
  const groundAt = worldX => platforms.reduce((best, platform) =>
    Math.abs(platform.x + platform.w / 2 - worldX) < Math.abs(best.x + best.w / 2 - worldX) ? platform : best
  , platforms[0]);
  const carriers = [];
  for (let carrierX = 440, index = 0; carrierX < length - 260; carrierX += 620 + Math.floor(random() * 120), index += 1) {
    carriers.push({
      id: `carrier-${index}`, x: carrierX, baseX: carrierX, y: 264 + Math.floor(random() * 2) * 20,
      w: 118, h: 18, kind: "carrier", amplitude: 38 + random() * 38, phase: random() * Math.PI * 2, dx: 0
    });
  }
  platforms.push(...carriers);
  const enzymes = level.nodes.map((node, index) => {
    const enzymeX = level.layout === "glycolysis" && index === level.nodes.length - 1
      ? 3410
      : 520 + index * ((length - 930) / Math.max(1, level.nodes.length - 1));
    const ground = groundAt(enzymeX);
    return { x: enzymeX, y: ground.y - 44, label: node.label, detail: node.detail, activated: false };
  });
  const enemies = [];
  for (let enemyX = 820, index = 0; enemyX < length - 210; enemyX += 560 + Math.floor(random() * 200), index += 1) {
    const ground = groundAt(enemyX);
    enemies.push({
      x: enemyX, originX: enemyX, y: ground.y - 30, w: 34, h: 28,
      range: 48 + random() * 40, phase: random() * Math.PI * 2, kind: index % 2 ? "virus" : "bacterium", defeated: false
    });
  }
  const pickups = [];
  for (let pickupX = 340, index = 0; pickupX < length - 160; pickupX += 205 + Math.floor(random() * 100), index += 1) {
    const ground = groundAt(pickupX);
    pickups.push({ x: pickupX, y: ground.y - 72 - Math.floor(random() * 26), taken: false, value: index % 4 === 3 ? 3 : 1, type: "atp" });
  }
  if (level.layout === "photosystems") {
    [1050, 2520, 3980].forEach((lightX, index) => {
      const ground = groundAt(lightX);
      pickups.push({ x: lightX, y: ground.y - 115 - (index % 2) * 20, taken: false, value: 0, type: "light" });
    });
  }
  return { length, platforms, enzymes, enemies, pickups, exitX: length - 110, theme: levelIndex, layout: level.layout, frame: 0 };
}

function renderBiology(level){
  arcadeRoot.innerHTML = `<div class="bio-briefing"><div class="eyebrow">${level.title} • SIDE-SCROLLING CELL RUN</div><p>${level.fact}</p></div>
    <div class="calc-hud bio-hud"><span>ATP <strong id="bioScore">0</strong></span><span>ENERGY <strong id="bioHealth">♥ ♥ ♥</strong></span><span>ENZYMES <strong id="bioEnzymes">0 / ${level.nodes.length}</strong></span><span>CHECKPOINT <strong id="bioCheckpoint">MEMBRANE A</strong></span>${level.layout === "photosystems" ? '<span>LIGHT <strong id="bioLight">READY</strong></span>' : ""}</div>
    <div class="arcade-stage"><canvas id="bioCanvas" width="800" height="420" aria-label="Side-scrolling cell platformer. Move with arrows or A and D, jump with Space or Up, interact with enzymes using E, and stomp bacteria or viruses."></canvas><div class="arcade-stage-caption"><span>← → / A D MOVE · SPACE / ↑ JUMP · E ACTIVATE ENZYME · STOMP PATHOGENS</span><strong id="bioStatus"></strong></div></div>
    <div class="arcade-controls arcade-mobile-controls bio-touch-controls" aria-label="Platformer touch controls">
      <button class="pixel-btn" data-action="bio-left" data-hold-key="arrowleft" type="button">◀</button><button class="pixel-btn primary" data-action="bio-jump" type="button">JUMP ▲</button><button class="pixel-btn" data-action="bio-right" data-hold-key="arrowright" type="button">▶</button><button class="pixel-btn" data-action="bio-interact" type="button">E · ENZYME</button>
    </div>
    <p class="arcade-fact"><strong>MISSION:</strong> Traverse the ${level.compartment.toLowerCase()} to the pathway exit. Ride carrier proteins, activate each enzyme checkpoint, collect ATP, and stomp invading pathogens. ${level.layout === "glycolysis" ? "At the split, take either the PYRUVATE A or PYRUVATE B route." : level.layout === "krebs" ? "Follow the rising and falling platforms around the circular cycle map." : level.layout === "photosystems" ? "Collect glowing photons for a temporary speed and jump boost." : ""}</p>`;
  arcadeStage.biology = document.getElementById("bioCanvas").getContext("2d");
  Object.assign(arcadeState.bio, {
    x: 80, y: 270, vx: 0, vy: 0, cameraX: 0, world: createBiologyWorld(level, arcadeState.level),
    grounded: false, groundedPlatform: null, jumpPressed: false, activated: new Set(),
    completed: false, message: "The pathway begins ahead. Move, jump, and explore.", health: 3,
    invulnerable: 0, checkpointX: 80, score: 0, frame: 0, lightBoost: 0
  });
  arcadeState.bio.keys.clear();
  drawBiology();
}

function renderChemistry(level){
  resetChemistryRun();
  const game = arcadeState.chemistry;
  const groupLabels = Array.from({ length: 18 }, (_, index) =>
    `<span class="chem-group-number" style="grid-row:1;grid-column:${index + 1}">${index + 1}</span>`
  ).join("");
  const tiles = periodicElements.map(element =>
    `<div class="chem-element chem-${element.category}" data-chem-z="${element.atomicNumber}" data-chem-category="${element.category}" role="gridcell" aria-label="${element.name}, ${element.mass} atomic mass units" title="${element.name} · ${element.mass} u · ${element.category.replaceAll("-", " ")}" style="grid-row:${element.row + 1};grid-column:${element.column}">
      <span class="chem-atomic-number">${element.atomicNumber}</span><strong>${element.symbol}</strong><small>${element.name}</small>
    </div>`
  ).join("");
  arcadeRoot.innerHTML = `<section class="chem-periodic-game">
    <header class="chem-round-banner">
      <div class="chem-prompt-copy"><span class="chem-round-kicker">ROUND <strong id="chemRound">1</strong> · PERIODIC PANIC</span><h3 id="chemPrompt">${game.prompt.text}</h3></div>
      <div class="chem-countdown"><span>COLLAPSE IN</span><strong id="chemTimer">12.0</strong><i><b id="chemTimerBar"></b></i></div>
    </header>
    <div class="chem-game-stats"><span>SAFE ROUNDS <strong id="chemScore">0</strong></span><span>ENERGY <strong id="chemLives">♥ ♥ ♥</strong></span><span>YOU ARE ON <strong id="chemCurrentElement">CARBON</strong></span></div>
    <p class="chem-game-instructions">Move one element at a time with <kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> or <kbd>WASD</kbd>. Be on a matching element when the timer hits zero. Wrong tiles fall, then the table resets.</p>
    <div class="chem-table-scroll" aria-label="Periodic table game board">
      <div id="chemPeriodicTable" class="chem-periodic-table" role="grid" aria-label="Periodic table. Use arrow keys or WASD to move your character between elements." tabindex="0">
        ${groupLabels}${tiles}
        <span class="chem-series-label" style="grid-row:9;grid-column:1 / span 3">LANTHANIDES</span>
        <span class="chem-series-label" style="grid-row:10;grid-column:1 / span 3">ACTINIDES</span>
      </div>
    </div>
    <div class="chem-table-legend"><span><i class="alkali"></i>ALKALI METAL</span><span><i class="transition"></i>TRANSITION METAL</span><span><i class="metalloid"></i>METALLOID</span><span><i class="nonmetal"></i>NONMETAL</span><span><i class="noble"></i>NOBLE GAS</span></div>
    <div class="chem-move-controls" aria-label="Move one element">
      <button class="pixel-btn" data-action="chem-move" data-direction="up" type="button" aria-label="Move up">▲</button>
      <button class="pixel-btn" data-action="chem-move" data-direction="left" type="button" aria-label="Move left">◀</button>
      <button class="pixel-btn" data-action="chem-move" data-direction="down" type="button" aria-label="Move down">▼</button>
      <button class="pixel-btn" data-action="chem-move" data-direction="right" type="button" aria-label="Move right">▶</button>
    </div>
    <p id="chemStatus" class="chem-status chem-game-status" role="status" aria-live="polite">${game.status}</p>
    <div id="chemGameOver" class="chem-game-over hidden">
      <div class="eyebrow">TABLE COLLAPSED</div><h3>RUN OVER</h3><p>You survived <strong id="chemFinalScore">0</strong> rounds.</p>
      <button class="pixel-btn primary" data-action="chem-restart" type="button">PLAY AGAIN ▶</button>
    </div>
  </section>`;
  updateChemistryTiles();
  updateChemistryHud();
}

function startChemistryRound(){
  const game = arcadeState.chemistry;
  const options = chemistryPrompts.filter(prompt => prompt.id !== game.previousPromptId);
  game.prompt = options[Math.floor(Math.random() * options.length)];
  game.previousPromptId = game.prompt.id;
  game.safeAtomicNumbers = periodicElements.filter(game.prompt.match).map(element => element.atomicNumber);
  game.round += 1;
  game.timeLeft = 12;
  game.phase = "playing";
  game.phaseTime = 0;
  game.status = "Choose a tile before the table collapses.";
  updateChemistryTiles();
  updateChemistryHud();
}

function resetChemistryRun(){
  Object.assign(arcadeState.chemistry, {
    round: 0, score: 0, lives: 3, timeLeft: 12, phase: "playing", phaseTime: 0,
    playerAtomicNumber: 6, prompt: null, safeAtomicNumbers: [], status: "",
    lastMoveAt: 0, previousPromptId: ""
  });
  startChemistryRound();
}

function moveChemistryPlayer(direction){
  const game = arcadeState.chemistry;
  if (game.phase !== "playing") return;
  const now = Date.now();
  if (now - game.lastMoveAt < 90) return;
  game.lastMoveAt = now;
  const current = periodicElements[game.playerAtomicNumber - 1];
  if ((direction === "down" && current.atomicNumber === 57) || (direction === "up" && current.atomicNumber === 58)) {
    game.playerAtomicNumber = direction === "down" ? 58 : 57;
  } else if ((direction === "down" && current.atomicNumber === 89) || (direction === "up" && current.atomicNumber === 90)) {
    game.playerAtomicNumber = direction === "down" ? 90 : 89;
  } else {
    const horizontal = direction === "left" || direction === "right";
    const sign = direction === "left" || direction === "up" ? -1 : 1;
    const choices = periodicElements.filter(element => horizontal
      ? element.row === current.row && Math.sign(element.column - current.column) === sign
      : Math.sign(element.row - current.row) === sign);
    choices.sort((a, b) => horizontal
      ? Math.abs(a.column - current.column) - Math.abs(b.column - current.column)
      : Math.abs(a.row - current.row) - Math.abs(b.row - current.row)
        || Math.abs(a.column - current.column) - Math.abs(b.column - current.column));
    if (choices[0]) game.playerAtomicNumber = choices[0].atomicNumber;
  }
  updateChemistryTiles();
  updateChemistryHud();
}

function updateChemistryTiles(){
  const table = document.getElementById("chemPeriodicTable");
  if (!table) return;
  table.querySelectorAll("[data-chem-z]").forEach(tile => {
    const atomicNumber = Number(tile.dataset.chemZ);
    const current = atomicNumber === arcadeState.chemistry.playerAtomicNumber;
    tile.classList.toggle("chem-safe", arcadeState.chemistry.phase === "falling" && arcadeState.chemistry.safeAtomicNumbers.includes(atomicNumber));
    tile.classList.toggle("chem-falling", arcadeState.chemistry.phase === "falling" && !arcadeState.chemistry.safeAtomicNumbers.includes(atomicNumber));
    tile.classList.remove("chem-player-fall");
    tile.removeAttribute("aria-current");
    const previousMarker = tile.querySelector(".chem-player-marker");
    if (previousMarker) previousMarker.remove();
    if (current) {
      tile.setAttribute("aria-current", "location");
      const marker = document.createElement("canvas");
      marker.className = "chem-player-marker";
      marker.width = 32;
      marker.height = 40;
      marker.setAttribute("aria-hidden", "true");
      drawArcadeHero(marker.getContext("2d"), 0, 0, 32, 40);
      tile.append(marker);
    }
  });
}

function updateChemistryHud(){
  const game = arcadeState.chemistry;
  const timer = document.getElementById("chemTimer");
  const timerBar = document.getElementById("chemTimerBar");
  const round = document.getElementById("chemRound");
  const prompt = document.getElementById("chemPrompt");
  const score = document.getElementById("chemScore");
  const lives = document.getElementById("chemLives");
  const current = periodicElements[game.playerAtomicNumber - 1];
  const currentElement = document.getElementById("chemCurrentElement");
  const status = document.getElementById("chemStatus");
  const gameOver = document.getElementById("chemGameOver");
  const finalScore = document.getElementById("chemFinalScore");
  if (timer) timer.textContent = game.phase === "playing" ? game.timeLeft.toFixed(1) : game.phase === "falling" ? "0.0" : "—";
  if (timerBar) timerBar.style.width = `${Math.max(0, Math.min(1, game.timeLeft / 12)) * 100}%`;
  if (round) round.textContent = String(game.round);
  if (prompt && game.prompt) prompt.textContent = game.prompt.text;
  if (score) score.textContent = String(game.score);
  if (lives) lives.textContent = `${"♥ ".repeat(game.lives)}${"♡ ".repeat(3 - game.lives)}`.trim();
  if (currentElement) currentElement.textContent = `${current.symbol} · ${current.name.toUpperCase()}`;
  if (status) status.textContent = game.status;
  if (gameOver) gameOver.classList.toggle("hidden", game.phase !== "gameover");
  if (finalScore) finalScore.textContent = String(game.score);
}

function resolveChemistryRound(){
  const game = arcadeState.chemistry;
  const safe = game.safeAtomicNumbers.includes(game.playerAtomicNumber);
  const current = periodicElements[game.playerAtomicNumber - 1];
  game.phase = "falling";
  game.phaseTime = 1.5;
  if (safe) {
    game.score += 1;
    game.status = `${current.name} stayed put — safe! The rest of the table is falling.`;
  } else {
    game.lives -= 1;
    game.status = `${current.name} fell! Find a safe element before the next prompt.`;
  }
  updateChemistryTiles();
  if (!safe) {
    const tile = document.querySelector(`[data-chem-z="${game.playerAtomicNumber}"]`);
    tile?.classList.add("chem-player-fall");
  }
  updateChemistryHud();
}

function tickChemistryRound(){
  const game = arcadeState.chemistry;
  if (game.phase === "playing") {
    game.timeLeft = Math.max(0, game.timeLeft - .1);
    if (game.timeLeft === 0) resolveChemistryRound();
    else updateChemistryHud();
    return;
  }
  if (game.phase !== "falling") return;
  game.phaseTime = Math.max(0, game.phaseTime - .1);
  if (game.phaseTime > 0) return;
  if (game.lives <= 0) {
    game.phase = "gameover";
    game.status = "The periodic table won this round. Play again to try another run.";
    updateChemistryHud();
    return;
  }
  if (!game.safeAtomicNumbers.includes(game.playerAtomicNumber)) {
    const safeNumber = game.safeAtomicNumbers[Math.floor(Math.random() * game.safeAtomicNumbers.length)];
    game.playerAtomicNumber = safeNumber;
  }
  startChemistryRound();
}

function advanceArcadeLevel(subject){
  if (arcadeState.subject !== subject || subject === "chemistry") return;
  if (arcadeState.level + 1 >= arcadeLevels[subject].length) {
    if (subject === "biology") {
      arcadeState.bio.completed = true;
      arcadeState.bio.message = "RESPIRATION + PHOTOSYNTHESIS COMPLETE! You traced electrons through both energy pathways.";
    }
    if (subject === "physics") arcadeState.physics.completed = true;
    const status = document.getElementById(subject === "biology" ? "bioStatus" : "physicsStatus");
    if (status) status.textContent = subject === "biology" ? arcadeState.bio.message : "ALL PHYSICS LEVELS CLEARED! Eight mechanics puzzles complete.";
    return;
  }
  arcadeState.level += 1;
  renderArcadeGame();
}

function interactBiologyEnzyme(){
  const game = arcadeState.bio;
  const world = game.world;
  if (!world || game.completed) return;
  const enzyme = world.enzymes.find(item => !item.activated && Math.abs(game.x + game.width / 2 - item.x) < 82
    && Math.abs(game.y + game.height / 2 - item.y) < 92);
  if (!enzyme) {
    game.message = "No enzyme in reach. Explore the membrane and look for the glowing enzyme marker.";
    return;
  }
  enzyme.activated = true;
  game.activated.add(enzyme.label);
  game.score += 100;
  game.checkpointX = Math.max(game.checkpointX, enzyme.x - 100);
  game.message = `${enzyme.label}: ${enzyme.detail}`;
  if (world.enzymes.every(item => item.activated)) {
    game.message += " All enzyme gates are active. Reach the pathway exit!";
  }
}

function renderCalculus(level){
  arcadeRoot.innerHTML = `<div class="calc-hud"><span>RUN SCORE <strong id="calcScore">0</strong></span><span>DISTANCE <strong id="calcPosition">0 m</strong></span><span>MOMENTUM <strong id="calcSpeed">3.2</strong></span><span>BEST <strong id="calcBest">0</strong></span></div>
    ${stageMarkup("calcCanvas", "PRESS START • X phase • Z jump • C secant bridge • V tangent ramp • ←/→ tune momentum", "calcStatus")}
    <div class="arcade-controls calc-start-controls"><button class="pixel-btn primary" data-action="calc-start" type="button">START RUN ▶</button><span>Review the curve, then start the runner. Press again to generate and start a fresh run.</span></div>
    <div class="arcade-controls arcade-mobile-controls calc-touch-controls" aria-label="Graph surfer ability controls">
      <button class="pixel-btn" data-action="calc-x" type="button">X · PHASE</button><button class="pixel-btn" data-action="calc-z" type="button">Z · JUMP</button><button class="pixel-btn" data-action="calc-c" type="button">C · SECANT</button><button class="pixel-btn" data-action="calc-v" type="button">V · TANGENT</button>
    </div>
    <div class="calc-tools">
      <div class="calc-tool"><strong>RANDOM CURVES</strong><p>Every run generates new frequencies, slopes, and obstacle spacing. The track scrolls continuously; there is no fixed level loop.</p></div>
      <div class="calc-tool"><strong>MOMENTUM + DERIVATIVES</strong><p>Downhill slopes build speed; steep uphill sections drain it. Use a secant bridge to connect two nearby points across a climb.</p></div>
      <div class="calc-tool"><strong>LIMITS + TANGENTS</strong><p>Press X to phase through a vertical asymptote, Z to jump a removable hole, or V to turn the local tangent into a temporary launch ramp.</p></div>
    </div>
    <p class="arcade-fact"><strong>${level.name}:</strong> ${level.fact} Arrow keys add or trim momentum without pausing the ride.</p>`;
  arcadeStage.calculus = document.getElementById("calcCanvas").getContext("2d");
  if (!arcadeState.calc.seed) startCalculusRun();
  drawCalculus();
}

function renderPhysics(level){
  const game = arcadeState.physics;
  if (!level) {
    arcadeRoot.innerHTML = `<div class="physics-clear"><div class="eyebrow">MISSION COMPLETE</div><h2>ALL EIGHT PHYSICS CHALLENGES CLEARED</h2><p>Impulse, friction, energy, inclines, collisions, torque, angular momentum, and buoyancy: you made it through the full course.</p><button class="pixel-btn primary" type="button" data-action="physics-restart">REPLAY FROM THE HILLTOP ▶</button></div>`;
    return;
  }
  if (game.loadedLevel !== arcadeState.level) {
    game.loadedLevel = arcadeState.level;
    game.angle = 25;
    game.velocity = 12;
    game.mass = 2;
    game.friction = level.surface;
    game.spring = level.layout === "spring";
    game.energy = 100;
    game.score = 0;
    game.completed = false;
    game.lastShotBlocked = false;
    game.time = null;
    game.bounceAt = null;
  }
  arcadeRoot.innerHTML = `<div class="physics-hud"><span>ENERGY BUDGET <strong id="physicsEnergy">${Math.round(game.energy)}%</strong></span><span>SWITCHES <strong id="physicsScore">${game.score} / ${level.secondTarget ? 2 : 1}</strong></span><span>FRICTION <strong id="physicsSurface">${game.friction}</strong></span></div>
    ${stageMarkup("physicsCanvas", "Set the launch, then fire to hit the switch. Toggle predictor and velocity vectors.", "physicsStatus")}
    <div class="arcade-controls">
      <label class="arcade-control">ANGLE <input id="physicsAngle" type="range" min="10" max="80" value="${game.angle}"><strong id="physicsAngleLabel">${game.angle}°</strong></label>
      <label class="arcade-control">INITIAL SPEED <input id="physicsVelocity" type="range" min="8" max="24" value="${game.velocity}"><strong id="physicsVelocityLabel">${game.velocity} m/s</strong></label>
      <label class="arcade-control">PROJECTILE MASS <input id="physicsMass" type="range" min="1" max="8" value="${game.mass}"><strong id="physicsMassLabel">${game.mass} kg</strong></label>
      <label class="arcade-control">SURFACE <select id="physicsFriction"><option>Ice</option><option>Concrete</option><option>Mud</option></select></label>
      <button class="pixel-btn primary" type="button" data-action="physics-fire">FIRE ▶</button>
      <button class="pixel-btn" type="button" data-action="physics-reload">RELOAD ENERGY</button>
      <button class="pixel-btn" type="button" data-action="physics-predict" aria-pressed="${arcadeState.physics.predictor}">KINEMATICS PREDICTOR</button>
      <button class="pixel-btn" type="button" data-action="physics-vectors" aria-pressed="${arcadeState.physics.vectors}">x/y VELOCITY VECTORS</button>
      <button class="pixel-btn" type="button" data-action="physics-spring" aria-pressed="${game.spring}">${game.spring ? "SPRING BUMPER PLACED ✓" : "PLACE SPRING BUMPER"}</button>
    </div>
    <div class="physics-tools">
      <div class="physics-tool"><strong>CONSERVATION OF ENERGY</strong><p>Start with gravitational potential energy; trade it for kinetic and spring energy. Friction drains mechanical energy as heat.</p></div>
      <div class="physics-tool"><strong>IMPULSE + COLLISIONS</strong><p>Switches need a momentum change. Heavy/light projectiles create different impulses; elastic impacts can ricochet.</p></div>
      <div class="physics-tool"><strong>ROTATION + FLUIDS</strong><p>Torque and moment of inertia tune custom wheels. Later stages add angular momentum, SHM, buoyancy, and Bernoulli flow.</p></div>
    </div>
    <p class="arcade-fact"><strong>${level.name}:</strong> ${level.fact} Inclines, spring bumpers, torque bridges, and fluid-current stages are part of the physics toolkit.</p>`;
  arcadeStage.physics = document.getElementById("physicsCanvas").getContext("2d");
  document.getElementById("physicsFriction").value = game.friction;
  drawPhysics();
}

function prepareArcadeSprite(){
  const source = document.getElementById("profileHeroSprite");
  if (!source || window.arcadeHeroSprite) {
    drawActiveArcadeCanvas();
    return;
  }
  const sprite = source.cloneNode(true);
  const sourceElements = [source, ...source.querySelectorAll("*")];
  const spriteElements = [sprite, ...sprite.querySelectorAll("*")];
  spriteElements.forEach((element, index) => {
    const computed = getComputedStyle(sourceElements[index]);
    for (const property of ["fill", "stroke", "stroke-width", "fill-opacity", "stroke-opacity", "opacity", "display", "visibility"]) {
      element.style.setProperty(property, computed.getPropertyValue(property));
    }
  });
  const image = new Image();
  image.onload = () => {
    window.arcadeHeroSprite = image;
    drawActiveArcadeCanvas();
  };
  image.onerror = () => console.error("The profile character sprite could not be loaded into the subject arcade.");
  try {
    const svg = new XMLSerializer().serializeToString(sprite);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    image.onload = () => {
      URL.revokeObjectURL(url);
      window.arcadeHeroSprite = image;
      drawActiveArcadeCanvas();
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      console.error("The profile character sprite could not be loaded into the subject arcade.");
    };
    image.src = url;
  } catch (error) {
    console.error("The profile character sprite could not be prepared for the subject arcade.", error);
  }
}

function drawActiveArcadeCanvas(){
  if (arcadeState.subject === "biology") drawBiology();
  else if (arcadeState.subject === "chemistry") updateChemistryTiles();
  else if (arcadeState.subject === "calculus") drawCalculus();
  else if (arcadeState.subject === "physics") drawPhysics();
}

function drawArcadeHero(ctx, x, y, width = 38, height = 50, flip = false){
  const sprite = window.arcadeHeroSprite;
  if (!sprite) {
    ctx.fillStyle = "#8effd2";
    ctx.fillRect(x, y, width, height);
    return;
  }
  ctx.imageSmoothingEnabled = false;
  if (flip) {
    ctx.save();
    ctx.translate(x + width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(sprite, 0, 0, width, height);
    ctx.restore();
  } else ctx.drawImage(sprite, x, y, width, height);
}

function drawBiology(){
  const ctx = arcadeStage.biology;
  if (!ctx) return;
  const game = arcadeState.bio;
  const level = arcadeLevels.biology[arcadeState.level];
  const world = game.world;
  if (!level || !world) return;
  const width = 800, height = 420;
  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, level.tint);
  sky.addColorStop(1, "#07101d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(10,18,33,.56)";
  ctx.fillRect(0, 66, width, height - 90);
  ctx.save();
  ctx.translate(-game.cameraX * .24, 0);
  for (let index = 0; index < 18; index += 1) {
    const bubbleX = index * 190 + (index % 3) * 27;
    const bubbleY = 105 + Math.sin(index * 2.4 + world.frame * .015) * 57;
    ctx.fillStyle = index % 2 ? "rgba(137,239,221,.07)" : "rgba(164,189,255,.07)";
    ctx.beginPath();
    ctx.ellipse(bubbleX, bubbleY, 28 + index % 5 * 5, 15 + index % 3 * 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(203,232,245,.13)";
    ctx.stroke();
  }
  ctx.restore();
  if (world.layout === "krebs") {
    const cycleX = world.length / 2;
    ctx.save();
    ctx.translate(-game.cameraX * .58, 0);
    ctx.strokeStyle = "rgba(255,199,112,.25)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(cycleX, 220, 155, 112, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(14,24,31,.7)";
    ctx.beginPath();
    ctx.ellipse(cycleX, 220, 143, 101, 0, 0, Math.PI * 2);
    ctx.fill();
    const metabolites = ["CITRATE", "ISOCITRATE", "α-KG", "SUCCINYL", "SUCCINATE", "FUMARATE", "MALATE", "OXALOACETATE"];
    metabolites.forEach((name, index) => {
      const angle = -Math.PI / 2 + index * Math.PI / 4;
      const nodeX = cycleX + Math.cos(angle) * 142;
      const nodeY = 220 + Math.sin(angle) * 101;
      ctx.fillStyle = "#ffcf65";
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f4ead0";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(name, nodeX, nodeY - 9);
    });
    ctx.fillStyle = "#ffe4a8";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.fillText("KREBS CYCLE", cycleX, 217);
    ctx.font = "10px monospace";
    ctx.fillStyle = "#c8d6cb";
    ctx.fillText("CO₂ OUT · NADH + FADH₂ LOADED", cycleX, 234);
    ctx.textAlign = "left";
    ctx.restore();
  } else if (world.layout === "photosystems") {
    ctx.save();
    ctx.globalAlpha = .12 + Math.sin(world.frame * .04) * .04;
    ctx.strokeStyle = "#ffe65c";
    ctx.lineWidth = 3;
    for (let ray = 0; ray < 7; ray += 1) {
      ctx.beginPath();
      ctx.moveTo(90 + ray * 112, 62);
      ctx.lineTo(160 + ray * 112, 168);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.fillStyle = "#f3f5ff";
  ctx.font = "bold 13px monospace";
  ctx.fillText(level.title, 20, 25);
  ctx.font = "11px monospace";
  ctx.fillStyle = "#bfd2e2";
  ctx.fillText(`${level.compartment}   ·   ATP ${game.score}   ·   ENZYMES ${world.enzymes.filter(item => item.activated).length}/${world.enzymes.length}`, 20, 47);
  ctx.fillStyle = "#1c2a43";
  ctx.fillRect(20, 56, 760, 4);
  ctx.fillStyle = "#6ad7ff";
  ctx.fillRect(20, 56, 760 * Math.min(1, game.x / world.exitX), 4);
  ctx.save();
  ctx.translate(-game.cameraX, 0);
  world.platforms.forEach(platform => {
    if (platform.x + platform.w < game.cameraX - 100 || platform.x > game.cameraX + width + 100) return;
    if (platform.kind === "carrier") {
      ctx.fillStyle = "#203a54";
      ctx.strokeStyle = "#70d4ec";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(platform.x, platform.y, platform.w, platform.h, 9);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#8effd2";
      ctx.fillRect(platform.x + 13, platform.y - 5, platform.w - 26, 6);
      ctx.fillStyle = "#d9efff";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("CARRIER PROTEIN  ⇄", platform.x + platform.w / 2, platform.y + 14);
      ctx.textAlign = "left";
    } else if (platform.kind === "branch-a" || platform.kind === "branch-b") {
      const branchColor = platform.kind === "branch-a" ? "#ff9f70" : "#c28cff";
      ctx.fillStyle = platform.kind === "branch-a" ? "#4b302d" : "#352d54";
      ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
      ctx.fillStyle = branchColor;
      ctx.fillRect(platform.x, platform.y, platform.w, 5);
      ctx.fillStyle = "#f5eaff";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(platform.kind === "branch-a" ? "PYRUVATE A" : "PYRUVATE B", platform.x + platform.w / 2, platform.y + 17);
      ctx.textAlign = "left";
    } else if (platform.kind === "cycle") {
      ctx.fillStyle = "#453a33";
      ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
      ctx.fillStyle = "#ffcf65";
      ctx.fillRect(platform.x, platform.y, platform.w, 5);
      ctx.fillStyle = "#f5e8cb";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("CYCLE INTERMEDIATE", platform.x + platform.w / 2, platform.y + 16);
      ctx.textAlign = "left";
    } else {
      ctx.fillStyle = "#30445a";
      ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
      ctx.fillStyle = "#88e0c3";
      ctx.fillRect(platform.x, platform.y, platform.w, 6);
      ctx.fillStyle = "#1c283b";
      for (let stripe = 0; stripe < platform.w; stripe += 30) ctx.fillRect(platform.x + stripe + 12, platform.y + 11, 12, 3);
    }
  });
  world.enzymes.forEach(enzyme => {
    if (enzyme.x < game.cameraX - 70 || enzyme.x > game.cameraX + width + 70) return;
    const pulse = 1 + Math.sin(Date.now() / 220) * .1;
    ctx.save();
    ctx.translate(enzyme.x, enzyme.y);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = enzyme.activated ? "#285a4b" : "#413b2b";
    ctx.strokeStyle = enzyme.activated ? "#8effd2" : "#ffe65c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-27, -26, 54, 46, 9);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = enzyme.activated ? "#8effd2" : "#ffe65c";
    ctx.beginPath();
    ctx.arc(0, -3, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4f3e8";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(enzyme.label.split(" ")[0].slice(0, 14), 0, -35);
    ctx.restore();
  });
  world.pickups.forEach(pickup => {
    if (pickup.taken || pickup.x < game.cameraX - 40 || pickup.x > game.cameraX + width + 40) return;
    const bob = Math.sin(Date.now() / 170 + pickup.x) * 5;
    ctx.save();
    ctx.shadowColor = pickup.type === "light" ? "#fff6a8" : "#ffe65c";
    ctx.shadowBlur = pickup.type === "light" ? 24 : 16;
    ctx.fillStyle = pickup.type === "light" ? "#fff6a8" : "#ffe65c";
    if (pickup.type === "light") {
      ctx.translate(pickup.x, pickup.y + bob);
      for (let ray = 0; ray < 8; ray += 1) {
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-2, -17, 4, 9);
      }
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(pickup.x, pickup.y + bob, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = pickup.type === "light" ? "#493e18" : "#614914";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(pickup.type === "light" ? "LIGHT" : "ATP", pickup.x, pickup.y + bob + 3);
  });
  world.enemies.forEach(enemy => {
    if (!enemy.defeated && enemy.x > game.cameraX - 60 && enemy.x < game.cameraX + width + 60) drawBiologyPathogen(ctx, enemy);
  });
  ctx.fillStyle = "#162b42";
  ctx.fillRect(world.exitX, 170, 22, 165);
  ctx.strokeStyle = world.enzymes.every(item => item.activated) ? "#8effd2" : "#ffcf65";
  ctx.lineWidth = 4;
  ctx.strokeRect(world.exitX, 170, 22, 165);
  ctx.fillStyle = "#e7f2ff";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillText("EXIT", world.exitX + 11, 157);
  if (!world.enzymes.every(item => item.activated)) {
    ctx.fillStyle = "#ffcf65";
    ctx.fillRect(world.exitX - 7, 170, 36, 16);
  }
  drawArcadeHero(ctx, game.x, game.y, game.width, game.height, game.vx < -.2);
  if (game.invulnerable > 0) {
    ctx.fillStyle = `rgba(255,255,255,${game.frame % 8 < 4 ? .35 : 0})`;
    ctx.fillRect(game.x - 3, game.y - 3, game.width + 6, game.height + 6);
  }
  ctx.restore();
  const status = document.getElementById("bioStatus");
  const nearEnzyme = world.enzymes.some(item => !item.activated && Math.abs(game.x + game.width / 2 - item.x) < 82 && Math.abs(game.y + game.height / 2 - item.y) < 92);
  if (status) status.textContent = game.message || (nearEnzyme ? "Press E to activate the enzyme and learn its role." : "Follow the membrane, ride moving carrier proteins, and jump on pathogens.");
  const score = document.getElementById("bioScore");
  const health = document.getElementById("bioHealth");
  const enzymes = document.getElementById("bioEnzymes");
  const checkpoint = document.getElementById("bioCheckpoint");
  const light = document.getElementById("bioLight");
  if (score) score.textContent = String(game.score);
  if (health) health.textContent = `${"♥ ".repeat(game.health)}${"♡ ".repeat(3 - game.health)}`.trim();
  if (enzymes) enzymes.textContent = `${world.enzymes.filter(item => item.activated).length} / ${world.enzymes.length}`;
  if (checkpoint) checkpoint.textContent = `X ${Math.floor(game.checkpointX / 100)}00`;
  if (light) light.textContent = game.lightBoost > 0 ? `${Math.ceil(game.lightBoost / 60)}s BOOST` : "FIND PHOTONS";
  if (game.lightBoost > 0) {
    ctx.save();
    ctx.shadowColor = "#fff6a8";
    ctx.shadowBlur = 22;
    ctx.strokeStyle = "rgba(255,246,168,.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(game.x - game.cameraX + game.width / 2, game.y + game.height / 2, 28, 35, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function updateBiology(){
  const game = arcadeState.bio;
  const world = game.world;
  if (!world || game.completed || arcadeState.level >= arcadeLevels.biology.length) return;
  world.frame += 1;
  game.frame += 1;
  world.platforms.forEach(platform => {
    platform.dx = 0;
    if (platform.kind === "carrier") {
      const oldX = platform.x;
      platform.x = platform.baseX + Math.sin(world.frame * .023 + platform.phase) * platform.amplitude;
      platform.dx = platform.x - oldX;
    }
  });
  const standingPlatform = world.platforms.find(platform => platform.id === game.groundedPlatform);
  if (game.grounded && standingPlatform?.kind === "carrier") game.x += standingPlatform.dx;
  const onLeft = game.keys.has("arrowleft") || game.keys.has("a");
  const onRight = game.keys.has("arrowright") || game.keys.has("d");
  if (onLeft !== onRight) game.vx += (onRight ? .62 : -.62) * (game.lightBoost > 0 ? 1.18 : 1);
  else game.vx *= game.grounded ? .78 : .96;
  const maxSpeed = game.lightBoost > 0 ? 5.6 : 4.7;
  game.vx = Math.max(-maxSpeed, Math.min(maxSpeed, game.vx));
  if (game.jumpPressed && game.grounded) {
    game.vy = game.lightBoost > 0 ? -15 : -12.8;
    game.grounded = false;
    game.groundedPlatform = null;
    game.message = "Jump! Land on the membrane ledges or catch a moving carrier protein.";
  }
  game.jumpPressed = false;
  if (game.lightBoost > 0) game.lightBoost -= 1;
  game.x = Math.max(0, Math.min(world.length - game.width, game.x + game.vx));
  const previousBottom = game.y + game.height;
  game.vy = Math.min(13, game.vy + .58);
  game.y += game.vy;
  game.grounded = false;
  game.groundedPlatform = null;
  if (game.vy >= 0) {
    for (const platform of world.platforms) {
      const overlapsX = game.x + game.width > platform.x + 7 && game.x < platform.x + platform.w - 7;
      const crossedTop = previousBottom <= platform.y + 8 && game.y + game.height >= platform.y;
      if (overlapsX && crossedTop) {
        game.y = platform.y - game.height;
        game.vy = 0;
        game.grounded = true;
        game.groundedPlatform = platform.id;
        break;
      }
    }
  }
  world.enemies.forEach(enemy => {
    if (!enemy.defeated) enemy.x = enemy.originX + Math.sin(world.frame * .035 + enemy.phase) * enemy.range;
  });
  world.pickups.forEach(pickup => {
    if (!pickup.taken && Math.abs(game.x + game.width / 2 - pickup.x) < 28 && Math.abs(game.y + game.height / 2 - pickup.y) < 42) {
      pickup.taken = true;
      if (pickup.type === "light") {
        game.lightBoost = 60 * 6;
        game.message = "Photon captured! Light boosts your jumps and movement for six seconds.";
      } else {
        game.score += pickup.value;
        game.message = pickup.value > 1 ? "ATP cluster collected! Cellular energy banked." : "ATP collected! Keep the reaction moving.";
      }
    }
  });
  world.enemies.forEach(enemy => {
    if (enemy.defeated || game.invulnerable > 0) return;
    const overlaps = game.x + game.width - 6 > enemy.x && game.x + 6 < enemy.x + enemy.w
      && game.y + game.height > enemy.y && game.y < enemy.y + enemy.h;
    if (!overlaps) return;
    if (game.vy > 0 && previousBottom <= enemy.y + 10) {
      enemy.defeated = true;
      game.vy = -8.5;
      game.score += 25;
      game.message = enemy.kind === "virus" ? "Virus capsid cracked! A clean stomp clears the pathogen." : "Bacterium stunned! Keep moving through the cell.";
    } else {
      game.health -= 1;
      game.invulnerable = 100;
      game.x = Math.max(game.checkpointX, game.x - 70);
      game.y -= 24;
      game.vy = -5;
      game.vx = -2.6;
      game.message = `Pathogen hit! ${game.health > 0 ? `${game.health} energy hearts remain.` : "Respawning at the last enzyme checkpoint."}`;
      if (game.health <= 0) {
        game.health = 3;
        game.score = Math.max(0, game.score - 50);
        const checkpoint = game.checkpointX;
        const ground = world.platforms.filter(platform => platform.kind === "membrane")
          .reduce((best, platform) => Math.abs(platform.x + platform.w / 2 - checkpoint) < Math.abs(best.x + best.w / 2 - checkpoint) ? platform : best);
        game.x = checkpoint;
        game.y = ground.y - game.height - 2;
        game.vx = 0;
        game.vy = 0;
      }
    }
  });
  if (game.invulnerable > 0) game.invulnerable -= 1;
  if (game.x - game.checkpointX > 850) game.checkpointX = Math.floor(game.x / 800) * 800;
  if (game.y > 485) {
    game.health = Math.max(1, game.health - 1);
    game.x = game.checkpointX;
    const ground = world.platforms.filter(platform => platform.kind === "membrane")
      .reduce((best, platform) => Math.abs(platform.x + platform.w / 2 - game.checkpointX) < Math.abs(best.x + best.w / 2 - game.checkpointX) ? platform : best);
    game.y = ground.y - game.height - 2;
    game.vx = 0;
    game.vy = 0;
    game.message = "Back on the membrane. Use carrier proteins to cross the gap.";
  }
  game.cameraX = Math.max(0, Math.min(world.length - 800, game.x - 245));
  if (game.x >= world.exitX - 18 && !world.enzymes.every(item => item.activated)) {
    game.x = world.exitX - 20;
    game.vx = 0;
    game.message = "The pathway exit is locked. Activate every enzyme checkpoint first.";
  }
  if (game.x >= world.exitX && !game.completed) {
    game.completed = true;
    game.message = arcadeLevels.biology[arcadeState.level].complete;
    const completedLevel = arcadeState.level;
    setTimeout(() => {
      if (arcadeState.subject === "biology" && arcadeState.level === completedLevel) advanceArcadeLevel("biology");
    }, 1500);
  }
}

function drawBiologyPathogen(ctx, enemy){
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  if (enemy.kind === "virus") {
    ctx.strokeStyle = "#ffc2df";
    ctx.lineWidth = 3;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      ctx.beginPath();
      ctx.moveTo(17, 14);
      ctx.lineTo(17 + Math.cos(angle) * 21, 14 + Math.sin(angle) * 21);
      ctx.stroke();
      ctx.fillStyle = "#ff71a8";
      ctx.beginPath();
      ctx.arc(17 + Math.cos(angle) * 21, 14 + Math.sin(angle) * 21, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#9a315f";
    ctx.beginPath();
    ctx.arc(17, 14, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffd1e1";
    ctx.fillRect(10, 10, 4, 4);
    ctx.fillRect(20, 10, 4, 4);
  } else {
    ctx.fillStyle = "#b94f59";
    ctx.beginPath();
    ctx.roundRect(2, 4, 31, 21, 10);
    ctx.fill();
    ctx.strokeStyle = "#f29775";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(3, 16); ctx.quadraticCurveTo(-9, 20, -8, 28);
    ctx.moveTo(31, 12); ctx.quadraticCurveTo(41, 5, 39, 0);
    ctx.stroke();
    ctx.fillStyle = "#ffe8a3";
    ctx.fillRect(10, 10, 4, 4);
    ctx.fillRect(22, 10, 4, 4);
  }
  ctx.restore();
}

function startCalculusRun(startImmediately = false){
  const game = arcadeState.calc;
  game.seed = ((Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0) || 1;
  const random = arcadeRandom(game.seed);
  game.phases = Array.from({ length: 4 }, (_, index) => ({
    frequency: .0024 + random() * (.0034 + index * .0002),
    amplitude: 13 + random() * 27,
    phase: random() * Math.PI * 2
  }));
  Object.assign(game, {
    world: 0, speed: 3.2, score: 0, running: startImmediately, scanner: false, boost: false,
    tangent: false, chain: false, riemann: false, fall: 0, jumpY: 0, completed: false,
    invulnerable: 0, frame: 0, message: startImmediately
      ? "Run started. Read the next feature and react."
      : "Track ready. Press START RUN when you are ready.",
    secantUntil: 0, tangentUntil: 0, currentSlope: 0, events: [], nextEventAt: 560
  });
  game.keys.clear();
  while (game.nextEventAt < 3600) appendCalculusEvent(game);
}

function appendCalculusEvent(game){
  const random = arcadeRandom(game.seed + Math.floor(game.nextEventAt * 73));
  const roll = random();
  const kind = roll < .35 ? "hole" : roll < .69 ? "asymptote" : "climb";
  const event = {
    kind, x: game.nextEventAt, length: kind === "climb" ? 205 + random() * 90 : 82,
    cleared: false, failed: false, direction: random() < .5 ? -1 : 1
  };
  game.events.push(event);
  game.nextEventAt += 540 + random() * 510;
}

function calculusCurve(worldX, game){
  const wave = game.phases.reduce((total, phase) =>
    total + Math.sin(worldX * phase.frequency + phase.phase) * phase.amplitude, 0);
  let y = 185 + wave;
  for (const event of game.events) {
    if (event.kind !== "climb" || worldX < event.x || worldX > event.x + event.length) continue;
    const progress = (worldX - event.x) / event.length;
    y -= Math.sin(progress * Math.PI) * 78 * (event.direction < 0 ? 1 : .72);
  }
  return Math.max(74, Math.min(300, y));
}

function calculusDerivative(worldX, game){
  return (calculusCurve(worldX + 4, game) - calculusCurve(worldX - 4, game)) / 8;
}

function useCalculusAbility(ability){
  const game = arcadeState.calc;
  if (arcadeState.subject !== "calculus" || game.completed) return;
  game.frame += 1;
  if (ability === "tangent") {
    game.tangentUntil = game.frame + 105;
    game.jumpY = Math.max(game.jumpY, 62);
    game.speed = Math.min(9, game.speed + .85);
    game.score += 25;
    game.message = `Tangent ramp built at slope f′(x) = ${calculusDerivative(game.world + 220, game).toFixed(2)}. Launch!`;
    return;
  }
  const kind = ability === "phase" ? "asymptote" : ability === "jump" ? "hole" : "climb";
  const event = game.events.find(item => !item.cleared && item.kind === kind
    && item.x - game.world >= -48
    && item.x - game.world <= (kind === "climb" ? item.length + 70 : 125));
  if (!event) {
    game.message = ability === "phase" ? "No vertical asymptote in phasing range. Watch the red spike ahead."
      : ability === "jump" ? "No removable hole in jump range. Look for the broken curve."
        : "No steep climb in secant range. Save the bridge for an uphill segment.";
    return;
  }
  event.cleared = true;
  if (ability === "phase") {
    game.invulnerable = 46;
    game.speed = Math.min(9, game.speed + .5);
    game.score += 35;
    game.message = "PHASE SHIFT! You passed through the vertical asymptote before the function diverged.";
  } else if (ability === "jump") {
    game.jumpY = 76;
    game.invulnerable = 30;
    game.speed = Math.min(9, game.speed + .28);
    game.score += 30;
    game.message = "Hole cleared! Matching one-sided limits identify the removable discontinuity.";
  } else {
    game.secantUntil = game.frame + 95;
    game.speed = Math.max(2.2, game.speed + .9);
    game.score += 40;
    game.message = "Secant bridge deployed: two points connect across the climb while momentum carries you uphill.";
  }
}

function drawCalculus(){
  const ctx = arcadeStage.calculus;
  if (!ctx) return;
  const game = arcadeState.calc;
  const width = 800, height = 360, riderX = 220;
  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#181231");
  gradient.addColorStop(1, "#080b18");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(167,142,255,.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 58); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 80; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
  ctx.strokeStyle = "#8772ad";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 188); ctx.lineTo(width, 188); ctx.stroke();
  const toScreen = worldX => worldX - game.world + riderX;
  for (const event of game.events) {
    const screenX = toScreen(event.x);
    if (screenX < -160 || screenX > width + 160) continue;
    if (event.kind === "hole" && !event.cleared) {
      ctx.fillStyle = "rgba(255,87,139,.12)";
      ctx.fillRect(screenX - 36, 74, 72, 254);
    } else if (event.kind === "asymptote" && !event.cleared) {
      ctx.fillStyle = "rgba(255,71,111,.1)";
      ctx.fillRect(screenX - 24, 74, 48, 254);
      ctx.strokeStyle = "#ff476f";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(screenX, 75); ctx.lineTo(screenX, 176); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(screenX, 201); ctx.lineTo(screenX, 328); ctx.stroke();
      ctx.fillStyle = "#ff8aa5";
      ctx.font = "bold 11px monospace";
      ctx.fillText("x → ±∞", screenX - 25, 92);
    } else if (event.kind === "climb" && !event.cleared) {
      const endX = toScreen(event.x + event.length);
      ctx.fillStyle = "rgba(255,207,101,.09)";
      ctx.fillRect(screenX, 75, endX - screenX, 253);
      ctx.strokeStyle = "#ffcf65";
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(screenX + 8, 92); ctx.lineTo(endX - 8, 92); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ffe6aa";
      ctx.font = "bold 10px monospace";
      ctx.fillText("UPHILL · C SECANT", screenX + 12, 86);
    }
  }
  ctx.strokeStyle = "#c19cff";
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  let penDown = false;
  for (let x = 0; x <= width; x += 2) {
    const worldX = game.world + x - riderX;
    const event = game.events.find(item => !item.cleared
      && ((item.kind === "hole" && Math.abs(worldX - item.x) < 38)
        || (item.kind === "asymptote" && Math.abs(worldX - item.x) < 5)));
    if (event) {
      if (penDown) ctx.stroke();
      penDown = false;
      continue;
    }
    const y = calculusCurve(worldX, game);
    if (!penDown) { ctx.beginPath(); ctx.moveTo(x, y); penDown = true; }
    else ctx.lineTo(x, y);
  }
  if (penDown) ctx.stroke();
  if (game.secantUntil > game.frame) {
    ctx.strokeStyle = "#8effd2";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(riderX - 110, calculusCurve(game.world + 110, game));
    ctx.lineTo(riderX + 135, calculusCurve(game.world + 355, game));
    ctx.stroke();
    ctx.fillStyle = "#8effd2";
    ctx.font = "bold 10px monospace";
    ctx.fillText("SECANT BRIDGE", riderX - 70, 115);
  }
  if (game.tangentUntil > game.frame) {
    const y = calculusCurve(game.world + riderX, game);
    const slope = calculusDerivative(game.world + riderX, game);
    ctx.strokeStyle = "#ffe65c";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(riderX - 90, y + slope * 90); ctx.lineTo(riderX + 95, y - slope * 95); ctx.stroke();
    ctx.fillStyle = "#ffe65c";
    ctx.font = "bold 10px monospace";
    ctx.fillText(`TANGENT RAMP  f′(x)=${slope.toFixed(2)}`, riderX - 90, 132);
  }
  for (let index = 0; index < 12; index += 1) {
    const worldX = Math.floor(game.world / 150) * 150 + index * 75;
    const screenX = toScreen(worldX);
    if (screenX < 0 || screenX > width) continue;
    const y = calculusCurve(worldX, game);
    ctx.fillStyle = "#ffe65c";
    ctx.fillRect(screenX, y - 28, 12, 12);
  }
  const riderY = calculusCurve(game.world + riderX, game) - 48 - game.jumpY;
  ctx.save();
  ctx.shadowColor = "#8effd2";
  ctx.shadowBlur = 18;
  drawArcadeHero(ctx, riderX, riderY, 38, 48, false);
  ctx.restore();
  ctx.fillStyle = "#d9f9ff";
  ctx.font = "bold 10px monospace";
  ctx.fillText(`f′(x) ${game.currentSlope.toFixed(2)}`, 20, 78);
  ctx.fillText(`RANDOM SEED ${game.seed.toString(16).toUpperCase()}`, 606, 78);
  const position = document.getElementById("calcPosition");
  const speed = document.getElementById("calcSpeed");
  const score = document.getElementById("calcScore");
  const best = document.getElementById("calcBest");
  if (position) position.textContent = `${Math.floor(game.world)} m`;
  if (speed) speed.textContent = `${game.speed.toFixed(1)} m/s`;
  if (score) score.textContent = String(game.score);
  if (best) best.textContent = String(game.highScore);
  const status = document.getElementById("calcStatus");
  if (status) {
    const upcoming = game.events.find(item => !item.cleared && item.x > game.world);
    const hint = upcoming ? `${upcoming.kind.toUpperCase()} IN ${Math.max(0, Math.floor(upcoming.x - game.world))} m` : "NEW CURVE AHEAD";
    status.textContent = game.message || `${hint} · momentum ${game.speed.toFixed(1)} m/s · downhill accelerates, uphill resists`;
  }
}

function updateCalculus(){
  const game = arcadeState.calc;
  if (!game.running || game.completed || !game.seed) return;
  game.frame += 1;
  while (game.nextEventAt < game.world + 1900) appendCalculusEvent(game);
  game.currentSlope = calculusDerivative(game.world + 220, game);
  game.speed += game.currentSlope * .028;
  if (game.keys.has("arrowright") || game.keys.has("d")) game.speed += .075;
  if (game.keys.has("arrowleft") || game.keys.has("a")) game.speed -= .12;
  game.speed = Math.max(1.25, Math.min(9, game.speed * .998));
  game.world += game.speed;
  game.score += Math.max(1, Math.floor(game.speed / 3));
  game.highScore = Math.max(game.highScore, game.score);
  game.jumpY = Math.max(0, game.jumpY - 2.4);
  if (game.invulnerable > 0) game.invulnerable -= 1;
  for (const event of game.events) {
    if (event.cleared || game.world < event.x + 52) continue;
    event.cleared = true;
    event.failed = true;
    if (event.kind === "hole" || event.kind === "asymptote") {
      game.speed = Math.max(1.25, game.speed * .48);
      game.invulnerable = 36;
      game.score = Math.max(0, game.score - 20);
      game.message = event.kind === "hole" ? "You fell through the hole. Next time, press Z while the gap is close." : "The asymptote caught you. Press X to phase through infinity.";
    } else {
      game.speed = Math.max(1.3, game.speed - 1.1);
      game.message = "The uphill section bled momentum. Use C for a secant bridge or V for a tangent launch ramp.";
    }
  }
  game.events = game.events.filter(event => event.x + event.length > game.world - 1200);
  if (game.frame % 240 === 0) game.message = "";
}

function drawPhysics(){
  const ctx = arcadeStage.physics;
  if (!ctx) return;
  const game = arcadeState.physics;
  const level = arcadeLevels.physics[arcadeState.level];
  if (!level) return;
  ctx.clearRect(0, 0, 800, 360);
  ctx.fillStyle = "#11142a";
  ctx.fillRect(0, 0, 800, 360);
  const target = level.target;
  const surfaceColor = game.friction === "Ice" ? "#a5eaff" : game.friction === "Mud" ? "#745139" : "#777889";
  if (level.layout === "hill" || level.layout === "incline") {
    ctx.fillStyle = "#25375c";
    ctx.beginPath(); ctx.moveTo(0, 95); ctx.lineTo(185, 225); ctx.lineTo(185, 295); ctx.lineTo(0, 295); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = surfaceColor;
  if (level.layout === "spring") {
    ctx.fillRect(180, 285, 190, 75);
    ctx.fillRect(500, 285, 300, 75);
    if (game.spring) {
      ctx.strokeStyle = "#ff71a8"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(405, 286); ctx.lineTo(425, 259); ctx.lineTo(445, 286); ctx.stroke();
      ctx.fillStyle = "#ffcf65"; ctx.font = "11px monospace"; ctx.fillText("SPRING", 397, 310);
    } else {
      ctx.fillStyle = "#ff3e78"; ctx.fillRect(370, 288, 130, 72);
      ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace"; ctx.fillText("GAP", 420, 320);
    }
  } else ctx.fillRect(180, 285, 620, 75);
  if (level.layout === "incline") {
    ctx.fillStyle = "#ffcf65"; ctx.beginPath(); ctx.moveTo(225, 285); ctx.lineTo(385, 205); ctx.lineTo(385, 285); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff2bf"; ctx.font = "12px monospace"; ctx.fillText("mg sin θ", 270, 250); ctx.fillText("N = mg cos θ", 276, 270);
  } else if (level.layout === "bridge") {
    ctx.fillStyle = "#d49a5e"; ctx.beginPath(); ctx.moveTo(415, 281); ctx.lineTo(600, 265); ctx.lineTo(600, 278); ctx.lineTo(415, 294); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#ffcf65"; ctx.beginPath(); ctx.moveTo(500, 278); ctx.lineTo(482, 305); ctx.lineTo(520, 305); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.fillText("τclockwise = τcounterclockwise", 430, 250);
  } else if (level.layout === "orbit") {
    ctx.strokeStyle = "rgba(101,168,255,.55)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(510, 175, 115, 48, -.25, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#9ce5ff"; ctx.beginPath(); ctx.arc(510, 175, 24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "12px monospace"; ctx.fillText("I ↓   ω ↑", 473, 180);
  } else if (level.layout === "underwater") {
    ctx.fillStyle = "rgba(48,132,195,.23)"; ctx.fillRect(180, 90, 620, 270);
    ctx.fillStyle = "#a5eaff"; ctx.font = "12px monospace"; ctx.fillText("BUOYANT FORCE ↑", 245, 120);
    for (let index = 0; index < 16; index += 1) {
      ctx.beginPath(); ctx.arc(220 + index * 34, 160 + (index % 3) * 47, 3 + index % 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#a5eaff"; ctx.fillRect(455, 268, 120, 12); ctx.fillRect(455, 250, 12, 30);
    ctx.fillStyle = "#fff"; ctx.fillText("narrow pipe: v ↑", 465, 245);
  }
  drawPhysicsTarget(ctx, target, game.score === 0 ? "#ffcf65" : "#8effd2");
  if (level.secondTarget) drawPhysicsTarget(ctx, level.secondTarget, game.score >= 2 ? "#8effd2" : "#ffcf65");
  ctx.fillStyle = "#dbe6f8";
  ctx.font = "bold 12px monospace";
  ctx.fillText(`STAGE ${arcadeState.level + 1} / ${arcadeLevels.physics.length}  •  ${level.layout.toUpperCase()}`, 18, 30);
  const launchX = 135, launchY = 205;
  ctx.fillStyle = "#8b654c"; ctx.fillRect(launchX - 18, launchY, 38, 75);
  const angle = game.angle * Math.PI / 180;
  const speedScale = game.velocity * 9 * getPhysicsSurfaceFactor(game.friction);
  const endX = launchX + Math.cos(angle) * 58;
  const endY = launchY - Math.sin(angle) * 58;
  ctx.strokeStyle = "#ffe65c"; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(launchX, launchY); ctx.lineTo(endX, endY); ctx.stroke();
  if (game.predictor) {
    ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgba(255,230,92,.7)"; ctx.lineWidth = 2; ctx.beginPath();
    for (let time = 0; time <= 8; time += .08) {
      const { x: px, y: py } = getProjectilePosition(game, time);
      if (time === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.setLineDash([]);
  }
  if (game.time !== null) {
    const t = game.time;
    const { x: px, y: py } = getProjectilePosition(game, t);
    if (px < 810 && py < 360) {
      ctx.fillStyle = "#ff71a8"; ctx.beginPath(); ctx.arc(px, py, 7 + game.mass, 0, Math.PI * 2); ctx.fill();
      if (game.vectors) {
        ctx.strokeStyle = "#8effd2"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(angle) * 24, py); ctx.stroke();
        ctx.strokeStyle = "#65a8ff"; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py - Math.sin(angle) * 24 + 37 * t); ctx.stroke();
      }
    }
  }
  drawArcadeHero(ctx, 44, 219, 35, 48, false);
  const status = document.getElementById("physicsStatus");
  const score = document.getElementById("physicsScore");
  const fireButton = arcadeRoot.querySelector('[data-action="physics-fire"]');
  if (score) score.textContent = `${game.score} / ${level.secondTarget ? 2 : 1}`;
  if (fireButton) {
    fireButton.disabled = game.time !== null || game.completed;
    fireButton.textContent = game.completed ? "TARGET HIT ✓" : game.time !== null ? "PROJECTILE IN FLIGHT…" : "FIRE ▶";
  }
  if (status) status.textContent = game.completed ? "TARGET HIT! Loading the next mechanics challenge…" : game.score ? level.secondTarget && game.score === 1 ? "First switch hit — elastic rebound is headed for the second." : "SWITCH HIT! Impulse delivered." : game.time !== null ? "Projectile in flight. Watch its path; adjust the launch after it lands." : game.lastShotBlocked ? "Missed the target or energy depleted. Adjust the angle, speed, mass, or spring." : "Aim with the controls, follow the predictor, and hit the switch.";
}

function drawPhysicsTarget(ctx, target, color){
  ctx.fillStyle = color;
  ctx.fillRect(target.x - 12, target.y - 20, 24, 40);
  ctx.fillStyle = "#151225";
  ctx.fillRect(target.x - 7, target.y - 8, 14, 16);
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(target.x, target.y, 5, 0, Math.PI * 2); ctx.fill();
}

function getPhysicsSurfaceFactor(surface){
  return surface === "Mud" ? .72 : surface === "Concrete" ? .9 : 1;
}

function getProjectilePosition(game, time){
  const level = arcadeLevels.physics[arcadeState.level];
  const angle = game.angle * Math.PI / 180;
  const speed = game.velocity * 9 * getPhysicsSurfaceFactor(game.friction);
  if (level?.secondTarget && game.bounceAt !== null && time >= game.bounceAt) {
    const fraction = Math.min(1, (time - game.bounceAt) / 1.2);
    return {
      x: level.target.x + (level.secondTarget.x - level.target.x) * fraction,
      y: level.target.y + (level.secondTarget.y - level.target.y) * fraction
    };
  }
  const x = 135 + Math.cos(angle) * speed * time;
  const springLift = game.spring && level?.layout === "spring" && x > 400 ? 72 : 0;
  const y = 210 - Math.sin(angle) * speed * time + 18.5 * time * time - springLift;
  return { x, y };
}

function setArcadeSubject(subject){
  if (!arcadeLevels[subject]) return;
  arcadeState.subject = subject;
  arcadeState.level = 0;
  if (subject === "biology") arcadeState.bio.completed = false;
  if (subject === "calculus") startCalculusRun();
  if (subject === "physics") arcadeState.physics.loadedLevel = -1;
  renderArcadeGame();
}

document.querySelectorAll("[data-arcade-game]").forEach(button =>
  button.addEventListener("click", () => setArcadeSubject(button.dataset.arcadeGame))
);

arcadeLevel.addEventListener("change", event => {
  arcadeState.level = Number(event.target.value);
  if (arcadeState.subject === "biology") arcadeState.bio.completed = false;
  if (arcadeState.subject === "calculus") startCalculusRun();
  if (arcadeState.subject === "physics") arcadeState.physics.loadedLevel = -1;
  renderArcadeGame();
});

arcadeRoot.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const physics = arcadeState.physics;
  if (action === "chem-move") {
    moveChemistryPlayer(button.dataset.direction);
    return;
  }
  if (action === "bio-left" || action === "bio-right") return;
  if (action === "bio-jump") {
    arcadeState.bio.jumpPressed = true;
    return;
  }
  if (action === "bio-interact") {
    interactBiologyEnzyme();
    drawBiology();
    return;
  }
  if (action === "calc-x" || action === "calc-z" || action === "calc-c" || action === "calc-v") {
    useCalculusAbility(({ "calc-x": "phase", "calc-z": "jump", "calc-c": "secant", "calc-v": "tangent" })[action]);
    drawCalculus();
    return;
  }
  if (action === "calc-start") {
    startCalculusRun(true);
    drawCalculus();
    return;
  }
  if (action === "chem-restart") {
    arcadeState.level = 0;
    renderArcadeGame();
    return;
  }
  if (action === "physics-restart") {
    arcadeState.level = 0;
    arcadeState.physics.loadedLevel = -1;
    renderArcadeGame();
    return;
  }
  else if (action === "physics-reload") {
    physics.energy = 100;
    physics.time = null;
    physics.lastShotBlocked = false;
    physics.completed = false;
    const energy = document.getElementById("physicsEnergy");
    if (energy) energy.textContent = "100%";
  }
  else if (action === "physics-fire") {
    if (physics.completed || physics.time !== null) return;
    if (physics.energy < 5) physics.lastShotBlocked = true;
    else {
      const cost = Math.min(25, 4 + physics.mass * physics.velocity ** 2 / (24 * 24 * 8) * 20);
      physics.energy = Math.max(0, physics.energy - cost);
      physics.time = 0;
      physics.score = 0;
      physics.bounceAt = null;
      physics.lastShotBlocked = false;
      document.getElementById("physicsEnergy").textContent = `${Math.round(physics.energy)}%`;
    }
  }
  else if (action === "physics-predict") { physics.predictor = !physics.predictor; button.setAttribute("aria-pressed", String(physics.predictor)); }
  else if (action === "physics-vectors") { physics.vectors = !physics.vectors; button.setAttribute("aria-pressed", String(physics.vectors)); }
  else if (action === "physics-spring") {
    physics.spring = !physics.spring;
    button.setAttribute("aria-pressed", String(physics.spring));
    button.textContent = physics.spring ? "SPRING BUMPER PLACED ✓" : "PLACE SPRING BUMPER";
  }
  drawActiveArcadeCanvas();
});

arcadeRoot.addEventListener("pointerdown", event => {
  const control = event.target.closest("[data-hold-key]");
  if (!control || arcadeState.subject !== "biology") return;
  arcadeState.bio.keys.add(control.dataset.holdKey);
  if (control.dataset.action === "bio-jump") arcadeState.bio.jumpPressed = true;
  event.preventDefault();
});

document.addEventListener("pointerup", () => {
  arcadeState.bio.keys.delete("arrowleft");
  arcadeState.bio.keys.delete("arrowright");
});

arcadeRoot.addEventListener("input", event => {
  const physics = arcadeState.physics;
  if (event.target.id === "physicsAngle") physics.angle = Number(event.target.value);
  else if (event.target.id === "physicsVelocity") physics.velocity = Number(event.target.value);
  else if (event.target.id === "physicsMass") physics.mass = Number(event.target.value);
  else return;
  if (event.target.id === "physicsAngle") document.getElementById("physicsAngleLabel").textContent = `${physics.angle}°`;
  if (event.target.id === "physicsVelocity") document.getElementById("physicsVelocityLabel").textContent = `${physics.velocity} m/s`;
  if (event.target.id === "physicsMass") document.getElementById("physicsMassLabel").textContent = `${physics.mass} kg`;
  drawActiveArcadeCanvas();
});

arcadeRoot.addEventListener("change", event => {
  const physics = arcadeState.physics;
  if (event.target.id === "physicsAngle") physics.angle = Number(event.target.value);
  else if (event.target.id === "physicsVelocity") physics.velocity = Number(event.target.value);
  else if (event.target.id === "physicsMass") physics.mass = Number(event.target.value);
  else if (event.target.id === "physicsFriction") physics.friction = event.target.value;
  if (event.target.id === "physicsAngle") document.getElementById("physicsAngleLabel").textContent = `${physics.angle}°`;
  if (event.target.id === "physicsVelocity") document.getElementById("physicsVelocityLabel").textContent = `${physics.velocity} m/s`;
  if (event.target.id === "physicsMass") document.getElementById("physicsMassLabel").textContent = `${physics.mass} kg`;
  if (event.target.id === "physicsFriction") document.getElementById("physicsSurface").textContent = physics.friction;
  drawActiveArcadeCanvas();
});

document.addEventListener("keydown", event => {
  if (!document.getElementById("sandbox")?.classList.contains("active")) return;
  const key = event.key.toLowerCase();
  const isChemistryKey = arcadeState.subject === "chemistry"
    && ["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s"].includes(key);
  if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target?.tagName)
      || (event.target?.tagName === "BUTTON" && !isChemistryKey)) return;
  if (arcadeState.subject === "biology") {
    if (["arrowleft", "arrowright", " ", "arrowup"].includes(key)) event.preventDefault();
    if (key === "e") {
      interactBiologyEnzyme();
      drawBiology();
      return;
    }
    if (["arrowleft", "arrowright", "a", "d"].includes(key)) arcadeState.bio.keys.add(key);
    if (!event.repeat && [" ", "arrowup", "w"].includes(key)) arcadeState.bio.jumpPressed = true;
  } else if (arcadeState.subject === "chemistry") {
    const directions = {
      arrowleft: "left", a: "left",
      arrowright: "right", d: "right",
      arrowup: "up", w: "up",
      arrowdown: "down", s: "down"
    };
    if (directions[key]) {
      event.preventDefault();
      moveChemistryPlayer(directions[key]);
    } else if (key === "r" && !event.repeat) {
      arcadeState.level = 0;
      renderArcadeGame();
    }
  } else if (arcadeState.subject === "calculus") {
    if (["arrowleft", "arrowright"].includes(key)) {
      event.preventDefault();
      arcadeState.calc.keys.add(key);
    }
    if (!event.repeat && ({ x: "phase", z: "jump", c: "secant", v: "tangent" })[key]) {
      event.preventDefault();
      useCalculusAbility(({ x: "phase", z: "jump", c: "secant", v: "tangent" })[key]);
    }
  }
});

document.addEventListener("keyup", event => {
  const key = event.key.toLowerCase();
  arcadeState.bio.keys.delete(key);
  arcadeState.calc.keys.delete(key);
});

setInterval(() => {
  if (!document.getElementById("sandbox")?.classList.contains("active")) return;
  if (arcadeState.subject === "chemistry") tickChemistryRound();
}, 100);

function arcadeFrame(){
  if (document.getElementById("sandbox")?.classList.contains("active")) {
    if (arcadeState.subject === "biology") { updateBiology(); drawBiology(); }
    else if (arcadeState.subject === "calculus") { updateCalculus(); drawCalculus(); }
    else if (arcadeState.subject === "physics" && arcadeState.physics.time !== null) {
      const physics = arcadeState.physics;
      const level = arcadeLevels.physics[arcadeState.level];
      physics.time += 1 / 60;
      const { x, y } = getProjectilePosition(physics, physics.time);
      if (level && physics.score === 0 && physics.bounceAt === null
          && Math.abs(x - level.target.x) < 18 && Math.abs(y - level.target.y) < 22) {
        if (physics.mass * physics.velocity >= level.threshold) {
          if (level.secondTarget) {
            physics.score = 1;
            physics.bounceAt = physics.time;
          } else completePhysicsLevel();
        } else physics.lastShotBlocked = true;
      }
      if (level?.secondTarget && physics.bounceAt !== null && physics.score === 1
          && physics.time - physics.bounceAt >= 1.2) {
        const second = level.secondTarget;
        if (Math.abs(x - second.x) < 22 && Math.abs(y - second.y) < 22) completePhysicsLevel();
        else physics.lastShotBlocked = true;
      }
      if (physics.time > 8 && !physics.completed) {
        physics.time = null;
        physics.lastShotBlocked = true;
      }
      drawPhysics();
    }
  }
  requestAnimationFrame(arcadeFrame);
}

function completePhysicsLevel(){
  const game = arcadeState.physics;
  if (game.completed) return;
  game.completed = true;
  game.score = arcadeLevels.physics[arcadeState.level]?.secondTarget ? 2 : 1;
  setTimeout(() => {
    if (arcadeState.subject !== "physics" || !game.completed) return;
    arcadeState.level += 1;
    game.loadedLevel = -1;
    if (arcadeState.level >= arcadeLevels.physics.length) {
      renderPhysics(null);
      return;
    }
    renderArcadeGame();
  }, 1400);
}

renderArcadeGame();
requestAnimationFrame(arcadeFrame);
