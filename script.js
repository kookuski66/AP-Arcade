const QUESTIONS_PER_RUN = 15;
const MAX_QUESTIONS_PER_RUN = 30;
const FRQS_PER_UNIT = 3;
const XP_PER_LEVEL = 200;
const MAX_PLAYER_HP = 200;
const BOSS_EXAM_TIERS = [
  { mcqPerUnit: 2, frqCount: { "AP Physics 1": 4, "AP Chemistry": 7, "AP Calculus AB": 6, "AP Biology": 6, "AP English Language": 6, "AP English Literature": 6, "AP United States History": 6, "AP Psychology": 6 }, minutes: 180, title: "" },
  { mcqPerUnit: 4, frqCount: { "AP Physics 1": 6, "AP Chemistry": 9, "AP Calculus AB": 8, "AP Biology": 8, "AP English Language": 8, "AP English Literature": 8, "AP United States History": 8, "AP Psychology": 8 }, minutes: 240, title: "THE ASCENDANT TRIAL" },
  { mcqPerUnit: 6, frqCount: { "AP Physics 1": 8, "AP Chemistry": 11, "AP Calculus AB": 10, "AP Biology": 10, "AP English Language": 10, "AP English Literature": 10, "AP United States History": 10, "AP Psychology": 10 }, minutes: 300, title: "THE OMEGA GAUNTLET" }
];
const ENERGY_PER_QUESTION = 8;
const academicSubscripts = {
  Fnet: "F<sub>net</sub>",
  Fspring: "F<sub>spring</sub>",
  Fpull: "F<sub>pull</sub>",
  Favg: "F<sub>avg</sub>",
  Fout: "F<sub>out</sub>",
  FB: "F<sub>B</sub>",
  Krot: "K<sub>rot</sub>",
  Ktrans: "K<sub>trans</sub>",
  Ktotal: "K<sub>total</sub>",
  Kc: "K<sub>c</sub>",
  Ka: "K<sub>a</sub>",
  Kp: "K<sub>p</sub>",
  Qc: "Q<sub>c</sub>",
  pKa: "pK<sub>a</sub>",
  Patm: "P<sub>atm</sub>",
  Pwide: "P<sub>wide</sub>",
  Pnarrow: "P<sub>narrow</sub>",
  Vsub: "V<sub>sub</sub>",
  dout: "d<sub>out</sub>",
  Wnet: "W<sub>net</sub>",
  Ecell: "E<sub>cell</sub>"
};
const outfitOptions = [
  { id: "rookie", name: "Rookie Tunic", unlockLevel: 1, color: "#5ce1b6" },
  { id: "ember", name: "Ember Jacket", unlockLevel: 2, color: "#ff754f" },
  { id: "starfall", name: "Starfall Cape", unlockLevel: 3, color: "#d681ff" },
  { id: "royal", name: "Royal Armor", unlockLevel: 5, color: "#ffd65a" }
];
const weaponOptions = [
  { id: "sword", name: "Pixel Sword", unlockLevel: 1, icon: "⚔" },
  { id: "wand", name: "Spark Wand", unlockLevel: 2, icon: "✦" },
  { id: "spear", name: "Comet Spear", unlockLevel: 3, icon: "➶" },
  { id: "staff", name: "Nova Staff", unlockLevel: 5, icon: "ϟ" }
];

function formatAcademicNotation(value){
  const escaped = String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const symbols = Object.keys(academicSubscripts).sort((a, b) => b.length - a.length);
  const symbolPattern = new RegExp(`\\b(${symbols.join("|")})\\b`, "g");
  const formulaPattern = /(?<![A-Za-z])(?:[A-Z][a-z]?\d*)+(?![A-Za-z0-9])/g;
  const subscripted = escaped
    .replace(symbolPattern, symbol => academicSubscripts[symbol])
    .replace(/μs\b/g, "μ<sub>s</sub>")
    .replace(/ρ(object|fluid)/g, "ρ<sub>$1</sub>")
    .replace(/ρVsubg/g, "ρV<sub>sub</sub>g")
    .replace(/\b([A-Za-zΑ-ωρτΔ]+)_([A-Za-z0-9]+)\b/g, "$1<sub>$2</sub>")
    .replace(/\^([+-]?\d+|\{[^}]+\})/g, (_, exponent) => `<sup>${exponent.replace(/[{}]/g, "")}</sup>`)
    .replace(
      /([A-Z][a-z]?)(\d*)([+−-])(?=(?:\s|[.,;:!?)]|\/|$))/g,
      (_, element, count, charge) =>
        `${element}${count ? `<sub>${count}</sub>` : ""}<sup>${charge}</sup>`
    )
    .replace(formulaPattern, formula => {
      if (!/\d/.test(formula)) return formula;
      return formula.replace(/([A-Z][a-z]?)(\d*)/g, (_, element, count) =>
        `${element}${count ? `<sub>${count}</sub>` : ""}`
      );
    });
  return subscripted;
}

function setAcademicText(element, value){
  element.innerHTML = formatAcademicNotation(value);
}

function renderAnswerButtons(container, answers, mode){
  container.replaceChildren();
  answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    setAcademicText(button, `${String.fromCharCode(65 + index)}. ${answer}`);
    button.addEventListener("click", () => answerQuestion(index, mode));
    container.append(button);
  });
}

const bossArtwork = {
  newton: `<path class="art-outline" d="M83 42h154v19h35v33h20v82h-20v37h-35v26H63v-26H28v-37H10V94h20V61h35z"/><path class="art-primary" d="M94 53h132v20h34v31h20v59h-20v35h-34v22H74v-22H40v-35H23v-59h17V73h34z"/><path class="art-secondary" d="M71 92h34V73h111v20h24v28h-22v24h-25v22H99v-22H75v-24H52v-14h19z"/><path class="art-face" d="M100 101h28V88h68v14h25v35h-17v23h-31v15h-44v-15h-28v-24H83v-23h17z"/><path class="art-hair" d="M90 100h22V84h19V71h20v13h17V71h20v13h20v16h17v17h-20v-8H99v8H79v-17h11z"/><path class="art-feature" d="M120 119h12v20h-12zm60 0h12v20h-12zm-30 20h24v11h-8v11h-9v-11h-7z"/><path class="art-coat" d="M78 196h45v18h26v34H74v-18H54v-18h24zm119 0h45v16h23v18h-20v18h-76v-34h28z"/><path class="art-detail" d="M146 190h27v11h-27zm-43 17h18v17h-18zm79 0h18v17h-18z"/>`,
  force: `<path class="art-outline" d="M104 20h112v24h35v36h28v51h-20v36h-24v47h-36v24h-96v-24H67v-47H43v-36H23V80h28V44h37z"/><path class="art-primary" d="M111 34h98v23h32v33h24v39h-21v32h-26v43h-34v22H91v-22H64v-43H39v-32H28V91h27V57h28z"/><path class="art-secondary" d="M56 105h35v34H73v29H47v-23H33v-25h23zm174 0h35v15h23v25h-15v23h-26v-29h-17z"/><path class="art-face" d="M103 83h31v15h52V83h31v39h-16v23h-26v14h-40v-14h-25v-23h-17z"/><path class="art-feature" d="M126 107h14v19h-14zm51 0h14v19h-14zm-36 28h37v10h-37z"/><path class="art-detail" d="M93 189h44v20h-19v24H85v-20h8zm92 0h44v24h10v20h-34v-24h-20z"/>`,
  orbit: `<ellipse class="art-outline" cx="160" cy="151" rx="145" ry="54" transform="rotate(-23 160 151)"/><ellipse class="art-primary" cx="160" cy="151" rx="126" ry="38" transform="rotate(-23 160 151)"/><circle class="art-secondary" cx="160" cy="143" r="83"/><path class="art-detail" d="M101 91h35V73h49v18h31v34h-17v28h-21v22h-47v-19h-27v-27h-18v-22h15z"/><circle class="art-face" cx="161" cy="142" r="48"/><path class="art-feature" d="M139 132h12v17h-12zm31 0h12v17h-12zm-17 22h22v9h-22z"/><circle class="art-highlight" cx="108" cy="113" r="11"/><circle class="art-highlight" cx="224" cy="180" r="9"/>`,
  energy: `<path class="art-outline" d="M159 13h37v40h36V87h34v54h25v55h-30v40h-39v27H99v-25H64v-39H35v-55h25v-44h30V91h24V59h30z"/><path class="art-primary" d="M161 31h24v43h33v25h30v45h25v43h-29v35h-37v25h-91v-25h-35v-36H55v-47h26v-36h29v-25h26V73h25z"/><path class="art-secondary" d="M160 83h25v30h22v28h21v42h-25v22h-27v25h-38v-26h-25v-30H94v-34h24v-28h23v-29h19z"/><path class="art-highlight" d="M157 116h18v27h21v26h-20v29h-22v20h-16v-30h-18v-27h20v-25h17z"/><path class="art-feature" d="M137 151h13v17h-13zm37 0h13v17h-13zm-29 26h36v9h-36z"/>`,
  momentum: `<path class="art-outline" d="M30 92h55V62h40V40h93v23h46v32h28v91h-25v34h-44v25h-98v-26H80v-30H42v-32H20V110h10z"/><path class="art-primary" d="M42 105h54V76h43V54h73v24h45v30h24v67h-24v29h-37v23h-84v-23H91v-29H54v-30H33v-40h9z"/><circle class="art-secondary" cx="105" cy="203" r="31"/><circle class="art-secondary" cx="228" cy="203" r="31"/><circle class="art-outline" cx="105" cy="203" r="14"/><circle class="art-outline" cx="228" cy="203" r="14"/><path class="art-face" d="M119 94h29V80h55v16h28v39h-18v24h-31v13h-40v-14h-28v-24h-15v-25h20z"/><path class="art-feature" d="M137 112h13v18h-13zm43 0h13v18h-13zm-25 26h32v10h-32z"/><path class="art-detail" d="M70 77h45v12H70zm145-25h14v26h-14z"/>`,
  pendulum: `<path class="art-outline" d="M89 20h142v22h27v36h-24v24h-27V72h-26v30h17v38h31v22h-21v49h-23v31h-93v-31H70v-49H48v-22h32v-38h16V72H70v30H44V78H20V42h27V20h42z"/><path class="art-primary" d="M101 34h118v19h25v25h-22v24h-24V85h-34v41h19v25h35v18h-21v44h-21v25h-73v-25H83v-44H61v-18h35v-25h19V85H83v17H59V78H37V53h23V34z"/><path class="art-secondary" d="M139 67h41v71h-41z"/><circle class="art-highlight" cx="160" cy="183" r="42"/><circle class="art-outline" cx="160" cy="183" r="27"/><path class="art-feature" d="M149 174h10v10h-10zm14 14h10v10h-10z"/><path class="art-detail" d="M124 44h73v12h-73zm-29 166h130v12H95z"/>`,
  atom: `<circle class="art-outline" cx="160" cy="150" r="131"/><ellipse class="art-primary" cx="160" cy="150" rx="130" ry="47" transform="rotate(35 160 150)"/><ellipse class="art-secondary" cx="160" cy="150" rx="130" ry="47" transform="rotate(-35 160 150)"/><ellipse class="art-highlight" cx="160" cy="150" rx="130" ry="47"/><circle class="art-face" cx="160" cy="150" r="53"/><circle class="art-feature" cx="160" cy="150" r="24"/><circle class="art-detail" cx="77" cy="91" r="13"/><circle class="art-detail" cx="248" cy="96" r="13"/><circle class="art-detail" cx="228" cy="222" r="13"/><path class="art-eye" d="M140 137h10v14h-10zm31 0h10v14h-10z"/>`,
  crystal: `<path class="art-outline" d="M48 73 105 24h108l59 49-20 116-92 82-94-82z"/><path class="art-primary" d="m63 78 51-42h88l49 42-19 100-72 71-75-70z"/><path class="art-secondary" d="m114 36 45 66-97-24zm88 0-43 66 92-24zm-43 66 77-24-20 100zm0 0-72-24 17 100zm0 0-3 147-75-71zm0 0 3 147 72-71z"/><path class="art-highlight" d="m144 101 15 22 17-22 16 38-33 28-33-28z"/><path class="art-feature" d="M140 133h11v15h-11zm30 0h11v15h-11zm-15 23h20v8h-20z"/>`,
  molecule: `<path class="art-outline" d="M80 41h35v27h42v-21h51v25h34v39h-23v28h30v42h-37v27h-36v39h-43v-30h-40v-31H55v-45H27v-42h35V79h18z"/><path class="art-primary" d="M92 53h15v28h56V61h39v24h31v38h-24v28h30v28h-31v26h-36v36h-20v-29h-42v-31H67v-39H39v-18h35v-39h18z"/><circle class="art-secondary" cx="98" cy="117" r="31"/><circle class="art-highlight" cx="184" cy="105" r="29"/><circle class="art-face" cx="196" cy="185" r="37"/><path class="art-feature" d="M87 109h9v15h-9zm18 0h9v15h-9zm74-13h9v14h-9zm18 0h9v14h-9zm-17 83h10v16h-10zm25 0h10v16h-10z"/><path class="art-detail" d="M118 111h48v12h-48zm26-11h13v67h-13z"/>`,
  solution: `<path class="art-outline" d="M111 20h98v31h-13v61l48 69v76h-12v23H98v-23H83v-76l48-69V51h-20z"/><path class="art-primary" d="M123 33h74v23h-13v62l48 69v57h-14v22h-99v-22h-15v-57l48-69V56h-13z"/><path class="art-secondary" d="M101 184h118v54h-14v17h-89v-17h-15z"/><path class="art-highlight" d="M111 198h95v14h-95zm12 22h70v11h-70z"/><circle class="art-face" cx="144" cy="158" r="9"/><circle class="art-face" cx="177" cy="145" r="7"/><circle class="art-face" cx="159" cy="174" r="6"/><path class="art-feature" d="M138 92h13v38h-13zm31 0h13v38h-13z"/>`,
  reaction: `<path class="art-outline" d="m83 36 32 20-18 29 24 15-25 37-31-19-18 28 25 17-34 52-25-17 46-70 20-32 26-41zM221 35l27 18-28 43 26 17-31 48-27-17 31-48-25-16z"/><path class="art-primary" d="M53 104h40v-20h31v-31h27v53h28v-29h29v30h31v32h-29v29h-29v29h-38v-20h-37v-25H88v-25H53z"/><path class="art-secondary" d="M131 111h61v24h23v32h-23v25h-62v-25h-23v-32h24z"/><path class="art-face" d="M138 124h18v20h-18zm40 0h18v20h-18zm-29 31h39v11h-39z"/><path class="art-highlight" d="m70 48 18 11-10 18-18-11zm174 11 16 12-13 17-17-12zm-14 153 16 12-14 18-16-12z"/>`,
  gear: `<circle class="art-outline" cx="160" cy="150" r="121"/><path class="art-primary" d="M145 16h30v28h26l13-21 26 16-13 24 19 20 27-8 10 29-26 10v28l26 11-10 29-28-9-18 21 14 24-26 16-15-23h-27v28h-30v-28h-27l-14 23-27-16 14-24-19-21-26 9-10-29 27-11v-28l-27-10 10-29 27 8 19-20-14-24 26-16 14 21h27z"/><circle class="art-secondary" cx="160" cy="150" r="68"/><circle class="art-highlight" cx="160" cy="150" r="42"/><circle class="art-outline" cx="160" cy="150" r="23"/><path class="art-feature" d="M127 134h14v20h-14zm52 0h14v20h-14zm-28 31h19v10h-19z"/>`,
  furnace: `<path class="art-outline" d="M72 40h176v31h26v55h-19v33h-24v67h-25v34H94v-34H68v-67H43v-33H24V71h28V40z"/><path class="art-primary" d="M84 54h151v25h25v42h-20v31h-23v66h-24v28h-88v-28H81v-66H59v-31H40V79h29V54z"/><path class="art-secondary" d="M109 94h102v27h20v45h-18v38h-25v29h-56v-29h-25v-38H88v-45h21z"/><path class="art-highlight" d="M158 112h24v28h17v31h-19v25h-17v19h-19v-30h-17v-25h18v-26h13z"/><path class="art-feature" d="M125 119h15v18h-15zm54 0h15v18h-15zm-35 35h39v10h-39z"/><path class="art-detail" d="M87 64h144v12H87z"/>`,
  limit: `<path class="art-outline" d="M31 82h45V55h47v27h34V55h48v27h43v37h-43v27h-48v-27h-34v27H76v-27H31z"/><path class="art-primary" d="M43 91h33V68h31v23h51V68h32v23h45v19h-45v23h-32v-23h-51v23H76v-23H43z"/><path class="art-secondary" d="M84 176h151v22h-35v18h-81v-18H84z"/><path class="art-highlight" d="M91 187h136v8H91z"/><path class="art-face" d="M121 119h15v18h-15zm49 0h15v18h-15zm-33 26h33v10h-33z"/><path class="art-detail" d="M95 63h18v15H95zm113 0h18v15h-18z"/>`,
  derivative: `<path class="art-outline" d="M77 25h166v27h22v47h-21v28h-25v21h36v35h-23v48H81v-48H58v-35h37v-21H70V99H48V52h29z"/><path class="art-primary" d="M91 38h139v24h22v34h-21v26h-27v26h38v22h-23v48H94v-48H72v-22h37v-26H82V96H61V62h30z"/><path class="art-face" d="M119 75h26v17h48V75h26v34h-16v22h-29v14h-37v-14h-27v-22h-16V92h25z"/><path class="art-feature" d="M132 96h12v18h-12zm47 0h12v18h-12zm-30 28h31v9h-31z"/><path class="art-secondary" d="M77 166h166v13H77zm17 33h132v15H94z"/><path class="art-detail" d="M144 153h23v13h-23z"/>`,
  chain: `<circle class="art-outline" cx="114" cy="146" r="84"/><circle class="art-primary" cx="114" cy="146" r="59"/><circle class="art-highlight" cx="114" cy="146" r="31"/><circle class="art-secondary" cx="221" cy="157" r="65"/><circle class="art-outline" cx="221" cy="157" r="45"/><circle class="art-face" cx="221" cy="157" r="24"/><path class="art-detail" d="M106 56h17V30h17v26h20v17h-20v18h-17V73h-17zm96 35h18V68h16v23h19v16h-19v18h-16v-18h-18z"/><path class="art-feature" d="M100 137h12v18h-12zm20 0h12v18h-12zm94 10h12v16h-12zm17 0h12v16h-12z"/>`,
  rate: `<path class="art-outline" d="M25 192h39V99h29V61h31V37h31v24h27v31h32v38h43v64h32v34H25z"/><path class="art-primary" d="M40 195h36v-86h28V73h31V50h18v24h29v31h32v37h42v54h31v20H40z"/><path class="art-secondary" d="M63 176h28v-48h28V91h29V72h20v26h27v32h30v36h34v20H63z"/><path class="art-highlight" d="M59 168 112 126l32-34 29 20 42-37 17 18-55 49-28-19-23 25-48 40z"/><path class="art-face" d="M120 131h14v17h-14zm57-49h14v17h-14z"/><path class="art-feature" d="M40 218h241v10H40z"/>`,
  graph: `<path class="art-outline" d="M48 28h224v224H48z"/><path class="art-primary" d="M62 42h196v196H62z"/><path class="art-secondary" d="M82 203h32v-45h26v22h24V94h30v44h26v-61h24v126z"/><path class="art-highlight" d="M80 215h173v9H80zM80 60h9v164h-9z"/><path class="art-feature" d="M106 158h12v14h-12zm48-22h12v14h-12zm52-56h12v14h-12z"/><path class="art-face" d="M105 96h26V82h54V68h35v17h23v25h-24v20h-28v11h-62v-13h-27z"/><path class="art-detail" d="M128 100h11v14h-11zm47 0h11v14h-11z"/>`,
  integral: `<path class="art-outline" d="M93 25h136v27h28v37h-25v26h-31v28h-19v38h28v30h31v42H95v-39h27v-28H97v-34h28v-34h22V91h-29V68H93z"/><path class="art-primary" d="M106 38h111v23h26v25h-24v25h-28v31h-20v42h30v26h30v27H108v-25h27v-27h-30v-24h28v-34h22V83h-27V62h-22z"/><path class="art-secondary" d="M143 81h39v22h-18v43h-14v37h25v25h-40v-25h-17v-36h17v-47h8z"/><path class="art-highlight" d="M156 92h12v48h-12zm-9 94h29v10h-29z"/><path class="art-feature" d="M157 112h11v16h-11z"/>`,
  cell: `<circle class="art-outline" cx="160" cy="150" r="128"/><circle class="art-primary" cx="160" cy="150" r="112"/><path class="art-secondary" d="M85 88h37V62h46v18h41v32h25v39h-28v34h-41v23h-48v-21H91v-33H69v-40h16z"/><circle class="art-nucleus" cx="158" cy="146" r="42"/><circle class="art-nucleus-core" cx="158" cy="146" r="19"/><path class="art-organelle" d="M91 126h29v11h-29zm96 50h44v12h-44zm-39-95h19v13h-19zm-54 81h25v12h-25z"/><path class="art-eye" d="M137 136h10v14h-10zm33 0h10v14h-10z"/><path class="art-mouth" d="M143 160h31v8h-31z"/><circle class="art-vesicle" cx="205" cy="99" r="13"/><circle class="art-vesicle" cx="107" cy="194" r="10"/>`,
  membrane: `<path class="art-outline" d="M58 35h204v20h25v190h-25v20H58v-20H33V55h25z"/><path class="art-primary" d="M70 48h180v18h24v165h-24v18H70v-18H46V66h24z"/><path class="art-secondary" d="M93 79h137v18h19v104h-19v18H93v-18H74V97h19z"/><path class="art-highlight" d="M65 58h16v187H65zm174 0h16v187h-16z"/><path class="art-face" d="M130 101h59v15h22v58h-22v17h-59v-17h-21v-58h21z"/><path class="art-feature" d="M144 119h13v17h-13zm35 0h13v17h-13zm-31 34h42v10h-42z"/><circle class="art-vesicle" cx="103" cy="68" r="9"/><circle class="art-vesicle" cx="214" cy="239" r="9"/>`,
  mitochondria: `<path class="art-outline" d="M51 106h35V81h32V60h36V45h44v18h33v27h30v49h-18v31h-28v26h-44v20h-44v-19h-41v-23H55v-31H35v-40h16z"/><path class="art-primary" d="M64 113h33V90h30V72h30V57h34v18h34v25h28v42h-18v27h-28v24h-40v18h-34v-17H96v-22H66v-28H47v-29h17z"/><path class="art-secondary" d="M86 127h25v-16h20v17h18v-18h22v17h19v-16h22v17h18v23h-22v15h-23v-16h-18v17h-21v-17h-18v16h-22v-16H88z"/><path class="art-highlight" d="M90 137h23v9H90zm45 0h23v9h-23zm44 0h23v9h-23z"/><path class="art-feature" d="M124 113h10v23h-10zm40 0h10v23h-10zm42 0h10v23h-10z"/>`,
  neuron: `<path class="art-outline" d="M122 103h46v-44h-20V33h17V8h29v25h17v26h-19v44h29v24h31v-17h31v31h-31v-17h-31v24h-33v24h-28v42h18v25h-18v25h-29v-25h-18v-25h18v-42h-28v-24H71v-24H40v17H9v-31h31v17h31v-17h33v-24h20z"/><circle class="art-primary" cx="145" cy="142" r="65"/><path class="art-secondary" d="M111 121h67v17h19v39h-19v17h-67v-17H92v-39h19z"/><circle class="art-highlight" cx="145" cy="143" r="26"/><path class="art-feature" d="M126 132h11v15h-11zm29 0h11v15h-11zm-17 25h28v9h-28z"/><path class="art-detail" d="M145 14h9v47h-9zM14 135h50v9H14zm209 0h52v9h-52z"/>`,
  chromosome: `<path class="art-outline" d="M91 31h37v29h24v24h-18l28 34 29-34h-18V60h23V31h37v41h-21v34h-28l-22 27 22 27h28v34h21v41h-37v-30h-23v-24h18l-29-34-28 34h18v24h-24v30H91v-41h21v-34h29l19-24-19-23h-29V72H91z"/><path class="art-primary" d="M104 43h13v34h28l38 46-38 46h-28v34h-13v-19h21v-27h27l14-17-14-17h-27v-28h-21zm112 0h13v34h-21v28h-27l-14 17 14 17h27v27h21v19h-13v-34h-28l-38-46 38-46h28z"/><path class="art-secondary" d="M133 90h21v14h-21zm33 82h21v14h-21z"/><path class="art-highlight" d="M150 126h20v16h-20z"/><path class="art-feature" d="M104 49h13v8h-13zm112 142h13v8h-13z"/>`,
  dna: `<path class="art-outline" d="M80 20h40v26h-20v26h26v20h28v-20h26V46h-20V20h40v37h-20v27h-26v22h-28v26h28v22h26v27h20v37h-40v-26h20v-26h-26v-20h-28v20h-26v26h20v26H80v-37h20v-27h26v-22h28v-26h-28V84h-26V57H80z"/><path class="art-primary" d="M91 31h17v25h-17v27h24v16h28v-16h23V56h-18V31h17v15h18v29h-25v24h-29v26h29v24h25v29h-18v15h-17v-25h18v-27h-23v-16h-28v16h-24v27h17v25H91v-15H74v-29h24v-24h29v-26H98V99H74V70h17z"/><path class="art-highlight" d="M104 68h76v10h-76zm0 54h76v10h-76zm0 53h76v10h-76z"/><path class="art-face" d="M135 99h16v17h-16zm0 53h16v17h-16z"/><path class="art-feature" d="M146 49h14v8h-14zm-28 120h14v8h-14z"/>`
};

const bossThemes = {
  "AP Physics 1": [
    ["NEWTON, THE MOTION MASTER", "newton"], ["THE FORCE FORGE", "force"], ["ORBITAL COLOSSUS", "orbit"],
    ["THE LIVING FLAME", "energy"], ["MOMENTUM EXPRESS", "momentum"], ["THE PENDULUM WARDEN", "pendulum"]
  ],
  "AP Chemistry": [
    ["THE ATOMIC OVERLORD", "atom"], ["CRYSTAL LATTICE GUARDIAN", "crystal"], ["THE SOLUTION SPIRIT", "solution"],
    ["REACTION RUPTOR", "reaction"], ["KINETIC GEARKEEPER", "gear"], ["THE THERMAL FURNACE", "furnace"]
  ],
  "AP Calculus AB": [
    ["THE LIMIT LOOP", "limit"], ["THE DERIVATIVE SAGE", "derivative"], ["CHAIN RULE GEARS", "chain"],
    ["RATE OF CHANGE RIDER", "rate"], ["THE GRAPH SENTINEL", "graph"], ["THE INTEGRAL ARCHON", "integral"]
  ],
  "AP Biology": [
    ["THE CELLULAR ORACLE", "cell"], ["MEMBRANE GATEKEEPER", "membrane"], ["MITOCHONDRIAL BEHEMOTH", "mitochondria"],
    ["THE SIGNALING NEURON", "neuron"], ["CHROMOSOME COLOSSUS", "chromosome"], ["THE DNA HELIX WARDEN", "dna"]
  ],
  "AP English Language": [
    ["THE RHETORICAL ORATOR", "newton"], ["CLAIMS AND EVIDENCE", "limit"], ["THE STYLE SMITH", "graph"]
  ],
  "AP English Literature": [
    ["THE CLOSE READER", "cell"], ["THE LITERARY LANTERN", "graph"], ["THE POETIC WARDEN", "dna"]
  ],
  "AP United States History": [
    ["THE CHRONICLE COLUMBUS", "orbit"], ["THE CONSTITUTIONAL GUARDIAN", "crystal"], ["THE ARCHIVE EMPEROR", "atom"]
  ],
  "AP Psychology": [
    ["THE NEURAL NAVIGATOR", "neuron"], ["THE BEHAVIORAL BEHEMOTH", "momentum"], ["THE MEMORY WARDEN", "chromosome"]
  ]
};

const courseIcons = {
  "AP Physics 1": "⚡",
  "AP Chemistry": "⚗",
  "AP Calculus AB": "∫",
  "AP Biology": "♧",
  "AP English Language": "✒",
  "AP English Literature": "📖",
  "AP United States History": "⌛",
  "AP Psychology": "Ψ"
};

const essayCourses = new Set([
  "AP English Language",
  "AP English Literature",
  "AP United States History"
]);

const essayPrompts = {
  "AP English Language": [
    {
      type: "Synthesis Essay",
      time: 40,
      title: "The role of public libraries",
      directions: "Read the six sources carefully. Write an essay that synthesizes at least three sources and develops a position about whether communities should expand funding and services for public libraries.",
      materials: [
        ["Source A — Municipal report", "Libraries across the surveyed region reported 18% more program attendance after adding technology classes, but operating costs increased by 11%."],
        ["Source B — Library director statement", "Public libraries provide reliable internet access, literacy programs, and quiet spaces to residents who cannot obtain those resources at home."],
        ["Source C — Budget analysis", "Local governments face competing needs for transportation, public safety, schools, and health services; new library funding requires an explicit trade-off."],
        ["Source D — Public-domain speech", "Our common institutions belong to every citizen and survive only when citizens use them, question them, and invest in their usefulness."],
        ["Source E — Census chart", "Residents with library cards borrow books in every age group. Cardholders also attend public programs at twice the rate of non-cardholders."],
        ["Source F — Community editorial", "A library should prioritize books and research, not become a substitute for cafes, entertainment venues, or government offices."]
      ]
    },
    {
      type: "Rhetorical Analysis",
      time: 40,
      title: "Analyze Roosevelt's first inaugural address",
      directions: "Read the passage carefully. Write an essay analyzing the rhetorical choices Franklin D. Roosevelt uses to address a fearful nation and encourage collective action.",
      materials: [
        ["Public-domain passage", "“The only thing we have to fear is fear itself—nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance. In every dark hour of our national life a leadership of frankness and vigor has met with that understanding and support of the people themselves which is essential to victory.”"]
      ]
    },
    {
      type: "Argument Essay",
      time: 40,
      title: "Judging progress",
      directions: "Write an argument responding to the question below. Develop a position, support it with evidence from your knowledge, reading, or experience, and explain its implications.",
      materials: [
        ["Prompt", "Is progress best measured by material improvements, by human relationships, or by some other standard?"]
      ]
    }
  ],
  "AP English Literature": [
    {
      type: "Poetry Analysis",
      time: 40,
      title: "Analyze Emily Dickinson's poem",
      directions: "Read the poem carefully. Write an essay analyzing how Dickinson uses literary elements and techniques to portray hope.",
      materials: [["Emily Dickinson, “Hope” is the thing with feathers", "“Hope” is the thing with feathers —\nThat perches in the soul —\nAnd sings the tune without the words —\nAnd never stops — at all —\n\nAnd sweetest — in the Gale — is heard —\nAnd sore must be the storm —\nThat could abash the little Bird\nThat kept so many warm —"]],
      work: true
    },
    {
      type: "Prose Fiction Analysis",
      time: 40,
      title: "Analyze Austen's characterization",
      directions: "Read the passage carefully. Write an essay analyzing how Austen uses narrative perspective and diction to characterize Elizabeth's first impression of Mr. Darcy.",
      materials: [["Jane Austen, Pride and Prejudice (public-domain passage)", "Elizabeth turned away with a lively expression of disappointment. She had expected conversation and wit, but found instead reserve and a pride he made no attempt to conceal. In the company of strangers he seemed unwilling to speak, yet she suspected that silence was not the same as indifference."]],
      work: true
    },
    {
      type: "Literary Argument",
      time: 40,
      title: "The power of memory",
      directions: "Write a well-developed essay in which you analyze the portrayal of memory in a work of fiction you have read. Do not merely summarize the plot. Select an appropriate work that will allow you to examine how memory shapes character, conflict, or theme.",
      materials: [["Student-selected work", "Choose a work of fiction of literary merit. Identify the work and author in your thesis or introduction."]],
      work: true
    }
  ],
  "AP United States History": [
    {
      type: "Document-Based Question",
      time: 60,
      title: "Evaluate federal economic policy, 1865–1900",
      directions: "Evaluate the extent to which federal policy promoted economic growth in the United States from 1865 to 1900. Use at least six documents and your knowledge of the period to develop an argument.",
      materials: [
        ["Document 1 — Homestead Act, 1862", "The act offered eligible citizens surveyed public land after a small fee and several years of residence or cultivation."],
        ["Document 2 — Railroad rates, table", "Freight rates per mile declined from 2.5 cents in 1865 to 0.8 cents in 1890 while tons moved annually more than quadrupled."],
        ["Document 3 — Labor union petition, 1886", "Workers asked Congress to limit twelve-hour shifts and protect employees injured or killed in unsafe industrial workplaces."],
        ["Document 4 — Federal court decision, excerpt", "The Supreme Court upheld the federal government's broad authority to regulate commerce among the states."],
        ["Document 5 — Native reservation policy, government report", "Federal officials intended to replace communal landholding with individual allotments and reduce tribal sovereignty."],
        ["Document 6 — Political cartoon, “The Octopus”, 1889", "Caption: railroad lines spread over farms and state capitals as a farmer and legislator struggle under them. Interpretation: concentrated corporate power threatened public control."],
        ["Document 7 — Treasury monetary policy, 1896", "Deficit spending remained constrained while the government maintained gold-backed currency and a high tariff system."]
      ]
    },
    {
      type: "Long Essay Question",
      time: 40,
      title: "Evaluate continuity and change",
      directions: "Evaluate the extent to which reform movements changed American political culture in the period 1820–1848. Develop an argument supported by relevant historical evidence.",
      materials: [["Evidence expectations", "Use specific examples of abolitionism, temperance, education, women's rights, and/or political participation. Explain both continuity and change."]]
    },
    {
      type: "Long Essay Question",
      time: 40,
      title: "Analyze causation",
      directions: "Evaluate the most significant factor that shaped United States foreign policy between 1890 and 1945. Develop an argument supported by relevant historical evidence.",
      materials: [["Evidence expectations", "Consider economic interests, nationalism, security concerns, ideological conflict, public opinion, or war. Address causation and comparison, not only chronology."]]
    }
  ]
};

const questions = [
  {id:1, course:"AP Physics 1", unit:"Unit 1", text:"A car moves with constant velocity. Which statement must be true?", answers:["Its acceleration is zero.","Its net force is increasing.","Its speed is increasing.","Its displacement is zero."], correct:0, explain:"Constant velocity means both speed and direction stay constant, so acceleration is zero."},
  {id:2, course:"AP Physics 1", unit:"Unit 1", text:"A 2 kg object experiences a net force of 10 N. What is its acceleration?", answers:["0.2 m/s²","5 m/s²","12 m/s²","20 m/s²"], correct:1, explain:"Newton's second law gives a = F/m = 10/2 = 5 m/s²."},
  {id:3, course:"AP Physics 1", unit:"Unit 2", text:"If the net force on an object is zero, which could be true?", answers:["The object is accelerating.","The object is moving at constant velocity.","The object must be at rest.","The object's mass is zero."], correct:1, explain:"Zero net force means zero acceleration. The object can be at rest or move with constant velocity."},
  {id:4, course:"AP Physics 1", unit:"Unit 3", text:"Which quantity is a vector?", answers:["Mass","Temperature","Displacement","Energy"], correct:2, explain:"Displacement has both magnitude and direction, making it a vector."},
  {id:5, course:"AP Physics 1", unit:"Unit 4", text:"A ball is thrown upward. Ignoring air resistance, what is its acceleration at the highest point?", answers:["Zero","9.8 m/s² downward","9.8 m/s² upward","It depends on its mass"], correct:1, explain:"Gravity acts throughout the motion, including at the highest point."}
];

const legacyUnitQuestionBank = {
  "AP Physics 1": {
    "Unit 1": [
      {id:101, course:"AP Physics 1", unit:"Unit 1", text:"A train travels 60 m in 3 s at constant speed. What is its speed?", answers:["15 m/s","20 m/s","30 m/s","180 m/s"], correct:1, explain:"Speed = distance / time = 60 / 3 = 20 m/s."},
      {id:102, course:"AP Physics 1", unit:"Unit 1", text:"If an object has a velocity of 10 m/s east and acceleration is 2 m/s² east, what happens next?", answers:["It slows down.","It speeds up eastward.","It moves west.","It stops immediately."], correct:1, explain:"Acceleration in the same direction as velocity increases speed."},
      {id:103, course:"AP Physics 1", unit:"Unit 1", text:"A car turns left at constant speed. Which quantity is changing?", answers:["Mass","Speed","Velocity","Temperature"], correct:2, explain:"Velocity includes direction, so turning left changes the velocity vector."}
    ],
    "Unit 2": [
      {id:201, course:"AP Physics 1", unit:"Unit 2", text:"A 4 kg object is pulled by a 16 N net force. What is its acceleration?", answers:["2 m/s²","4 m/s²","8 m/s²","16 m/s²"], correct:0, explain:"Using F = ma, a = 16 / 4 = 4 m/s²."},
      {id:202, course:"AP Physics 1", unit:"Unit 2", text:"Which force pair is a Newton's third law pair?", answers:["Gravity on the book and normal force from the table","Book pushing down on table and table pushing up on book","Friction and motion","Weight and acceleration"], correct:1, explain:"Action-reaction pairs act on different objects and are equal and opposite."},
      {id:203, course:"AP Physics 1", unit:"Unit 2", text:"A box at rest on a rough floor experiences no net force. What can be said?", answers:["It is accelerating.","The static friction equals the applied force.","It has zero mass.","The floor is frictionless."], correct:1, explain:"If it stays at rest, static friction balances any horizontal force."}
    ]
  },
  "AP Chemistry": {
    "Unit 1": [
      {id:301, course:"AP Chemistry", unit:"Unit 1", text:"Which subatomic particle has a negative charge?", answers:["Proton","Neutron","Electron","Nucleus"], correct:2, explain:"Electrons carry a negative charge."},
      {id:302, course:"AP Chemistry", unit:"Unit 1", text:"An atom with 11 protons and 10 electrons is a(n):", answers:["Neutral atom","Anion","Cation","Isotope"], correct:2, explain:"Losing an electron makes the atom positively charged, a cation."},
      {id:303, course:"AP Chemistry", unit:"Unit 1", text:"Elements in the same group generally share:", answers:["The same energy level","The same number of valence electrons","The same mass","The same radius"], correct:1, explain:"Group members share valence electron counts, producing similar chemical behavior."}
    ],
    "Unit 2": [
      {id:401, course:"AP Chemistry", unit:"Unit 2", text:"Which bond is most polar?", answers:["H-H","C-H","O-H","N-N"], correct:2, explain:"O-H has the largest electronegativity difference among these choices."},
      {id:402, course:"AP Chemistry", unit:"Unit 2", text:"Ionic compounds usually form between:", answers:["Two nonmetals","A metal and a nonmetal","Two metals","Two gases"], correct:1, explain:"Metals lose electrons and nonmetals gain them, creating ionic bonds."},
      {id:403, course:"AP Chemistry", unit:"Unit 2", text:"A Lewis structure is used to show:", answers:["Atomic mass","Bonding and lone pairs","Radioactivity","Phase changes"], correct:1, explain:"Lewis structures represent valence electrons and bonding arrangements."}
    ]
  },
  "AP Biology": {
    "Unit 2": "Unit 2 Cell Structure & Function",
    "Unit 4": "Unit 4 Cell Communication & Cell Cycle",
    "Unit 6": "Unit 6 Gene Expression & Regulation"
  },
  "AP Calculus AB": {
    "Unit 1": [
      {id:501, course:"AP Calculus AB", unit:"Unit 1", text:"What does lim x→3 f(x) describe?", answers:["The value of f(3)","The behavior of f(x) near x=3","The derivative at x=3","The integral from 0 to 3"], correct:1, explain:"A limit describes the value a function approaches near a point."},
      {id:502, course:"AP Calculus AB", unit:"Unit 1", text:"A function is continuous at x=a when:", answers:["It is differentiable there","It has a limit and matches f(a)","It is increasing","It is polynomial"], correct:1, explain:"Continuity requires the limit to exist and equal the function value."},
      {id:503, course:"AP Calculus AB", unit:"Unit 1", text:"Which expression is a derivative?", answers:["∫ f(x) dx","f'(x)","lim h→0 f(x+h)-f(x)/h","f(2)-f(1)"], correct:1, explain:"A derivative measures instantaneous rate of change and is written f'(x)."}
    ]
  },
  "AP Biology": {
    "Unit 1": [
      {id:601, course:"AP Biology", unit:"Unit 1", text:"Which molecule stores genetic information?", answers:["ATP","DNA","Glucose","Protein"], correct:1, explain:"DNA carries the hereditary information for cells."},
      {id:602, course:"AP Biology", unit:"Unit 1", text:"Water is polar because:", answers:["Its oxygen and hydrogen atoms share equal electronegativity","Its hydrogen atoms repel one another","Its oxygen pulls electrons more strongly than hydrogen","It is made of oxygen gas"], correct:2, explain:"Oxygen is more electronegative, giving water partial charges."},
      {id:603, course:"AP Biology", unit:"Unit 1", text:"Which macromolecule is the main source of quick energy for cells?", answers:["Lipids","Nucleic acids","Carbohydrates","Proteins"], correct:2, explain:"Carbohydrates provide a direct and rapid energy source for cell metabolism."}
    ]
  }
};

const courseUnits = {
  "AP Physics 1":[
    ["Unit 1","Kinematics","Motion, position, velocity and acceleration.","10–15",0],
    ["Unit 2","Force and Translational Dynamics","Interactions, forces, Newton's laws, and translational motion.","18–23",0],
    ["Unit 3","Work, Energy, and Power","Work, energy transfer, conservation, and power.","18–23",0],
    ["Unit 4","Linear Momentum","Impulse, momentum, and collisions.","10–15",0],
    ["Unit 5","Torque and Rotational Dynamics","Rotational motion, torque, and angular acceleration.","10–15",0],
    ["Unit 6","Energy and Momentum of Rotating Systems","Rotational kinetic energy, angular momentum, and rolling.","10–15",0],
    ["Unit 7","Oscillations","Periodic motion and simple harmonic motion.","5–8",0],
    ["Unit 8","Fluids","Fluid statics, pressure, buoyancy, and flow.","10–15",0]
  ],
  "AP Chemistry":[
    ["Unit 1","Atomic Structure & Properties","Atoms, isotopes, mass and electron structure.","7–9",0],
    ["Unit 2","Molecular & Ionic Compound Structure","Chemical bonding and molecular structure.","7–9",0],
    ["Unit 3","Intermolecular Forces & Properties","Interactions, gases, solutions and properties.","18–22",0],
    ["Unit 4","Chemical Reactions","Equations, reactions and stoichiometry.","7–9",0],
    ["Unit 5","Kinetics","Reaction rates and mechanisms.","7–9",0],
    ["Unit 6","Thermodynamics","Energy, enthalpy and calorimetry.","7–9",0],
    ["Unit 7","Equilibrium","Dynamic equilibrium, reaction quotients, and equilibrium calculations.","7–9",0],
    ["Unit 8","Acids and Bases","Acid-base models, pH, buffers, and titrations.","11–15",0],
    ["Unit 9","Applications of Thermodynamics","Entropy, free energy, and thermodynamic predictions.","7–9",0]
  ],
  "AP Calculus AB":[
    ["Unit 1","Limits and Continuity","Limits, continuity, and estimating behavior.","10–12",0],
    ["Unit 2","Differentiation: Definition and Fundamental Properties","Derivative definition and fundamental differentiation rules.","10–12",0],
    ["Unit 3","Composite, Implicit, and Inverse Functions","Chain rule, implicit differentiation, and inverse functions.","9–13",0],
    ["Unit 4","Contextual Applications of Differentiation","Motion, rates and optimization.","10–15",0],
    ["Unit 5","Analytical Applications of Differentiation","Graphing and behavior using derivatives.","15–18",0],
    ["Unit 6","Integration and Accumulation of Change","Antiderivatives, definite integrals, and accumulation.","17–20",0],
    ["Unit 7","Differential Equations","Differential equations, slope fields, and exponential models.","6–12",0],
    ["Unit 8","Applications of Integration","Area, volume, and accumulation applications.","10–15",0]
  ],
  "AP Biology":[
    ["Unit 1","Chemistry of Life","Water, macromolecules, and molecular structure.","8–11",0],
    ["Unit 2","Cell Structure and Function","Organelles, membranes, and cell structure-function relationships.","10–13",0],
    ["Unit 3","Cellular Energetics","Photosynthesis, cellular respiration, and energy transfer.","12–16",0],
    ["Unit 4","Cell Communication and Cell Cycle","Signals, feedback, and cell division.","10–15",0],
    ["Unit 5","Heredity","Mitosis, meiosis, and patterns of inheritance.","8–11",0],
    ["Unit 6","Gene Expression and Regulation","DNA, RNA, protein synthesis, and regulation.","12–16",0],
    ["Unit 7","Natural Selection","Evolutionary mechanisms and population change.","13–20",0],
    ["Unit 8","Ecology","Population interactions, ecosystems, and energy flow.","10–15",0]
  ],
  "AP English Language":[
    ["Unit 1","Rhetorical Situation","Speaker, audience, purpose, context, and exigence.","Choose",0],
    ["Unit 2","Claims and Evidence","Claims, evidence selection, and source credibility.","Choose",0],
    ["Unit 3","Reasoning and Organization","Logical reasoning, commentary, and line of reasoning.","Choose",0],
    ["Unit 4","Style","Word choice, syntax, tone, and rhetorical effects.","Choose",0],
    ["Unit 5","Rhetorical Analysis","Analyzing how writers use choices to advance purposes.","Choose",0],
    ["Unit 6","Argument Writing","Developing a defensible claim with evidence and reasoning.","Choose",0],
    ["Unit 7","Synthesis Writing","Combining and citing multiple sources to support a line of reasoning.","Choose",0],
    ["Unit 8","Multiple-Choice Strategies","Reading nonfiction passages and evaluating rhetorical choices.","Choose",0]
  ],
  "AP English Literature":[
    ["Unit 1","Reading Closely","Observing details, patterns, context, and textual meanings.","Choose",0],
    ["Unit 2","Character","Characterization, motivation, relationships, and development.","Choose",0],
    ["Unit 3","Setting","How place, time, atmosphere, and setting shape meaning.","Choose",0],
    ["Unit 4","Structure","Plot organization, chronology, shifts, and narrative framing.","Choose",0],
    ["Unit 5","Narration","Point of view, narrator reliability, voice, and perspective.","Choose",0],
    ["Unit 6","Figures of Speech and Symbolism","Imagery, figurative language, symbols, and connotation.","Choose",0],
    ["Unit 7","Themes and Thematic Development","How literary texts establish and develop central ideas.","Choose",0],
    ["Unit 8","Literary Argument","Interpreting evidence and composing defensible literary claims.","Choose",0]
  ],
  "AP United States History":[
    ["Period 1","1491–1607: Indigenous Americas to Colonization","Native societies, exploration, contact, and exchange.","4–6",0],
    ["Period 2","1607–1754: Colonial America","Colonial regions, labor, European rivalry, and identity.","6–8",0],
    ["Period 3","1754–1800: Revolution and New Nation","Imperial conflict, independence, Constitution, and early republic.","10–17",0],
    ["Period 4","1800–1848: Expansion and Reform","Republican politics, market revolution, reform, and expansion.","10–17",0],
    ["Period 5","1844–1877: Civil War and Reconstruction","Sectional conflict, war, emancipation, and Reconstruction.","10–17",0],
    ["Period 6","1865–1898: Industrialization and Its Effects","Industry, labor, immigration, cities, and the West.","10–17",0],
    ["Period 7","1890–1945: Modern America","Progressivism, overseas expansion, Depression, and world wars.","10–17",0],
    ["Period 8","1945–1980: Cold War","Containment, social movements, affluence, and political change.","10–17",0],
    ["Period 9","1980–Present: Contemporary America","Reagan era, globalization, technology, and domestic politics.","4–6",0]
  ],
  "AP Psychology":[
    ["Unit 1","Biological Bases of Behavior","Heredity, the nervous system, neurons, the brain, sleep, and sensation.","15–25",0],
    ["Unit 2","Cognition","Perception, memory, thinking, problem-solving, intelligence, and achievement.","15–25",0],
    ["Unit 3","Development and Learning","Development across the lifespan, gender and orientation, conditioning, and learning.","15–25",0],
    ["Unit 4","Social Psychology and Personality","Attribution, attitudes, social situations, personality theories, motivation, and emotion.","15–25",0],
    ["Unit 5","Mental and Physical Health","Health psychology, positive psychology, psychological disorders, and treatment.","15–25",0]
  ]
};

const courseAliases = {
  "AP Lang": "AP English Language",
  "AP Lit": "AP English Literature",
  APUSH: "AP United States History",
  "AP Psych": "AP Psychology"
};

let state = {
  questions: 0, correct: 0, xp: 0, level: 1, streak: 1,
  reviewed: [], answeredIds: [], wrongAnswers: [], currentCourse: "AP Physics 1",
  currentUnit: "Unit 1", currentQuestionIndex: 0, runXp: 0,
  bossHealth: 160, mode: "practice", currentReview: false,
  mastery: {}, completedUnits: [], currentRun: [],
  currentFrqIndex: 0, currentFrqPartIndex: 0, frqDrafts: {}, completedFrqs: [], frqGrades: {}, energy: MAX_PLAYER_HP, energyVersion: 0, examDates: {},
  bossHistory: {}, bossCycles: {}, bossTheme: null, bossTier: 0, bossCourseRun: [], bossFrqRun: [],
  bossAnswers: [], bossGrades: [], bossPhase: "mcq", bossDeadline: 0, bossMcqAnswered: 0,
  bossFrqIndex: 0, bossMaxHealth: 160,
  bossFrqDrafts: {}, bossSubmitted: false, bossTimedOut: false, bossDefeated: false, bossCorrect: 0, reviewQuestionId: null,
  plannerPrefs: { focusCourse: "AP Physics 1", targetUnit: "auto", studyDays: [1, 2, 3, 4, 5] },
  plannerCompleted: {},
  profile: { name: "PLAYER_001", class: "Scholar", outfit: "rookie", weapon: "sword" }
  , essayDrafts: {}, essayStartedAt: null, essaySecondsLeft: null, essayCompleted: []
};

function save({ sync = true } = {}){
  if (sync) state.lastSavedAt = Date.now();
  const savedState = {
    ...state,
    currentRun: (Array.isArray(state.currentRun) ? state.currentRun : [])
      .map(question => typeof question === "string" ? question : question?.id)
      .filter(Boolean)
  };
  localStorage.setItem("apStemQuestState", JSON.stringify(savedState));
  if (sync) window.scheduleAccountProgressSync?.();
}
function load(){
  const saved = localStorage.getItem("apStemQuestState");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      state = { ...state, ...data, profile: { ...state.profile, ...(data.profile || {}) } };
    } catch {
      localStorage.removeItem("apStemQuestState");
    }
  }
}
load();
if (!Number.isInteger(state.currentFrqPartIndex) || state.currentFrqPartIndex < 0) {
  state.currentFrqPartIndex = 0;
}
if (!state.frqDrafts || typeof state.frqDrafts !== "object" || Array.isArray(state.frqDrafts)) {
  state.frqDrafts = {};
}
if (!Array.isArray(state.completedFrqs)) state.completedFrqs = [];
if (!state.frqGrades || typeof state.frqGrades !== "object" || Array.isArray(state.frqGrades)) {
  state.frqGrades = {};
}
if (!state.bossHistory || typeof state.bossHistory !== "object" || Array.isArray(state.bossHistory)) {
  state.bossHistory = {};
}
if (!state.bossCycles || typeof state.bossCycles !== "object" || Array.isArray(state.bossCycles)) {
  state.bossCycles = {};
}
if (!state.bossFrqDrafts || typeof state.bossFrqDrafts !== "object" || Array.isArray(state.bossFrqDrafts)) {
  state.bossFrqDrafts = {};
}
state.bossFrqDrafts = Object.fromEntries(Object.entries(state.bossFrqDrafts)
  .filter(([, response]) => typeof response === "string"));
if (!Number.isInteger(state.bossTier) || state.bossTier < 0 || state.bossTier >= BOSS_EXAM_TIERS.length) {
  state.bossTier = 0;
}
if (!Array.isArray(state.bossCourseRun)) state.bossCourseRun = [];
if (!Array.isArray(state.bossFrqRun)) state.bossFrqRun = [];
if (!Array.isArray(state.bossAnswers)) state.bossAnswers = [];
if (!Array.isArray(state.bossGrades)) state.bossGrades = [];
if (!Array.isArray(state.wrongAnswers)) state.wrongAnswers = [];
state.wrongAnswers = state.wrongAnswers.filter(answer =>
  answer && typeof answer === "object" && answer.id !== undefined
    && typeof answer.course === "string" && Number.isInteger(answer.choice)
);
if (!Number.isFinite(state.xp) || !Number.isFinite(state.level)) {
  console.error("Saved player progression was invalid; resetting XP and level.");
  state.xp = 0;
  state.level = 1;
}
state.xp = Math.max(state.xp, Math.max(0, state.level - 1) * XP_PER_LEVEL);
state.level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
if (state.energyVersion < 2) {
  state.energy = state.energyVersion < 1
    ? MAX_PLAYER_HP
    : Math.round((Number.isFinite(state.energy) ? Math.max(0, Math.min(100, state.energy)) : 100) * MAX_PLAYER_HP / 100);
  state.energyVersion = 2;
} else if (!Number.isFinite(state.energy)) {
  state.energy = MAX_PLAYER_HP;
}
state.energy = Math.max(0, Math.min(MAX_PLAYER_HP, state.energy));
save({ sync: false });
if (!state.examDates || typeof state.examDates !== "object" || Array.isArray(state.examDates)) {
  state.examDates = {};
}
if (!state.plannerPrefs || typeof state.plannerPrefs !== "object" || Array.isArray(state.plannerPrefs)) {
  state.plannerPrefs = { focusCourse: state.currentCourse, targetUnit: "auto", studyDays: [1, 2, 3, 4, 5] };
}
if (!courseUnits[state.plannerPrefs.focusCourse]) {
  state.plannerPrefs.focusCourse = state.currentCourse;
}
if (!Array.isArray(state.plannerPrefs.studyDays)) {
  const oldCount = [3, 5, 7].includes(Number(state.plannerPrefs.sessionsPerWeek))
    ? Number(state.plannerPrefs.sessionsPerWeek) : 5;
  state.plannerPrefs.studyDays = Array.from({ length: oldCount }, (_, index) =>
    Math.round(index * 6 / (oldCount - 1))
  );
}
state.plannerPrefs.studyDays = [...new Set(state.plannerPrefs.studyDays.filter(day =>
  Number.isInteger(day) && day >= 0 && day <= 6
))].sort((a, b) => a - b);
if (!state.plannerPrefs.studyDays.length) state.plannerPrefs.studyDays = [1, 2, 3, 4, 5];
if (state.plannerPrefs.targetUnit !== "auto"
    && !(courseUnits[state.plannerPrefs.focusCourse] || []).some(unit => unit[0] === state.plannerPrefs.targetUnit)) {
  state.plannerPrefs.targetUnit = "auto";
}
if (!state.plannerCompleted || typeof state.plannerCompleted !== "object" || Array.isArray(state.plannerCompleted)) {
  state.plannerCompleted = {};
}
const previousPhysicsUnitNumbers = { 3: 2, 4: 3, 5: 4, 6: 7 };
state.completedUnits = [...new Set((Array.isArray(state.completedUnits) ? state.completedUnits : []).map(key => {
  const separator = key.lastIndexOf("::");
  if (separator < 0) return key;
  const course = key.slice(0, separator);
  const unit = key.slice(separator + 2);
  const match = unit.match(/^Unit ([1-6])$/);
  if (course !== "AP Physics 1" || !match) return key;
  const newNumber = previousPhysicsUnitNumbers[Number(match[1])] || Number(match[1]);
  return `${course}::Unit ${newNumber}`;
}))];

function unitContentKey(course, unit){
  const definition = (courseUnits[course] || []).find(entry => entry[0] === unit);
  if (!definition) return unit;
  const aliases = {
    "AP Physics 1": {
      "Unit 3": "Unit 4 Energy",
      "Unit 4": "Unit 5 Momentum",
      "Unit 7": "Unit 6 Simple Harmonic Motion"
    },
    "AP Biology": {
      "Unit 2": "Unit 2 Cell Structure & Function",
      "Unit 4": "Unit 4 Cell Communication & Cell Cycle",
      "Unit 6": "Unit 6 Gene Expression & Regulation"
    },
    "AP Calculus AB": {
      "Unit 1": "Unit 1 Limits & Continuity",
      "Unit 2": "Unit 2 Differentiation",
      "Unit 3": "Unit 3 Composite, Implicit & Inverse Functions",
      "Unit 6": "Unit 6 Integration & Accumulation"
    }
  };
  return aliases[course]?.[unit] || `${unit} ${definition[1]}`;
}

function getQuestionPool(course = state.currentCourse, unit = state.currentUnit) {
  const coursePool = unitQuestionBank[course] || {};
  const contentKey = unitContentKey(course, unit);
  const pool = coursePool[unit] || coursePool[contentKey];
  if (!pool) throw new Error(`No MCQ bank found for ${course}, ${unit}.`);
  if (pool.length < QUESTIONS_PER_RUN) throw new Error(`${course}, ${unit} needs at least ${QUESTIONS_PER_RUN} authored MCQs.`);
  const canonicalUnit = `${unit} ${(courseUnits[course] || []).find(entry => entry[0] === unit)?.[1] || ""}`.trim();
  return pool.map(question => ({ ...question, unit: canonicalUnit }));
}

function getCourseQuestionPool(course = state.currentCourse){
  return (courseUnits[course] || []).flatMap(([unit]) => getQuestionPool(course, unit)
    .map(question => ({ ...question, course, unitId: unit })));
}

function shuffle(items){
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function randomizeQuestionChoices(question, cache = false){
  if (!question || !Array.isArray(question.answers)) return question;
  if (cache && Array.isArray(question._randomizedAnswers) && Number.isInteger(question._randomizedCorrect)) {
    return {
      ...question,
      answers: [...question._randomizedAnswers],
      correct: question._randomizedCorrect,
      answerExplanations: Array.isArray(question._randomizedAnswerExplanations)
        ? [...question._randomizedAnswerExplanations]
        : question.answerExplanations
    };
  }
  const indexedAnswers = question.answers.map((answer, index) => ({
    answer,
    originalIndex: index,
    isCorrect: index === question.correct
  }));
  const randomizedAnswers = shuffle(indexedAnswers);
  const answers = randomizedAnswers.map(entry => entry.answer);
  const correct = randomizedAnswers.findIndex(entry => entry.isCorrect);
  let answerExplanations = question.answerExplanations;
  if (Array.isArray(question.answerExplanations)) {
    answerExplanations = randomizedAnswers.map(entry =>
      question.answerExplanations[entry.originalIndex]
    );
    question.answerExplanations = answerExplanations;
  }
  if (cache) {
    question._randomizedAnswers = answers;
    question._randomizedCorrect = correct;
    question._randomizedAnswerExplanations = answerExplanations;
  }
  return { ...question, answers, correct, answerExplanations };
}

function answerFeedback(question, choice, correct){
  const selectedExplanation = Array.isArray(question.answerExplanations)
    ? question.answerExplanations[choice]
    : null;
  if (selectedExplanation) {
    return `${selectedExplanation} ${question.explain}`;
  }
  return question.explain;
}

function allQuestions(){
  const bankQuestions = Object.entries(unitQuestionBank).flatMap(([course, courseBank]) =>
    Object.entries(courseBank).flatMap(([contentKey, pool]) => {
      const activeUnit = (courseUnits[course] || []).find(unit =>
        unitContentKey(course, unit[0]) === contentKey
      );
      return pool.map(question => ({
        ...question,
        course,
        unit: activeUnit ? `${activeUnit[0]} ${activeUnit[1]}` : question.unit
      }));
    })
  );
  return [
    ...questions,
    ...Object.values(legacyUnitQuestionBank).flatMap(course => Object.values(course).flat()),
    ...bankQuestions
  ];
}

function createQuestionRun(){
  const pool = getQuestionPool();
  const runLength = Math.min(pool.length, MAX_QUESTIONS_PER_RUN);
  const deck = [...pool];
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck.slice(0, runLength).map((question, index) => ({
    ...randomizeQuestionChoices(question),
    runId: `${question.id}-${Date.now()}-${index}`
  }));
}

function activeQuestion(){
  if (state.mode === "review" && state.reviewQuestionId !== null) {
    const reviewedQuestion = allQuestions().find(question => String(question.id) === String(state.reviewQuestionId));
    if (!reviewedQuestion) throw new Error(`The reviewed question ${state.reviewQuestionId} is no longer available.`);
    return randomizeQuestionChoices(reviewedQuestion, true);
  }
  if (state.mode === "boss") {
    const run = Array.isArray(state.currentRun) ? state.currentRun : [];
    if (!Number.isInteger(state.currentQuestionIndex) || state.currentQuestionIndex < 0
        || state.currentQuestionIndex >= run.length) {
      throw new Error("The active boss exam question is unavailable.");
    }
    const current = run[state.currentQuestionIndex];
    if (current && typeof current === "object") return current;
    const savedExamQuestion = (state.bossCourseRun || []).find(question =>
      String(question.id) === String(current)
    );
    if (savedExamQuestion) return savedExamQuestion;
    const question = allQuestions().find(item => String(item.id) === String(current));
    if (!question) throw new Error(`Boss exam question ${current} is no longer available.`);
    return randomizeQuestionChoices(question);
  }
  const pool = getQuestionPool();
  const questionsById = new Map(pool.map(question => [question.id, question]));
  const runLength = Math.min(pool.length, MAX_QUESTIONS_PER_RUN);
  const storedRun = Array.isArray(state.currentRun) ? state.currentRun : [];
  const runIds = storedRun.map(question => typeof question === "string" ? question : question?.id);
  const validRun = runIds.length >= QUESTIONS_PER_RUN
    && runIds.length <= runLength
    && new Set(runIds).size === runIds.length
    && runIds.every(id => questionsById.has(id));
  const validIndex = Number.isInteger(state.currentQuestionIndex)
    && state.currentQuestionIndex >= 0
    && state.currentQuestionIndex < runIds.length;
  if (!validRun || !validIndex) {
    state.currentRun = createQuestionRun();
    state.currentQuestionIndex = 0;
  } else {
    state.currentRun = runIds.map((id, index) => {
      const originalQuestion = questionsById.get(id);
      const storedQuestion = typeof storedRun[index] === "object" ? storedRun[index] : null;
      if (storedQuestion && Array.isArray(storedQuestion.answers) && Number.isInteger(storedQuestion.correct)) {
        return {
          ...originalQuestion,
          answers: [...storedQuestion.answers],
          correct: storedQuestion.correct,
          runId: storedQuestion.runId
        };
      }
      return {
        ...randomizeQuestionChoices(originalQuestion),
        runId: storedQuestion?.runId
      };
    });
  }
  return state.currentRun[state.currentQuestionIndex];
}

function rechargeEnergy(){
  state.energy = Math.min(MAX_PLAYER_HP, state.energy + ENERGY_PER_QUESTION);
  updateEnergyUI();
  save();
}

function drainEnergy(){
  state.energy = Math.max(0, state.energy - ENERGY_PER_QUESTION);
  updateEnergyUI();
}

function updateEnergyUI(){
  const percent = Math.round(state.energy / MAX_PLAYER_HP * 100);
  document.getElementById("homeEnergy").style.width = `${percent}%`;
  document.getElementById("homeEnergyLabel").textContent = `${state.energy}/${MAX_PLAYER_HP}`;
  document.getElementById("practiceEnergy").style.width = `${percent}%`;
  document.getElementById("practiceEnergyLabel").textContent = `${state.energy}/${MAX_PLAYER_HP}`;
  updateBattleBars();
}

function currentBossTheme(){
  if (state.bossTheme) return state.bossTheme;
  const theme = bossThemes[state.currentCourse] || bossThemes["AP Physics 1"];
  const units = courseUnits[state.currentCourse] || [];
  const unitIndex = Math.max(0, units.findIndex(unit => unit[0] === state.currentUnit));
  const [name, artworkKey] = theme[unitIndex % theme.length];
  return { name, artworkKey, artwork: bossArtwork[artworkKey] };
}

function selectBossTheme(tier){
  const themes = bossThemes[state.currentCourse] || bossThemes["AP Physics 1"];
  if (!Number.isInteger(tier) || tier < 0 || tier >= BOSS_EXAM_TIERS.length) {
    throw new RangeError(`Invalid boss exam difficulty: ${tier}.`);
  }
  let historyKey = `${state.currentCourse}::${tier}`;
  let history = Array.isArray(state.bossHistory[historyKey]) ? state.bossHistory[historyKey] : [];
  let available = themes.filter(([name]) => !history.includes(name));
  if (!available.length) {
    history = [];
    available = [...themes];
  }
  const [baseName, artworkKey] = available[Math.floor(Math.random() * available.length)];
  const name = tier ? `${baseName}: ${BOSS_EXAM_TIERS[tier].title}` : baseName;
  history.push(baseName);
  state.bossHistory[historyKey] = history;
  state.bossTier = tier;
  state.bossTheme = { name, artworkKey, artwork: bossArtwork[artworkKey], tier };
}

function frqItemsForUnit(course, unit){
  const courseFrqs = frqBank[course] || {};
  return courseFrqs[unit] || courseFrqs[unitContentKey(course, unit)] || [];
}

function getFrqResponseKey(course, unit, frqId, partLabel){
  return `${course}::${unit}::${frqId}::${partLabel}`;
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");
  window.scrollTo(0, 0);
  if (id === "analytics") renderAnalytics();
  if (id === "practice") renderPracticeQuestion();
  if (id === "boss") renderBossQuestion();
  if (id === "frq") renderFrqPractice();
  if (id === "essay") renderEssayPractice();
  if (id === "planner") renderPlanner();
  if (id === "sandbox") {
    window.refreshFreeFeatures?.();
    window.resumeSandbox?.();
  }
  else window.stopSandbox?.();
  updateUI();
  save();
}

function selectCourse(course){
  course = courseAliases[course] || course;
  state.currentCourse = course;
  state.currentUnit = (courseUnits[course] || [["Unit 1"]])[0][0];
  document.getElementById("selectedCourseTitle").textContent = course.toUpperCase();
  const grid = document.getElementById("unitGrid");
  grid.innerHTML = (courseUnits[course] || []).map((u, i) => `
    <div class="unit-card">
      <div class="weight">UNIT ${i + 1}</div>
      <h3>${u[1]}</h3>
      <p>${u[2]}</p>
      <small>EXAM WEIGHT: ${u[3]}%</small>
      <small class="unit-clear-state">${state.completedUnits.includes(`${course}::${u[0]}`) ? "✓ CLEARED" : "NOT YET CLEARED"}</small>
      <div class="progress"><div style="width:${u[4]}%"></div></div>
      <div class="unit-practice-actions">
        <button class="pixel-btn" onclick="startUnit(${i}, 'mcq')">PRACTICE MCQ ▶</button>
        <button class="pixel-btn frq-choice" onclick="startUnit(${i}, 'frq')">PRACTICE FRQ ▶</button>
        ${essayCourses.has(course)
          ? `<button class="pixel-btn essay-choice" onclick="startUnit(${i}, 'essay')">PRACTICE ESSAY ▶</button>`
          : ""}
      </div>
    </div>`).join("");
  document.getElementById("courseDetail").classList.remove("hidden");
  showPage("courses");
  setTimeout(() => document.getElementById("courseDetail").scrollIntoView({ behavior: "smooth" }), 50);
}

function startPractice(){
  state.mode = "practice";
  state.reviewQuestionId = null;
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.bossHealth = 160;
  state.currentRun = createQuestionRun();
  showPage("practice");
}

function startUnit(index, practiceType = "mcq"){
  const units = courseUnits[state.currentCourse] || [];
  const selected = units[index] || units[0] || ["Unit 1"];
  state.currentUnit = selected[0];
  state.reviewQuestionId = null;
  if (practiceType === "essay") {
    if (!essayCourses.has(state.currentCourse)) return;
    state.mode = "essay";
    startEssayPractice(index);
    return;
  }
  if (practiceType === "frq") {
    state.mode = "frq";
    state.currentFrqIndex = 0;
    state.currentFrqPartIndex = 0;
    showPage("frq");
    return;
  }
  state.mode = "practice";
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.bossHealth = 160;
  state.currentRun = createQuestionRun();
  showPage("practice");
  renderPracticeQuestion();
}

let essayTimerHandle = null;

if (!window.APArcadeGradeEssay) {
  window.APArcadeGradeEssay = async function essayGradingUnavailable() {
    throw new Error("The essay grading service is still loading. Wait a moment and try again.");
  };
}

function essayKey(course = state.currentCourse, unit = state.currentUnit, essayIndex = state.currentEssayIndex || 0){
  return `${course}::${unit}::${essayIndex}`;
}

function startEssayPractice(unitIndex = 0){
  const prompts = essayPrompts[state.currentCourse] || [];
  if (!prompts.length) return;
  state.currentEssayIndex = unitIndex % prompts.length;
  state.essaySecondsLeft = prompts[state.currentEssayIndex].time * 60;
  state.essayStartedAt = Date.now();
  renderEssayPractice();
  showPage("essay");
}

function renderEssayPractice(){
  const prompt = (essayPrompts[state.currentCourse] || [])[state.currentEssayIndex || 0];
  if (!prompt) return;
  const key = essayKey();
  document.getElementById("essayCourseLabel").textContent =
    `${state.currentCourse.toUpperCase()} • ${state.currentUnit}`;
  document.getElementById("essayTitle").textContent = prompt.title;
  document.getElementById("essayDirections").textContent = prompt.directions;
  document.getElementById("essayType").textContent = prompt.type.toUpperCase();
  document.getElementById("essayTime").textContent = `${prompt.time}:00 RECOMMENDED`;

  const materials = document.getElementById("essayMaterials");
  materials.replaceChildren();
  prompt.materials.forEach(([label, text], index) => {
    const material = document.createElement("article");
    material.className = "essay-material";
    const heading = document.createElement("h3");
    heading.textContent = label;
    const body = document.createElement("p");
    setAcademicText(body, text);
    material.append(heading, body);
    materials.append(material);
  });

  const response = document.getElementById("essayResponse");
  if (response.dataset.key !== key) {
    response.value = (state.essayDrafts || {})[key] || "";
    response.dataset.key = key;
  }
  response.oninput = () => {
    state.essayDrafts[key] = response.value;
    document.getElementById("essaySaveStatus").textContent = "Essay draft saved.";
    save();
  };
  const savedGrade = state.essayGrades?.[key];
  if (savedGrade) renderEssayGrade(savedGrade);
  else document.getElementById("essayGradeResult").classList.add("hidden");
  resetEssayTimer(false);
  updateEssayTimer();
}

function resetEssayTimer(resetSeconds = true){
  const prompt = (essayPrompts[state.currentCourse] || [])[state.currentEssayIndex || 0];
  if (!prompt) return;
  if (resetSeconds) state.essaySecondsLeft = prompt.time * 60;
  state.essayStartedAt = Date.now();
  if (essayTimerHandle) clearInterval(essayTimerHandle);
  essayTimerHandle = setInterval(updateEssayTimer, 1000);
  updateEssayTimer();
}

function updateEssayTimer(){
  if (!Number.isFinite(state.essaySecondsLeft)) return;
  if (state.essaySecondsLeft < 0) state.essaySecondsLeft = 0;
  const minutes = Math.floor(state.essaySecondsLeft / 60);
  const seconds = state.essaySecondsLeft % 60;
  document.getElementById("essayTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  if (state.essaySecondsLeft === 0 && essayTimerHandle) {
    clearInterval(essayTimerHandle);
    essayTimerHandle = null;
    document.getElementById("essaySaveStatus").textContent = "Time is up. You can still finish and review your essay.";
    return;
  }
  state.essaySecondsLeft -= 1;
}

function completeEssayPractice(){
  const key = essayKey();
  const editor = document.getElementById("essayResponse");
  state.essayDrafts = state.essayDrafts || {};
  state.essayDrafts[key] = editor.value;
  if ((state.essayCompleted || []).includes(key)) {
    document.getElementById("essaySaveStatus").textContent = "This essay is already complete; your saved response has been preserved.";
    return;
  }
  state.essayCompleted = [...new Set([...(state.essayCompleted || []), key])];
  state.xp += 100;
  state.level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  save();
  if (essayTimerHandle) clearInterval(essayTimerHandle);
  essayTimerHandle = null;
  document.getElementById("essaySaveStatus").textContent = "Essay completed. Your full response has been saved.";
}

async function gradeEssayWithAI(){
  const editor = document.getElementById("essayResponse");
  const key = essayKey();
  let response = editor.value.trim();
  if (!response) response = String((state.essayDrafts || {})[key] || "").trim();
  state.essayDrafts = state.essayDrafts || {};
  state.essayDrafts[key] = response;
  save();
  const result = document.getElementById("essayGradeResult");
  const button = document.getElementById("gradeEssayBtn");
  if (response.length < 40) {
    result.classList.remove("hidden");
    result.textContent = "Write at least a short complete essay before requesting an AI rubric grade.";
    return;
  }
  const prompt = (essayPrompts[state.currentCourse] || [])[state.currentEssayIndex || 0];
  if (!prompt) return;

  button.disabled = true;
  button.textContent = "GRADING...";
  result.classList.remove("hidden");
  result.textContent = "Analyzing the essay against the official rubric...";
  try {
    const grading = await window.APArcadeGradeEssay({
      course: state.currentCourse,
      essayType: prompt.type,
      title: prompt.title,
      directions: prompt.directions,
      materials: prompt.materials,
      response
    });
    if (!grading || typeof grading !== "object") {
      throw new Error("The grading service returned an empty result.");
    }
    renderEssayGrade(grading);
    state.essayGrades = state.essayGrades || {};
    state.essayGrades[essayKey()] = grading;
    save();
  } catch (error) {
    console.error("Essay grading failed:", error);
    result.textContent = error instanceof Error
      ? `AI grading could not be completed: ${error.message}`
      : "AI grading could not be completed. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = "FREE RUBRIC GRADE";
  }
}

function renderEssayGrade(grading){
  if (!grading || !grading.criteria || !Array.isArray(grading.strengths) || !Array.isArray(grading.improvements)) {
    throw new Error("The grading service returned an invalid rubric score.");
  }
  const result = document.getElementById("essayGradeResult");
  result.replaceChildren();

  const score = document.createElement("div");
  score.className = "essay-grade-score";
  score.textContent = `AP RUBRIC SCORE: ${grading.total}/${grading.maxTotal}`;
  result.append(score);

  const appendList = (headingText, items) => {
    const heading = document.createElement("h3");
    heading.textContent = headingText;
    const list = document.createElement("ul");
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    });
    result.append(heading, list);
  };

  Object.entries(grading.criteria).forEach(([criterion, value]) => {
    const heading = document.createElement("h3");
    heading.textContent = `${criterion.replaceAll("_", " ").toUpperCase()} — ${value.score}/${value.max}`;
    const reason = document.createElement("p");
    reason.textContent = value.reason;
    result.append(heading, reason);
  });
  appendList("Strengths", grading.strengths);
  appendList("Next revisions", grading.improvements);
  if (grading.summary) {
    const heading = document.createElement("h3");
    heading.textContent = "Overall feedback";
    const summary = document.createElement("p");
    summary.textContent = grading.summary;
    result.append(heading, summary);
  }
}

function renderFrqPractice(){
  const items = currentFrqItems();
  if (!items || items.length < FRQS_PER_UNIT) {
    throw new Error(`Expected at least ${FRQS_PER_UNIT} FRQs for ${state.currentCourse}, ${state.currentUnit}.`);
  }
  const runLength = items.length;
  if (state.currentFrqIndex >= runLength) state.currentFrqIndex = 0;
  const frq = items[state.currentFrqIndex];
  if (state.currentFrqPartIndex >= frq.parts.length) state.currentFrqPartIndex = 0;
  const part = frq.parts[state.currentFrqPartIndex];
  const completionKey = getFrqCompletionKey(frq);
  const completed = state.completedFrqs.includes(completionKey);
  const savedGrade = state.frqGrades[completionKey];
  document.getElementById("frqCourseLabel").textContent = `${state.currentCourse} • ${state.currentUnit}`;
  document.getElementById("frqProgress").textContent =
    `FRQ ${state.currentFrqIndex + 1} / ${runLength} • PART (${part.label})`;
  setAcademicText(document.getElementById("frqTitle"), frq.title);
  setAcademicText(document.getElementById("frqScenario"), frq.scenario);
  document.getElementById("frqCompleteBtn").disabled = completed;
  document.getElementById("frqCompleteBtn").textContent = completed ? "FRQ COMPLETED ✓" : "COMPLETE FRQ (+50 XP)";
  document.getElementById("frqCompletionStatus").textContent =
    completed ? "FRQ complete. The +50 XP reward was already earned." : "";

  const parts = document.getElementById("frqParts");
  parts.replaceChildren();
  const card = document.createElement("article");
  card.className = "frq-part";
  const heading = document.createElement("h3");
  heading.textContent = `(${part.label})`;
  const prompt = document.createElement("p");
  setAcademicText(prompt, part.prompt);
  const key = getFrqResponseKey(state.currentCourse, state.currentUnit, frq.id, part.label);
  const response = document.createElement("textarea");
  response.className = "frq-response";
  response.rows = 4;
  response.placeholder = "Write your reasoning here...";
  response.setAttribute("aria-label", `Your response to part ${part.label}`);
  response.value = state.frqDrafts[key] || "";
  response.addEventListener("input", () => {
    state.frqDrafts[key] = response.value;
    save();
  });
  const guideButton = document.createElement("button");
  guideButton.className = "pixel-btn frq-guide-button";
  guideButton.type = "button";
  guideButton.textContent = "SHOW SCORING GUIDE";
  const guide = document.createElement("div");
  guide.className = "frq-guide hidden";
  const rubric = document.createElement("p");
  setAcademicText(rubric, `Scoring guide: ${part.rubric}`);
  const solution = document.createElement("p");
  setAcademicText(solution, `Expected response: ${part.solution}`);
  guide.append(rubric, solution);
  guideButton.addEventListener("click", () => {
    const showing = guide.classList.toggle("hidden");
    guideButton.textContent = showing ? "SHOW SCORING GUIDE" : "HIDE SCORING GUIDE";
  });
  card.append(heading, prompt, response, guideButton, guide);
  const gradedPart = savedGrade?.parts.find(result => result.label === part.label);
  if (gradedPart) {
    const feedback = document.createElement("p");
    feedback.className = gradedPart.earned ? "frq-grade-correct" : "frq-grade-incorrect";
    setAcademicText(feedback, `${gradedPart.earned ? "RIGHT" : "NEEDS WORK"} — ${gradedPart.matched.length}/${gradedPart.matched.length + gradedPart.missing.length} key terms matched. Sample response: ${gradedPart.solution}`);
    card.append(feedback);
  }
  parts.append(card);

  document.getElementById("frqPrevBtn").disabled =
    state.currentFrqIndex === 0 && state.currentFrqPartIndex === 0;
  document.getElementById("frqPrevBtn").textContent =
    state.currentFrqPartIndex === 0 ? "◀ PREVIOUS FRQ" : `◀ PREVIOUS PART (${frq.parts[state.currentFrqPartIndex - 1].label})`;
  document.getElementById("frqNextBtn").textContent = state.currentFrqPartIndex < frq.parts.length - 1
    ? `NEXT PART (${frq.parts[state.currentFrqPartIndex + 1].label}) ▶`
    : state.currentFrqIndex === runLength - 1 ? "RETURN TO UNIT MAP" : "NEXT FRQ ▶";
}

function currentFrqItems(){
  return frqItemsForUnit(state.currentCourse, state.currentUnit);
}

function getFrqCompletionKey(frq){
  return getFrqCompletionKeyFor(state.currentCourse, state.currentUnit, frq.id);
}

function getFrqCompletionKeyFor(course, unit, frqId){
  return `${course}::${unit}::${frqId}`;
}

function completeCurrentFrq(){
  const frq = currentFrqItems()?.[state.currentFrqIndex];
  if (!frq) throw new Error(`No FRQ is available at index ${state.currentFrqIndex}.`);
  const completionKey = getFrqCompletionKey(frq);
  if (state.completedFrqs.includes(completionKey)) return;
  const incompletePart = frq.parts.find(part => {
    const key = getFrqResponseKey(state.currentCourse, state.currentUnit, frq.id, part.label);
    return !(state.frqDrafts[key] || "").trim();
  });
  if (incompletePart) {
    document.getElementById("frqCompletionStatus").textContent =
      `Answer every part before completing this FRQ. Part (${incompletePart.label}) is still blank.`;
    return;
  }
  const grades = frq.parts.map(part => {
    const key = getFrqResponseKey(state.currentCourse, state.currentUnit, frq.id, part.label);
    return { label: part.label, ...gradeFrqResponse(part, state.frqDrafts[key] || ""), solution: part.solution };
  });
  state.frqGrades[completionKey] = { parts: grades };
  state.completedFrqs.push(completionKey);
  awardXp(50);
  const points = grades.reduce((sum, part) => sum + part.earned, 0);
  document.getElementById("frqCompletionStatus").textContent =
    `FRQ graded: ${points}/${grades.length} estimated points. Keyword-based estimate; see each part for feedback. +50 XP`;
  save();
  updateUI();
  renderFrqPractice();
}

function moveFrq(direction){
  const items = currentFrqItems();
  const runLength = items.length;
  const current = items[state.currentFrqIndex];
  const nextPartIndex = state.currentFrqPartIndex + direction;
  if (nextPartIndex >= 0 && nextPartIndex < current.parts.length) {
    state.currentFrqPartIndex = nextPartIndex;
    renderFrqPractice();
    return;
  }
  const nextIndex = state.currentFrqIndex + direction;
  if (nextIndex < 0) return;
  if (nextIndex >= runLength) {
    finishPlannerQuest();
    const returnToPlanner = state.plannerReturnPending;
    state.plannerReturnPending = false;
    showPage(returnToPlanner ? "planner" : "courses");
    return;
  }
  state.currentFrqIndex = nextIndex;
  state.currentFrqPartIndex = direction > 0
    ? 0
    : items[nextIndex].parts.length - 1;
  renderFrqPractice();
}

function renderBossDifficultyOptions(){
  const options = document.getElementById("bossDifficultyOptions");
  if (!options) return;
  const course = state.currentCourse;
  options.replaceChildren(...BOSS_EXAM_TIERS.map((tier, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "boss-difficulty-option";
    button.setAttribute("aria-label", tier.title || "STANDARD");
    button.innerHTML = `<strong>${tier.title || "STANDARD"}</strong>
      <span>${tier.mcqPerUnit} MCQs per unit · ${tier.frqCount[course]} FRQs · ${tier.minutes / 60} hours</span>
      <small>SELECT DIFFICULTY</small>`;
    button.addEventListener("click", () => startBossBattle(index));
    return button;
  }));
  const status = document.getElementById("bossDifficultyStatus");
  if (status) status.textContent = "All full-course exam difficulties are free to play.";
}

window.refreshBossDifficultyOptions = renderBossDifficultyOptions;

function closeBossDifficultyPicker(){
  document.getElementById("bossDifficultyModal").classList.add("hidden");
}

function startBossBattle(tierIndex){
  if (state.energy <= 0) {
    window.alert("Your HP is depleted. Complete practice questions to restore HP before entering another boss battle.");
    return;
  }
  if (tierIndex === undefined) {
    renderBossDifficultyOptions();
    document.getElementById("bossDifficultyModal").classList.remove("hidden");
    return;
  }
  if (!Number.isInteger(tierIndex) || tierIndex < 0 || tierIndex >= BOSS_EXAM_TIERS.length) {
    throw new RangeError(`Invalid boss exam difficulty: ${tierIndex}.`);
  }
  closeBossDifficultyPicker();
  selectBossTheme(tierIndex);
  const tier = BOSS_EXAM_TIERS[state.bossTier];
  const units = courseUnits[state.currentCourse] || [];
  if (!units.length) throw new Error(`No course units are configured for ${state.currentCourse}.`);
  const questionsByUnit = units.map(([unit]) => {
    const pool = getQuestionPool(state.currentCourse, unit);
    return {
      unit,
      questions: shuffle(pool).slice(0, Math.min(tier.mcqPerUnit, pool.length))
    };
  });
  const course = state.currentCourse;
  const courseFrqs = units.flatMap(([unit]) =>
    frqItemsForUnit(course, unit).map(frq => ({ course, unit, frq }))
  );
  const frqCount = tier.frqCount[course];
  if (courseFrqs.length < frqCount) {
    throw new Error(`${course} needs ${frqCount} authored FRQ prompts for this exam; found ${courseFrqs.length}.`);
  }
  const selectedFrqs = shuffle(courseFrqs).slice(0, frqCount);
  state.mode = "boss";
  state.reviewQuestionId = null;
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.bossCourseRun = questionsByUnit.flatMap(({unit, questions}) =>
    questions.map(question => randomizeQuestionChoices({ ...question, course, unitId: unit }))
  );
  state.currentRun = shuffle(state.bossCourseRun);
  state.bossFrqRun = selectedFrqs.flatMap(({unit, frq}) =>
    frq.parts.map((part, partIndex) => ({ course, unit, frqId: frq.id, frq, part, partIndex }))
  );
  state.bossPhase = "mcq";
  state.bossDeadline = Date.now() + tier.minutes * 60 * 1000;
  state.bossMcqAnswered = 0;
  state.bossFrqIndex = 0;
  state.bossFrqDrafts = {};
  state.bossSubmitted = false;
  state.bossTimedOut = false;
  state.bossDefeated = false;
  state.bossCorrect = 0;
  state.bossAnswers = [];
  state.bossGrades = [];
  document.getElementById("bossExamDescription").textContent =
    `${course.toUpperCase()} • ${tier.title ? `${tier.title} • ` : ""}FULL COURSE • ${tier.minutes} MINUTES`;
  state.bossMaxHealth = state.currentRun.length * 20 + state.bossFrqRun.length * 10;
  state.bossHealth = state.bossMaxHealth;
  save();
  showPage("boss");
  startBossTimer();
}

function renderPracticeQuestion(){
  const q = activeQuestion();
  const questionNumber = state.currentQuestionIndex + 1;
  const runLength = state.currentRun.length || QUESTIONS_PER_RUN;
  const answerMode = state.mode === "review" ? "review" : "practice";
  document.getElementById("practiceQuestionTag").textContent = `${q.unit.toUpperCase()} • MULTIPLE CHOICE`;
  setAcademicText(document.getElementById("practiceQuestionText"), q.text);
  renderAnswerButtons(document.getElementById("practiceAnswers"), q.answers, answerMode);
  document.getElementById("practiceFeedback").textContent = "";
  document.getElementById("practiceFeedback").className = "feedback";
  document.getElementById("practiceNextBtn").classList.add("hidden");
  state.currentReview = state.reviewed.includes(q.id);
  const reviewBtn = document.getElementById("practiceReviewBtn");
  reviewBtn.textContent = state.currentReview ? "★ MARKED FOR REVIEW" : "☆ MARK FOR REVIEW";
  reviewBtn.classList.toggle("marked", state.currentReview);
  document.getElementById("practiceCourseLabel").textContent = `${state.currentCourse} • ${state.currentUnit}`;
  document.getElementById("practiceIcon").textContent = courseIcons[state.currentCourse] || "★";
  document.getElementById("questionNumber").textContent = `${questionNumber} / ${runLength}`;
  document.getElementById("practiceProgressText").textContent = `${questionNumber} / ${runLength}`;
  document.getElementById("practiceProgress").style.width = `${(questionNumber / runLength) * 100}%`;
  document.getElementById("runXp").textContent = state.runXp;
}

function renderBossQuestion(){
  const theme = currentBossTheme();
  document.getElementById("bossSprite").innerHTML = theme.artwork;
  document.getElementById("bossSprite").dataset.course = state.currentCourse;
  document.getElementById("bossSprite").dataset.art = theme.artworkKey;
  document.getElementById("bossSprite").style.filter = `hue-rotate(${(theme.tier || 0) * 73}deg)`;
  document.getElementById("bossAvatar").setAttribute("aria-label", `${theme.name}, ${state.currentCourse} boss looming over the arena`);
  document.getElementById("bossTitle").textContent = theme.name;
  document.getElementById("bossExamDescription").textContent =
    `${state.currentCourse.toUpperCase()} • ${BOSS_EXAM_TIERS[state.bossTier].title
      ? `${BOSS_EXAM_TIERS[state.bossTier].title} • ` : ""}FULL COURSE EXAM`;
  const mcqStage = document.getElementById("bossMcqStage");
  const frqStage = document.getElementById("bossFrqStage");
  const result = document.getElementById("bossExamResult");
  const returnButton = document.getElementById("bossReturnBtn");
  mcqStage.classList.toggle("hidden", state.bossPhase !== "mcq");
  frqStage.classList.toggle("hidden", state.bossPhase !== "frq");
  result.classList.toggle("hidden", state.bossPhase !== "results");
  returnButton.classList.toggle("hidden", state.bossPhase !== "results");

  if (state.bossPhase === "mcq") {
    const q = activeQuestion();
    document.getElementById("bossQuestionTag").textContent =
      `${q.unit.toUpperCase()} • QUESTION ${state.currentQuestionIndex + 1} / ${state.currentRun.length}`;
    setAcademicText(document.getElementById("bossQuestionText"), q.text);
    renderAnswerButtons(document.getElementById("bossAnswers"), q.answers, "boss");
    document.getElementById("bossFeedback").textContent = "";
    document.getElementById("bossFeedback").className = "feedback";
    document.getElementById("bossNextBtn").textContent =
      state.currentQuestionIndex === state.currentRun.length - 1 ? "CONTINUE TO FREE RESPONSE ▶" : "NEXT QUESTION ▶";
    document.getElementById("bossNextBtn").classList.add("hidden");
    const reviewButton = document.getElementById("bossReviewBtn");
    reviewButton.classList.remove("hidden");
    reviewButton.textContent = state.reviewed.includes(q.id) ? "★ MARKED FOR REVIEW" : "☆ MARK FOR REVIEW";
    reviewButton.classList.toggle("marked", state.reviewed.includes(q.id));
  } else if (state.bossPhase === "frq") {
    document.getElementById("bossReviewBtn").classList.add("hidden");
    renderBossFrqSection();
  } else {
    const frqPoints = state.bossGrades.reduce((sum, frq) => sum + frq.earned, 0);
    const frqPossible = state.bossGrades.reduce((sum, frq) => sum + frq.possible, 0);
    renderBossExamResults(
      state.currentRun.length,
      frqPoints,
      state.currentRun.length + frqPossible,
      state.bossTimedOut
    );
  }
  updateBattleBars();
  applyAvatarLook();
}

function renderBossFrqSection(){
  const index = state.bossFrqIndex;
  const entry = state.bossFrqRun[index];
  if (!entry) {
    submitBossExam();
    return;
  }
  const frq = bossFrqForEntry(entry);
  const prompt = document.getElementById("bossFrqPrompt");
  prompt.replaceChildren();
  const heading = document.createElement("h3");
  setAcademicText(heading, `${entry.unit} • ${frq.title}`);
  const scenario = document.createElement("p");
  setAcademicText(scenario, frq.scenario);
  const subpart = document.createElement("p");
  setAcademicText(subpart, `(${entry.part.label}) ${entry.part.prompt}`);
  prompt.append(heading, scenario, subpart);
  document.getElementById("bossFrqProgress").textContent =
    `FREE RESPONSE • PART ${index + 1} / ${state.bossFrqRun.length}`;
  const response = document.getElementById("bossFrqResponse");
  const key = getFrqResponseKey(entry.course, entry.unit, frq.id, entry.part.label);
  response.value = state.bossFrqDrafts[key] || "";
  response.disabled = Boolean(state.bossGrades[index]);
  response.oninput = () => {
    state.bossFrqDrafts[key] = response.value;
    save();
  };
  const feedback = document.getElementById("bossFrqFeedback");
  const grade = state.bossGrades[index];
  const feedbackText = grade
    ? `${grade.earned ? "✓ CORRECT — BOSS DAMAGED!" : "✗ NOT QUITE — THE BOSS STRIKES!"} ${grade.missing.length ? `Key terms not detected: ${grade.missing.join(", ")}.` : "Key terms detected."} ${entry.part.rubric}`
    : "";
  setAcademicText(feedback, feedbackText);
  feedback.className = grade ? `feedback ${grade.earned ? "good" : "bad"}` : "feedback";
  const button = document.getElementById("bossSubmitBtn");
  button.disabled = false;
  button.textContent = grade
    ? index === state.bossFrqRun.length - 1 ? "FINISH EXAM ▶" : "NEXT PART ▶"
    : "SUBMIT RESPONSE ▶";
}

function gradeCurrentBossFrq(){
  if (state.bossSubmitted || state.bossPhase !== "frq") return;
  const index = state.bossFrqIndex;
  const entry = state.bossFrqRun[index];
  if (!entry) throw new Error(`Boss exam FRQ part ${index + 1} is unavailable.`);
  if (!state.bossGrades[index]) {
    const response = document.getElementById("bossFrqResponse").value;
    const grade = gradeFrqResponse(entry.part, response);
    state.bossGrades[index] = { ...grade, response };
    if (grade.earned) {
      state.bossHealth = Math.max(0, state.bossHealth - 10);
      animateHeroAttack();
    } else {
      state.energy = Math.max(0, state.energy - ENERGY_PER_QUESTION);
      animateBossAttack();
    }
    updateBattleBars();
    if (state.energy === 0) {
      submitBossExam(false, true);
      return;
    }
    save();
    renderBossQuestion();
    updateUI();
    return;
  }
  if (index === state.bossFrqRun.length - 1) {
    submitBossExam();
    return;
  }
  state.bossFrqIndex += 1;
  updateBattleBars();
  save();
  renderBossQuestion();
  updateUI();
}

function updateBattleBars(){
  const bossHealth = Math.max(0, Math.min(state.bossHealth, state.bossMaxHealth));
  const bossPercent = state.bossMaxHealth ? Math.round(bossHealth / state.bossMaxHealth * 100) : 0;
  document.getElementById("bossHpBar").style.width = `${bossPercent}%`;
  document.getElementById("bossHpMeter").setAttribute("aria-valuemax", state.bossMaxHealth);
  document.getElementById("bossHpMeter").setAttribute("aria-valuenow", bossHealth);
  document.getElementById("bossHpValue").textContent = `${bossHealth}/${state.bossMaxHealth}`;
  const playerHealth = state.energy;
  document.getElementById("playerHpMeter").setAttribute("aria-valuemax", MAX_PLAYER_HP);
  document.getElementById("playerHpMeter").setAttribute("aria-valuenow", playerHealth);
  document.getElementById("playerHpBar").style.width = `${playerHealth / MAX_PLAYER_HP * 100}%`;
  document.getElementById("playerHpValue").textContent = `${playerHealth}/${MAX_PLAYER_HP}`;
}

function bossFrqForEntry(entry){
  if (entry.frq) return entry.frq;
  const frq = frqItemsForUnit(entry.course, entry.unit).find(item => String(item.id) === String(entry.frqId));
  if (!frq) throw new Error(`Boss exam FRQ ${entry.frqId} is unavailable for ${entry.course}, ${entry.unit}.`);
  return frq;
}

function startBossTimer(){
  if (window.apArcadeBossTimer) clearInterval(window.apArcadeBossTimer);
  updateBossTimer();
  window.apArcadeBossTimer = setInterval(updateBossTimer, 1000);
}

function updateBossTimer(){
  const remaining = Math.max(0, state.bossDeadline - Date.now());
  const seconds = Math.ceil(remaining / 1000);
  document.getElementById("bossTimer").textContent =
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  if (remaining === 0 && !state.bossSubmitted) submitBossExam(true);
}

function gradeFrqResponse(part, response){
  const toTokens = value => (value.toLowerCase().match(/[a-z0-9]+(?:['’-][a-z0-9]+)*/g) || []);
  const ignored = new Set(["the", "and", "for", "with", "from", "into", "that", "this", "then",
    "when", "what", "which", "where", "would", "could", "should", "your", "their", "there",
    "because", "while", "using", "state", "find", "give", "explain", "determine", "identify",
    "describe", "compare", "evaluate", "write", "show", "use", "relate", "read", "apply",
    "value", "values", "function", "response", "expected", "response", "must", "does", "doesn",
    "have", "has", "are", "was", "were", "its", "they", "them", "then", "than", "into",
    "one", "both", "each", "also", "only", "equal", "same", "such", "some", "more", "less",
    "but", "can", "may", "will", "are", "is", "be", "of", "to", "in", "on", "at",
    "by", "as", "or", "an", "a", "it", "if", "do", "so", "up", "out", "about", "per"]);
  let expectedTokens = [...new Set(toTokens(part.solution).filter(token =>
    !ignored.has(token) && (token.length >= 3 || /\d/.test(token))
  ))];
  if (!expectedTokens.length) {
    expectedTokens = [...new Set(toTokens(part.solution).filter(token => token.length > 0))];
  }
  const responseTokens = new Set(toTokens(response));
  const matched = expectedTokens.filter(token => responseTokens.has(token));
  const ratio = expectedTokens.length ? matched.length / expectedTokens.length : 0;
  return {
    matched,
    missing: expectedTokens.filter(token => !responseTokens.has(token)),
    earned: ratio >= 0.5 ? 1 : 0,
    possible: 1
  };
}

function gradeBossFreeResponses(){
  const groups = new Map();
  state.bossFrqRun.forEach((entry, index) => {
    const frq = bossFrqForEntry(entry);
    const key = getFrqCompletionKeyFor(entry.course, entry.unit, frq.id);
    if (!groups.has(key)) groups.set(key, { ...entry, title: frq.title, parts: [] });
    const response = state.bossFrqDrafts[
      getFrqResponseKey(entry.course, entry.unit, frq.id, entry.part.label)
    ] || "";
    const grade = state.bossGrades[index] || {
      ...gradeFrqResponse(entry.part, response), response
    };
    groups.get(key).parts.push({
      label: entry.part.label,
      prompt: entry.part.prompt,
      rubric: entry.part.rubric,
      solution: entry.part.solution,
      response,
      ...grade
    });
  });
  return [...groups.values()].map(frq => ({
    ...frq,
    earned: frq.parts.reduce((sum, part) => sum + part.earned, 0),
    possible: frq.parts.length,
    complete: frq.parts.every(part => part.response.trim())
  }));
}

function renderBossExamResults(mcqTotal, frqTotal, possiblePoints, expired){
  const result = document.getElementById("bossExamResult");
  result.replaceChildren();
  const totalEarned = state.bossCorrect + frqTotal;
  const score = possiblePoints ? Math.round(totalEarned / possiblePoints * 100) : 0;
  const summary = document.createElement("p");
  summary.textContent = `${state.bossDefeated ? "DEFEAT — YOUR HP REACHED 0. THE BATTLE IS OVER." : expired ? "TIME EXPIRED" : "EXAM SUBMITTED"} — ${state.bossCorrect}/${mcqTotal} multiple-choice correct; ${frqTotal} free-response points earned. Estimated score: ${score}%.`;
  result.append(summary);
  const hpSummary = document.createElement("p");
  hpSummary.textContent = `Player HP after the exam: ${state.energy}/${MAX_PLAYER_HP}. Practice questions restore ${ENERGY_PER_QUESTION} HP each.`;
  result.append(hpSummary);

  const caveat = document.createElement("p");
  caveat.textContent = "Free-response feedback is an automatic keyword-based estimate, not an official AP score. Review the rubric and sample response for each part.";
  result.append(caveat);

  const mcqHeading = document.createElement("h3");
  mcqHeading.textContent = "MULTIPLE-CHOICE REVIEW";
  result.append(mcqHeading);
  state.bossAnswers.forEach((answer, index) => {
    const item = document.createElement("details");
    const heading = document.createElement("summary");
    setAcademicText(heading, `${answer.correct ? "✓" : "✗"} ${answer.unit} • ${index + 1}. ${answer.text}`);
    const response = document.createElement("p");
    const chosenAnswer = answer.choice === null ? "No answer" : answer.answers[answer.choice];
    setAcademicText(response, `Your answer: ${chosenAnswer}${answer.correct ? " — Correct" : ` — Correct answer: ${answer.answers[answer.correctIndex]}`}`);
    const explanation = document.createElement("p");
    setAcademicText(explanation, answer.explain);
    item.append(heading, response, explanation);
    result.append(item);
  });

  const frqHeading = document.createElement("h3");
  frqHeading.textContent = "FREE-RESPONSE REVIEW";
  result.append(frqHeading);
  state.bossGrades.forEach(frq => {
    const section = document.createElement("section");
    section.className = "boss-grade-item";
    const title = document.createElement("h4");
    setAcademicText(title, `${frq.unit} • ${frq.title} — ${frq.earned}/${frq.possible} points`);
    section.append(title);
    frq.parts.forEach(part => {
      const detail = document.createElement("details");
      const heading = document.createElement("summary");
      heading.textContent = `${part.earned ? "✓ RIGHT" : "✗ NEEDS WORK"} • Part (${part.label})`;
      const prompt = document.createElement("p");
      setAcademicText(prompt, part.prompt);
      const response = document.createElement("p");
      response.textContent = `Your response: ${part.response || "No response submitted."}`;
      const criteria = document.createElement("p");
      setAcademicText(criteria, `Scoring focus: ${part.rubric}`);
      const sample = document.createElement("p");
      setAcademicText(sample, `Sample response: ${part.solution}`);
      const keywordFeedback = document.createElement("p");
      const keywordFeedbackText = part.missing.length
        ? `Key terms not detected: ${part.missing.join(", ")}.`
        : "Key terms detected in your response.";
      setAcademicText(keywordFeedback, keywordFeedbackText);
      detail.append(heading, prompt, response, criteria, sample, keywordFeedback);
      section.append(detail);
    });
    result.append(section);
  });
}

function submitBossExam(expired = false, defeated = false){
  if (state.bossSubmitted) return;
  if (!expired && !defeated && state.bossPhase !== "frq") return;
  const recordedIndexes = new Set(state.bossAnswers.map(answer => answer.index));
  state.currentRun.forEach((runQuestion, index) => {
    if (recordedIndexes.has(index)) return;
    const question = typeof runQuestion === "object"
      ? runQuestion
      : (state.bossCourseRun || []).find(item => String(item.id) === String(runQuestion));
    if (!question) throw new Error(`Boss exam question ${runQuestion} is unavailable for grading.`);
    state.bossAnswers.push({
      id: question.id,
      index,
      course: question.course || state.currentCourse,
      unit: question.unit,
      text: question.text,
      answers: [...question.answers],
      choice: null,
      correctIndex: question.correct,
      correct: false,
      explain: question.explain
    });
  });
  state.bossAnswers.sort((a, b) => a.index - b.index);
  state.bossFrqRun.forEach((entry, index) => {
    if (state.bossGrades[index]) return;
    const response = state.bossFrqDrafts[
      getFrqResponseKey(entry.course, entry.unit, entry.frqId, entry.part.label)
    ] || "";
    if (!response.trim()) return;
    const grade = gradeFrqResponse(entry.part, response);
    state.bossGrades[index] = { ...grade, response };
    if (grade.earned) state.bossHealth = Math.max(0, state.bossHealth - 10);
  });
  state.bossSubmitted = true;
  state.bossTimedOut = expired;
  state.bossDefeated = defeated;
  if (window.apArcadeBossTimer) clearInterval(window.apArcadeBossTimer);
  state.correct += state.bossCorrect;
  state.bossGrades = gradeBossFreeResponses();
  const frqPoints = state.bossGrades.reduce((sum, frq) => sum + frq.earned, 0);
  const frqPossible = state.bossGrades.reduce((sum, frq) => sum + frq.possible, 0);
  const possiblePoints = state.currentRun.length + frqPossible;
  const score = possiblePoints ? (state.bossCorrect + frqPoints) / possiblePoints : 0;
  const completedFrqs = state.bossGrades.filter(frq => frq.complete);
  let frqXp = 0;
  completedFrqs.forEach(frq => {
    const completionKey = getFrqCompletionKeyFor(frq.course, frq.unit, frq.frqId);
    if (state.completedFrqs.includes(completionKey)) return;
    state.completedFrqs.push(completionKey);
    frqXp += 50;
  });
  if (frqXp) awardXp(frqXp);
  if (!state.bossDefeated && score >= 0.6 && state.bossGrades.every(frq => frq.complete)) {
    const originalUnit = state.currentUnit;
    (courseUnits[state.currentCourse] || []).forEach(([unit]) => {
      state.currentUnit = unit;
      completeUnit();
    });
    state.currentUnit = originalUnit;
    finishPlannerQuest();
  } else if (state.bossDefeated && state.activePlannerQuest) {
    delete state.activePlannerQuest;
    state.plannerReturnPending = true;
  }
  state.bossPhase = "results";
  updateBattleBars();
  save();
  renderBossQuestion();
  updateUI();
}

function returnFromBossExam(){
  if (window.apArcadeBossTimer) clearInterval(window.apArcadeBossTimer);
  const returnToPlanner = state.plannerReturnPending;
  state.plannerReturnPending = false;
  showPage(returnToPlanner ? "planner" : "courses");
}

function animateHeroAttack(){
  const hero = document.getElementById("battlePlayer");
  const boss = document.getElementById("bossSprite");
  const heroRect = hero.getBoundingClientRect();
  const bossRect = boss.getBoundingClientRect();
  const strikeX = bossRect.left + bossRect.width * 0.68 - (heroRect.left + heroRect.width / 2);
  const strikeY = bossRect.top + bossRect.height * 0.72 - (heroRect.top + heroRect.height * 0.38);

  hero.animate([
    { transform: "translate(0, 0) scale(1)" },
    { transform: `translate(${strikeX}px, ${strikeY}px) scale(1.06)` },
    { transform: `translate(${strikeX}px, ${strikeY}px) scale(.96)` },
    { transform: "translate(0, 0) scale(1)" }
  ], { duration: 680, easing: "steps(6, end)" });
  boss.animate([
    { transform: "translate(-50%, -50%) translateX(0px) scale(1)" },
    { transform: "translate(-50%, -50%) translateX(-10px) scale(1.025)", filter: "brightness(1.8)" },
    { transform: "translate(-50%, -50%) translateX(8px) scale(.99)", filter: "brightness(1.25)" },
    { transform: "translate(-50%, -50%) translateX(0px) scale(1)", filter: "brightness(1)" }
  ], { duration: 480, easing: "steps(5, end)" });
}

function animateBossAttack(){
  const hero = document.getElementById("battlePlayer");
  const boss = document.getElementById("bossSprite");
  hero.animate([
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(18px, 2px) rotate(5deg)" },
    { transform: "translate(-6px, 0) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" }
  ], { duration: 520, easing: "steps(5, end)" });
  boss.animate([
    { transform: "translate(-50%, -50%) translateX(0px) scale(1)" },
    { transform: "translate(-50%, -50%) translateX(16px) scale(1.035)" },
    { transform: "translate(-50%, -50%) translateX(-5px) scale(1)" },
    { transform: "translate(-50%, -50%) translateX(0px) scale(1)" }
  ], { duration: 430, easing: "steps(5, end)" });
}

function answerQuestion(choice, mode = state.mode){
  const q = activeQuestion();
  const buttons = mode === "boss"
    ? [...document.querySelectorAll("#bossAnswers .answer")]
    : [...document.querySelectorAll("#practiceAnswers .answer")];

  if (buttons.some(b => b.disabled)) return;
  buttons.forEach(b => b.disabled = true);
  state.questions += 1;
  state.answeredIds.push(q.id);
  if (mode === "practice") rechargeEnergy();

  const correct = choice === q.correct;
  if (!correct && mode !== "review") recordWrongAnswer(q, choice);

  if (mode === "boss") {
    state.bossMcqAnswered += 1;
    if (correct) state.bossCorrect += 1;
    state.bossAnswers.push({
      id: q.id,
      index: state.currentQuestionIndex,
      course: q.course || state.currentCourse,
      unit: q.unit,
      text: q.text,
      answers: [...q.answers],
      choice,
      correctIndex: q.correct,
      correct,
      explain: q.explain
    });
    if (correct) {
      state.bossHealth = Math.max(0, state.bossHealth - 20);
      awardXp(25);
      animateHeroAttack();
      buttons[choice].classList.add("correct");
      setAcademicText(document.getElementById("bossFeedback"), `✓ CORRECT! ${answerFeedback(q, choice, true)}`);
      document.getElementById("bossFeedback").className = "feedback good";
    } else {
      state.energy = Math.max(0, state.energy - ENERGY_PER_QUESTION);
      if (!state.reviewed.includes(q.id)) state.reviewed.push(q.id);
      animateBossAttack();
      buttons[choice].classList.add("wrong");
      buttons[q.correct].classList.add("correct");
      setAcademicText(document.getElementById("bossFeedback"), `✗ NOT QUITE. ${answerFeedback(q, choice, false)}`);
      document.getElementById("bossFeedback").className = "feedback bad";
    }
    updateBattleBars();
    if (state.energy === 0) {
      submitBossExam(false, true);
      return;
    }
    document.getElementById("bossNextBtn").textContent =
      state.currentQuestionIndex === state.currentRun.length - 1 ? "CONTINUE TO FREE RESPONSE ▶" : "NEXT QUESTION ▶";
    document.getElementById("bossNextBtn").classList.remove("hidden");
    save();
    updateUI();
    return;
  }

  if (correct) {
    state.correct += 1;
    if (mode !== "review") {
      awardXp(20);
      state.runXp += 20;
    }
    state.bossHealth = Math.max(0, state.bossHealth - 20);
    setAcademicText(document.getElementById("practiceFeedback"), "✓ CORRECT! " + answerFeedback(q, choice, true));
    document.getElementById("practiceFeedback").className = "feedback good";
    buttons[choice].classList.add("correct");
    if (state.bossHealth === 0 && mode !== "review") {
      awardXp(100);
      state.runXp += 100;
      document.getElementById("practiceFeedback").textContent = "★ BOSS DEFEATED! +100 BONUS XP ★";
    }
  } else {
    if (!state.reviewed.includes(q.id)) state.reviewed.push(q.id);
    setAcademicText(document.getElementById("practiceFeedback"), "✗ NOT QUITE. " + answerFeedback(q, choice, false));
    document.getElementById("practiceFeedback").className = "feedback bad";
    buttons[choice].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  const lastPracticeQuestion = state.currentQuestionIndex === state.currentRun.length - 1;
  document.getElementById("practiceNextBtn").textContent = state.mode === "review"
    ? "RETURN TO REVIEW LIST ▶"
    : lastPracticeQuestion ? "RETURN TO WORLDS ▶" : "NEXT QUESTION ▶";
  document.getElementById("practiceNextBtn").classList.remove("hidden");
  document.getElementById("practiceProgressText").textContent = `${state.currentQuestionIndex + 1} / ${state.currentRun.length}`;
  document.getElementById("practiceProgress").style.width = `${((state.currentQuestionIndex + 1) / state.currentRun.length) * 100}%`;
  document.getElementById("runXp").textContent = state.runXp;
  if (lastPracticeQuestion && mode === "practice") {
    completeUnit();
    finishPlannerQuest();
  }
  save();
  updateUI();
}

function recordWrongAnswer(question, choice){
  const answer = {
    id: question.id,
    course: question.course || state.currentCourse,
    unit: question.unitId || /^Unit \d+/.exec(question.unit || "")?.[0] || state.currentUnit,
    choice,
    answeredAt: Date.now()
  };
  state.wrongAnswers = (state.wrongAnswers || [])
    .filter(previous => String(previous.id) !== String(answer.id));
  state.wrongAnswers.push(answer);
  state.wrongAnswers = state.wrongAnswers.slice(-100);
  window.refreshCoachStatus?.();
}

function nextQuestion(){
  if (state.mode === "review") {
    state.reviewQuestionId = null;
    showPage("analytics");
    return;
  }
  if (state.currentQuestionIndex >= state.currentRun.length - 1) {
    const returnToPlanner = state.plannerReturnPending;
    state.plannerReturnPending = false;
    showPage(returnToPlanner ? "planner" : "courses");
    return;
  }
  state.currentQuestionIndex += 1;
  renderPracticeQuestion();
}

function nextBossQuestion(){
  if (state.bossPhase !== "mcq") return;
  if (state.currentQuestionIndex >= state.currentRun.length - 1) {
    state.bossPhase = "frq";
    renderBossQuestion();
    startBossTimer();
    save();
    return;
  }
  state.currentQuestionIndex += 1;
  renderBossQuestion();
  save();
}

function toggleReview(){
  const q = activeQuestion();
  if (state.reviewed.includes(q.id)) {
    state.reviewed = state.reviewed.filter(id => id !== q.id);
  } else {
    state.reviewed.push(q.id);
  }
  save();
  if (state.mode === "boss") {
    const button = document.getElementById("bossReviewBtn");
    button.textContent = state.reviewed.includes(q.id) ? "★ MARKED FOR REVIEW" : "☆ MARK FOR REVIEW";
    button.classList.toggle("marked", state.reviewed.includes(q.id));
  } else {
    const button = document.getElementById("practiceReviewBtn");
    button.textContent = state.reviewed.includes(q.id) ? "★ MARKED FOR REVIEW" : "☆ MARK FOR REVIEW";
    button.classList.toggle("marked", state.reviewed.includes(q.id));
  }
  renderAnalytics();
}

function openReviewedQuestion(id){
  const question = allQuestions().find(item => String(item.id) === String(id));
  if (!question) throw new Error(`The reviewed question ${id} is no longer available.`);
  if (courseUnits[question.course]) state.currentCourse = question.course;
  const unitId = /^Unit \d+/.exec(question.unit || "")?.[0];
  if (unitId && (courseUnits[state.currentCourse] || []).some(unit => unit[0] === unitId)) {
    state.currentUnit = unitId;
  }
  state.mode = "review";
  state.reviewQuestionId = question.id;
  state.currentQuestionIndex = 0;
  state.currentRun = [question];
  showPage("practice");
}

function awardXp(amount){
  const previousLevel = state.level;
  state.xp += amount;
  state.level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  if (state.level > previousLevel) {
    document.getElementById("newLevel").textContent = state.level;
    document.getElementById("levelUp").classList.remove("hidden");
    document.querySelector("#levelUp .eyebrow").textContent = "★ LEVEL UP ★";
    document.querySelector("#levelUp h2").textContent = "LEVEL UP!";
    document.querySelector("#levelUp p").textContent = `You reached level ${state.level}. Keep earning XP to unlock new gear!`;
  }
}

function updateUI(){
  const accuracy = state.questions ? Math.round((state.correct / state.questions) * 100) : 0;
  document.getElementById("homeQuestions").textContent = state.questions;
  document.getElementById("homeAccuracy").textContent = `${accuracy}%`;
  document.getElementById("homeStreak").textContent = `${state.streak} DAY${state.streak === 1 ? "" : "S"}`;
  document.getElementById("homeXp").textContent = state.xp;
  updateEnergyUI();
  document.getElementById("homeCourse").textContent = state.currentCourse;
  document.getElementById("homeUnit").textContent = `${state.currentUnit.toUpperCase()} MINI BOSS`;
  document.getElementById("navLevel").textContent = `LVL ${state.level}`;
  document.getElementById("navXp").style.width = `${(state.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%`;
  document.getElementById("navProfileName").textContent = state.profile.name || "PLAYER_001";
  document.getElementById("homeWelcomeName").textContent = state.profile.name || "PLAYER_001";
  renderProfile();
}

function unitKey(){
  return `${state.currentCourse}::${state.currentUnit}`;
}

function completeUnit(){
  const key = unitKey();
  if (state.completedUnits.includes(key)) return;
  state.completedUnits.push(key);
  awardXp(100);
  document.getElementById("newLevel").textContent = state.level;
  document.getElementById("levelUp").classList.remove("hidden");
  document.querySelector("#levelUp .eyebrow").textContent = "★ UNIT CLEARED ★";
  document.querySelector("#levelUp h2").textContent = "UNIT CLEARED!";
  document.querySelector("#levelUp p").textContent =
    `${state.currentCourse} ${state.currentUnit} cleared. +100 XP awarded. Current level: ${state.level}.`;
  save();
}

function openProfile(){
  document.getElementById("profileModal").classList.remove("hidden");
  renderProfile();
}

function closeProfile(){
  document.getElementById("profileModal").classList.add("hidden");
}

function setProfileName(value){
  state.profile.name = value.trim().slice(0, 18) || "PLAYER_001";
  save();
  document.getElementById("navProfileName").textContent = state.profile.name;
  document.getElementById("homeWelcomeName").textContent = state.profile.name;
}

function chooseClass(characterClass){
  state.profile.class = characterClass;
  save();
  renderProfile();
}

function equipCosmetic(type, id){
  const options = type === "outfit" ? outfitOptions : weaponOptions;
  const item = options.find(option => option.id === id);
  if (!item || state.level < item.unlockLevel) return;
  state.profile[type] = id;
  save();
  renderProfile();
}

function renderProfile(){
  const modal = document.getElementById("profileModal");
  if (!modal) return;
  const outfit = outfitOptions.find(item => item.id === state.profile.outfit) || outfitOptions[0];
  const weapon = weaponOptions.find(item => item.id === state.profile.weapon) || weaponOptions[0];
  const className = state.profile.class || "Scholar";
  const outfitSelect = document.getElementById("outfitSelect");
  const weaponSelect = document.getElementById("weaponSelect");
  const optionMarkup = options => options.map(item => {
    const locked = state.level < item.unlockLevel;
    return `<option value="${item.id}" ${locked ? "disabled" : ""}>${item.name}${locked ? ` · LV ${item.unlockLevel}` : ""}</option>`;
  }).join("");

  document.getElementById("profileClassLabel").textContent = className.toUpperCase();
  document.getElementById("profileNameInput").value = state.profile.name || "PLAYER_001";
  document.getElementById("profileLevel").textContent = state.level;
  document.getElementById("profileXpLabel").textContent = `${state.xp} XP • ${XP_PER_LEVEL - (state.xp % XP_PER_LEVEL)} XP TO NEXT LEVEL`;
  document.getElementById("completedUnitCount").textContent = `${state.completedUnits.length} UNIT${state.completedUnits.length === 1 ? "" : "S"} CLEARED`;
  document.getElementById("profileXpBar").style.width = `${(state.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%`;
  document.getElementById("profileAvatarStage").style.setProperty("--outfit-color", outfit.color);
  document.getElementById("profileAvatarStage").dataset.class = className.toLowerCase();
  document.getElementById("navAvatar").style.setProperty("--outfit-color", outfit.color);
  document.getElementById("navAvatar").dataset.class = className.toLowerCase();
  outfitSelect.innerHTML = optionMarkup(outfitOptions);
  weaponSelect.innerHTML = optionMarkup(weaponOptions);
  outfitSelect.value = outfit.id;
  weaponSelect.value = weapon.id;
  document.querySelectorAll(".choice-tile").forEach(button => {
    button.classList.toggle("selected", button.dataset.class === className);
  });
  const nextUnlock = [...outfitOptions, ...weaponOptions]
    .filter(item => item.unlockLevel > state.level)
    .sort((a, b) => a.unlockLevel - b.unlockLevel)[0];
  document.getElementById("cosmeticHint").textContent = nextUnlock
    ? `Next drop at level ${nextUnlock.unlockLevel}: ${nextUnlock.name}`
    : "Wardrobe complete. Looking legendary.";
  applyAvatarLook();
}

function applyAvatarLook(){
  const outfit = outfitOptions.find(item => item.id === state.profile.outfit) || outfitOptions[0];
  const weapon = weaponOptions.find(item => item.id === state.profile.weapon) || weaponOptions[0];
  ["battlePlayer", "profileHeroSprite"].forEach(id => {
    const avatar = document.getElementById(id);
    avatar.dataset.class = (state.profile.class || "Scholar").toLowerCase();
    avatar.dataset.weapon = weapon.id;
    avatar.style.setProperty("--outfit-color", outfit.color);
  });
  window.refreshSandboxPlayerSprite?.();
}

function renderAnalytics(){
  const accuracy = state.questions ? Math.round((state.correct / state.questions) * 100) : 0;
  document.getElementById("aQuestions").textContent = state.questions;
  document.getElementById("aCorrect").textContent = state.correct;
  document.getElementById("aAccuracy").textContent = `${accuracy}%`;
  document.getElementById("aStreak").textContent = state.streak;
  const units = courseUnits[state.currentCourse] || [];
  document.getElementById("mastery").innerHTML = units.map(([unit]) => {
    const progress = getUnitPracticeProgress(state.currentCourse, unit);
    return `
      <div class="mastery-row">
        <label>${unit}</label>
        <div class="mastery-bar" role="meter" aria-label="${unit} practice completion" aria-valuemin="0" aria-valuemax="${progress.total}" aria-valuenow="${progress.completed}" aria-valuetext="${progress.completed} of ${progress.total} problems completed (${progress.percent}%)">
          <div style="width:${progress.percent}%"></div>
        </div>
        <span>${progress.percent}% (${progress.completed}/${progress.total})</span>
      </div>`;
  }).join("");
  const list = document.getElementById("reviewList");
  list.replaceChildren();
  if (!state.reviewed.length) {
    const empty = document.createElement("p");
    empty.textContent = "No questions marked yet. Missed questions will automatically appear here.";
    list.append(empty);
    return;
  }
  state.reviewed.forEach(id => {
    const question = allQuestions().find(item => String(item.id) === String(id));
    if (!question) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "review-item";
    const prompt = document.createElement("span");
    setAcademicText(prompt, `${question.unit}: ${question.text}`);
    const action = document.createElement("span");
    action.className = "wrong-text";
    action.textContent = "REVIEW ▶";
    button.append(prompt, action);
    button.addEventListener("click", () => openReviewedQuestion(question.id));
    list.append(button);
  });
}

function getUnitPracticeProgress(course, unit){
  const questions = getQuestionPool(course, unit);
  const answeredIds = new Set((state.answeredIds || []).map(id => String(id)));
  const completedMcqs = questions.filter(question => answeredIds.has(String(question.id))).length;
  const completedFrqs = new Set(state.completedFrqs || []);
  const frqs = frqItemsForUnit(course, unit);
  const completedFrqCount = frqs.filter(frq =>
    completedFrqs.has(getFrqCompletionKeyFor(course, unit, frq.id))
  ).length;
  const total = questions.length + frqs.length;
  const completed = completedMcqs + completedFrqCount;
  return {
    completed,
    total,
    percent: total ? Math.round(completed / total * 100) : 0
  };
}

function updatePlannerPreference(key, value){
  if (key === "focusCourse" && courseUnits[value]) {
    state.plannerPrefs.focusCourse = value;
    state.plannerPrefs.targetUnit = "auto";
  } else if (key === "targetUnit" && (value === "auto"
      || (courseUnits[state.plannerPrefs.focusCourse] || []).some(unit => unit[0] === value))) {
    state.plannerPrefs.targetUnit = value;
  }
  save();
  renderPlanner();
}

function togglePlannerDay(day, enabled){
  const days = new Set(state.plannerPrefs.studyDays);
  if (enabled) days.add(day);
  else days.delete(day);
  if (!days.size) {
    renderPlanner();
    return;
  }
  state.plannerPrefs.studyDays = [...days].sort((a, b) => a - b);
  save();
  renderPlanner();
}

function getPlannerUnitProgress(course){
  const reviewedIds = new Set(state.reviewed);
  return (courseUnits[course] || []).map((unit, index) => {
    const questionIds = new Set(getQuestionPool(course, unit[0]).map(question => question.id));
    const reviewCount = [...reviewedIds].filter(id => questionIds.has(id)).length;
    return {
      unit: unit[0],
      title: unit[1],
      index,
      reviewCount,
      completed: state.completedUnits.includes(`${course}::${unit[0]}`)
    };
  });
}

function plannerTargetUnit(units){
  const preferred = state.plannerPrefs.targetUnit;
  if (preferred !== "auto") return units.find(unit => unit.unit === preferred) || units[0];
  const unitsWithMisses = units.filter(unit => unit.reviewCount > 0);
  if (unitsWithMisses.length) {
    return unitsWithMisses.sort((a, b) => b.reviewCount - a.reviewCount || a.index - b.index)[0];
  }
  return units.find(unit => !unit.completed) || units[0];
}

function getPlannerExam(course){
  const date = parseExamDate(state.examDates[course]);
  if (!date || date.getTime() <= Date.now()) return null;
  return { date, days: Math.ceil((date.getTime() - Date.now()) / 86400000) };
}

function createPlannerQuest(kind, course, target, exam){
  const unitName = `${target.unit} · ${target.title}`;
  if (kind === "review") {
    return {
      kind, icon: "📖", title: "Mistake review", detail: `Revisit ${target.reviewCount} missed ${target.reviewCount === 1 ? "question" : "questions"} in ${unitName}.`,
      reason: "Your saved review list is shaping this session.", action: "OPEN REVIEW ▶"
    };
  }
  if (kind === "frq") {
    return {
      kind, icon: "✍️", title: "Explain it in an FRQ", detail: `Build written-response skill with a prompt from ${unitName}.`,
      reason: "A change of format helps you practice applying the same ideas.", action: "START FRQ ▶"
    };
  }
  if (kind === "boss") {
    return {
      kind, icon: "👑", title: "Unit boss battle", detail: `Take on a full challenge for ${unitName}.`,
      reason: exam && exam.days <= 21
        ? `Your ${course} exam is in ${exam.days} days—use this as an exam-readiness check.`
        : "Use a challenge run to check how well this unit is sticking.",
      action: "ENTER BATTLE ▶"
    };
  }
  const detail = `Run up to 30 multiple-choice questions for ${unitName}.`;
  return {
    kind: "practice", icon: "🎯", title: "Targeted practice", detail,
    reason: target.reviewCount
      ? `This unit has the most questions saved for review (${target.reviewCount}).`
      : target.completed ? "Core units are cleared; keep this one sharp." : "This is your next uncleared unit.",
    action: "START PRACTICE ▶"
  };
}

function startPlannerQuest(quest){
  if (quest.kind === "boss" && state.energy <= 0) {
    window.alert("Your HP is depleted. Complete practice questions to restore HP before entering another boss battle.");
    return;
  }
  state.currentCourse = quest.course;
  state.currentUnit = quest.unit;
  state.activePlannerQuest = { date: quest.date, kind: quest.kind };
  save();
  if (quest.kind === "review") {
    showPage("analytics");
    document.getElementById("reviewList").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (quest.kind === "frq") {
    state.mode = "frq";
    state.reviewQuestionId = null;
    state.currentFrqIndex = 0;
    state.currentFrqPartIndex = 0;
    showPage("frq");
    return;
  }
  if (quest.kind === "boss") {
    startBossBattle();
    return;
  }
  state.mode = "practice";
  state.reviewQuestionId = null;
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.bossHealth = 160;
  state.currentRun = createQuestionRun();
  showPage("practice");
}

function renderPlanner(){
  const courseSelect = document.getElementById("plannerCourse");
  const unitSelect = document.getElementById("plannerUnit");
  const dayChoices = document.getElementById("plannerDayChoices");
  const grid = document.getElementById("plannerGrid");
  if (!courseSelect || !unitSelect || !dayChoices || !grid) return;
  courseSelect.replaceChildren(...Object.keys(courseUnits).map(course => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    return option;
  }));
  courseSelect.value = state.plannerPrefs.focusCourse;
  const course = state.plannerPrefs.focusCourse;
  const coachCourse = document.getElementById("coachCourse");
  if (coachCourse && [...coachCourse.options].some(option => option.value === course)) {
    coachCourse.value = course;
    window.refreshCoachStatus?.();
  }
  unitSelect.replaceChildren();
  const autoOption = document.createElement("option");
  autoOption.value = "auto";
  autoOption.textContent = "Adaptive · choose my next unit";
  unitSelect.append(autoOption);
  (courseUnits[course] || []).forEach(unit => {
    const option = document.createElement("option");
    option.value = unit[0];
    option.textContent = `${unit[0]} · ${unit[1]}`;
    unitSelect.append(option);
  });
  unitSelect.value = state.plannerPrefs.targetUnit;
  dayChoices.replaceChildren();
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((label, day) => {
    const choice = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.plannerPrefs.studyDays.includes(day);
    checkbox.addEventListener("change", () => togglePlannerDay(day, checkbox.checked));
    choice.append(checkbox, document.createTextNode(label));
    dayChoices.append(choice);
  });
  const units = getPlannerUnitProgress(course);
  const target = plannerTargetUnit(units);
  const exam = getPlannerExam(course);
  const sessions = state.plannerPrefs.studyDays;
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const selectedDays = new Set(sessions);
  const sequence = exam && exam.days <= 21
  ? ["practice", "boss", "boss", "frq", "practice", "practice", "boss"]
  : ["practice", "frq", "practice", "boss", "frq", "practice", "boss"];
  const summary = document.getElementById("plannerSummary");
  summary.textContent = exam
    ? `${course} focus · ${sessions.length} sessions · exam in ${exam.days} days · ${state.plannerPrefs.targetUnit === "auto" ? "adaptive unit" : target.unit}: ${target.title}`
    : `${course} focus · ${sessions.length} sessions · ${state.plannerPrefs.targetUnit === "auto" ? "adaptive unit" : target.unit}: ${target.title}`;

  grid.replaceChildren();
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayIndex);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const scheduled = selectedDays.has(date.getDay());
    let quest = null;
    let done = false;
    if (scheduled) {
      const orderedUnits = [...units].sort((a, b) =>
        b.reviewCount - a.reviewCount || Number(a.completed) - Number(b.completed) || a.index - b.index
      );
      const dayTarget = state.plannerPrefs.targetUnit === "auto"
        ? orderedUnits[[...selectedDays].indexOf(date.getDay()) % orderedUnits.length]
        : target;
      const kind = sequence[[...selectedDays].indexOf(date.getDay())];
      quest = createPlannerQuest(kind, course, dayTarget, exam);
      quest.course = course;
      quest.unit = dayTarget.unit;
      quest.date = `${dateKey}::${course}::${dayTarget.unit}::${kind}`;
      done = Boolean(state.plannerCompleted[quest.date]);
    }
    const card = document.createElement("article");
    card.className = `day-card${scheduled ? " has-quest" : " recovery-day"}${done ? " completed" : ""}`;
    const dateLabel = document.createElement("small");
    dateLabel.textContent = `${dayIndex === 0 ? "TODAY · " : dayIndex === 1 ? "TOMORROW · " : ""}${weekdays[date.getDay()]} · ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
    card.append(dateLabel);
    if (scheduled) {
      const title = document.createElement("h3");
      title.textContent = `${quest.icon} ${quest.title}`;
      const detail = document.createElement("p");
      detail.textContent = quest.detail;
      const reason = document.createElement("p");
      reason.className = "planner-reason";
      reason.textContent = quest.reason;
      const action = document.createElement("button");
      action.type = "button";
      action.className = "pixel-btn primary";
      action.textContent = done ? "✓ SESSION COMPLETE" : quest.action;
      action.disabled = done;
      action.addEventListener("click", () => startPlannerQuest(quest));
      card.append(title, detail, reason, action);
    } else {
      const title = document.createElement("h3");
      title.textContent = "🌿 Recovery day";
      const detail = document.createElement("p");
      detail.textContent = "No quest scheduled. Rest days are part of a sustainable study rhythm.";
      card.append(title, detail);
    }
    grid.append(card);
  }
}

function finishPlannerQuest(){
  const active = state.activePlannerQuest;
  if (!active) return;
  state.plannerCompleted[active.date] = true;
  delete state.activePlannerQuest;
  state.plannerReturnPending = true;
  save();
}

function closeModal(){
  document.getElementById("levelUp").classList.add("hidden");
}

function renderExamCountdowns(){
  const container = document.getElementById("examCountdowns");
  container.replaceChildren();
  Object.keys(courseUnits).forEach(course => {
    const card = document.createElement("section");
    card.className = "exam-countdown-card";
    const label = document.createElement("label");
    label.textContent = course;
    const input = document.createElement("input");
    input.type = "datetime-local";
    const savedDate = state.examDates[course] || "";
    input.value = /^\d{4}-\d{2}-\d{2}$/.test(savedDate) ? `${savedDate}T08:00` : savedDate;
    input.setAttribute("aria-label", `${course} exam date and time`);
    input.addEventListener("input", () => {
      state.examDates[course] = input.value;
      save();
      updateCountdown();
    });
    const countdown = document.createElement("strong");
    countdown.className = "exam-countdown-value";
    countdown.dataset.course = course;
    card.append(label, input, countdown);
    container.append(card);
  });
}

function parseExamDate(dateValue){
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(dateValue || "");
  if (!match) return null;
  const [, yearText, monthText, dayText, hourText, minuteText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = hourText === undefined ? 8 : Number(hourText);
  const minute = minuteText === undefined ? 0 : Number(minuteText);
  const date = new Date(year, month - 1, day, hour, minute);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day
      || date.getHours() !== hour || date.getMinutes() !== minute) return null;
  return date;
}

function formatTimeRemaining(milliseconds){
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor(seconds / 60) % 60;
  const remainingSeconds = seconds % 60;
  return `${days} DAY${days === 1 ? "" : "S"} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateCountdown(){
  const now = new Date();
  const exams = Object.keys(courseUnits)
    .map(course => ({ course, date: parseExamDate(state.examDates[course]) }))
    .filter(exam => exam.date !== null)
    .map(exam => ({ ...exam, remaining: exam.date.getTime() - now.getTime() }));
  document.querySelectorAll(".exam-countdown-value").forEach(element => {
    const exam = exams.find(item => item.course === element.dataset.course);
    if (!exam) {
      element.textContent = "SET EXAM DATE";
    } else if (exam.remaining <= 0) {
      element.textContent = "EXAM PASSED";
    } else {
      element.textContent = formatTimeRemaining(exam.remaining);
    }
  });

  const nextExam = exams
    .filter(exam => exam.remaining > 0)
    .sort((a, b) => a.remaining - b.remaining)[0];
  if (!exams.length) {
    document.getElementById("countdown").textContent = "ADD YOUR EXAM DATES";
    document.getElementById("nextExamLabel").textContent = "Set a date for each course below.";
  } else if (nextExam) {
    document.getElementById("countdown").textContent = formatTimeRemaining(nextExam.remaining);
    document.getElementById("nextExamLabel").textContent = `Next up: ${nextExam.course}`;
  } else {
    document.getElementById("countdown").textContent = "ALL EXAMS PASSED";
    document.getElementById("nextExamLabel").textContent = "Update any date below to start a new countdown.";
  }
}

window.APArcadeStudyData = {
  courses: () => Object.keys(courseUnits),
  wrongQuestionCount(course){
    return (state.wrongAnswers || []).filter(answer => answer.course === course).length;
  },
  getCoachMistakes(course, limit = 8){
    const questionsById = new Map(allQuestions().map(question => [String(question.id), question]));
    return (state.wrongAnswers || [])
      .filter(answer => answer.course === course)
      .slice(-Math.max(1, Math.min(8, limit)))
      .reverse()
      .flatMap(answer => {
        const question = questionsById.get(String(answer.id));
        if (!question) return [];
        return [{
          course,
          unit: question.unit || answer.unit,
          question: question.text,
          choices: [...question.answers],
          chosenAnswer: question.answers[answer.choice] || "No answer recorded",
          correctAnswer: question.answers[question.correct],
          explanation: question.explain
        }];
      });
  },
  getPracticeQuestion(course){
    const pool = getCourseQuestionPool(course);
    return randomizeQuestionChoices(pool[Math.floor(Math.random() * pool.length)], true);
  },
  recordPracticeAnswer(question, choice){
    state.questions += 1;
    state.answeredIds.push(question.id);
    const correct = choice === question.correct;
    if (correct) {
      state.correct += 1;
      awardXp(8);
    } else {
      recordWrongAnswer(question, choice);
      if (!state.reviewed.includes(question.id)) state.reviewed.push(question.id);
    }
    save();
    updateUI();
    return {
      correct,
      correctAnswer: question.answers[question.correct],
      explanation: question.explain
    };
  }
};

renderExamCountdowns();
updateUI();
updateCountdown();
setInterval(updateCountdown, 1000);
