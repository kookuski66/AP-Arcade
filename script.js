const AP_EXAM_DATE = new Date("2027-05-11T08:00:00");
const QUESTIONS_PER_RUN = 15;
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
  ]
};

const questions = [
  {id:1, course:"AP Physics 1", unit:"Unit 1", text:"A car moves with constant velocity. Which statement must be true?", answers:["Its acceleration is zero.","Its net force is increasing.","Its speed is increasing.","Its displacement is zero."], correct:0, explain:"Constant velocity means both speed and direction stay constant, so acceleration is zero."},
  {id:2, course:"AP Physics 1", unit:"Unit 1", text:"A 2 kg object experiences a net force of 10 N. What is its acceleration?", answers:["0.2 m/s²","5 m/s²","12 m/s²","20 m/s²"], correct:1, explain:"Newton's second law gives a = F/m = 10/2 = 5 m/s²."},
  {id:3, course:"AP Physics 1", unit:"Unit 2", text:"If the net force on an object is zero, which could be true?", answers:["The object is accelerating.","The object is moving at constant velocity.","The object must be at rest.","The object's mass is zero."], correct:1, explain:"Zero net force means zero acceleration. The object can be at rest or move with constant velocity."},
  {id:4, course:"AP Physics 1", unit:"Unit 3", text:"Which quantity is a vector?", answers:["Mass","Temperature","Displacement","Energy"], correct:2, explain:"Displacement has both magnitude and direction, making it a vector."},
  {id:5, course:"AP Physics 1", unit:"Unit 4", text:"A ball is thrown upward. Ignoring air resistance, what is its acceleration at the highest point?", answers:["Zero","9.8 m/s² downward","9.8 m/s² upward","It depends on its mass"], correct:1, explain:"Gravity acts throughout the motion, including at the highest point."}
];

const unitQuestionBank = {
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
    ["Unit 1","Kinematics","Motion, position, velocity and acceleration.",10,72],
    ["Unit 2","Dynamics","Forces, Newton's laws and free-body diagrams.",18,45],
    ["Unit 3","Circular Motion & Gravitation","Uniform circular motion and gravitational interactions.",8,35],
    ["Unit 4","Energy","Work, energy, conservation and power.",18,30],
    ["Unit 5","Momentum","Impulse, momentum and collisions.",12,20],
    ["Unit 6","Simple Harmonic Motion","Oscillations and simple harmonic motion.",5,15]
  ],
  "AP Chemistry":[
    ["Unit 1","Atomic Structure & Properties","Atoms, isotopes, mass and electron structure.",7,0],
    ["Unit 2","Molecular & Ionic Compound Structure","Chemical bonding and molecular structure.",7,0],
    ["Unit 3","Intermolecular Forces & Properties","Interactions, gases, solutions and properties.",18,0],
    ["Unit 4","Chemical Reactions","Equations, reactions and stoichiometry.",7,0],
    ["Unit 5","Kinetics","Reaction rates and mechanisms.",7,0],
    ["Unit 6","Thermodynamics","Energy, enthalpy and calorimetry.",7,0]
  ],
  "AP Calculus AB":[
    ["Unit 1","Limits & Continuity","Limits, continuity and estimating behavior.",10,0],
    ["Unit 2","Differentiation","Definition and fundamental rules of derivatives.",10,0],
    ["Unit 3","Composite, Implicit & Inverse Functions","Advanced differentiation techniques.",15,0],
    ["Unit 4","Contextual Applications of Differentiation","Motion, rates and optimization.",15,0],
    ["Unit 5","Analytical Applications of Differentiation","Graphing and behavior using derivatives.",15,0],
    ["Unit 6","Integration & Accumulation","Antiderivatives and definite integrals.",17,0]
  ],
  "AP Biology":[
    ["Unit 1","Chemistry of Life","Water, macromolecules and molecular structure.",8,0],
    ["Unit 2","Cell Structure & Function","Organelles, membranes and cell communication.",10,0],
    ["Unit 3","Cellular Energetics","Photosynthesis and cellular respiration.",10,0],
    ["Unit 4","Cell Communication & Cell Cycle","Signals, feedback and cell division.",10,0],
    ["Unit 5","Heredity","Mitosis, meiosis and inheritance.",8,0],
    ["Unit 6","Gene Expression & Regulation","DNA, RNA, protein synthesis and regulation.",12,0]
  ]
};

let state = {
  questions: 0, correct: 0, xp: 0, level: 1, streak: 1,
  reviewed: [], answeredIds: [], currentCourse: "AP Physics 1",
  currentUnit: "Unit 1", currentQuestionIndex: 0, runXp: 0,
  bossHealth: 160, playerHealth: 100, mode: "practice", currentReview: false,
  mastery: {}, completedUnits: [], currentRun: [],
  profile: { name: "PLAYER_001", class: "Scholar", outfit: "rookie", weapon: "sword" }
};

function save(){ localStorage.setItem("apStemQuestState", JSON.stringify(state)); }
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

function getQuestionPool(course = state.currentCourse, unit = state.currentUnit) {
  const coursePool = unitQuestionBank[course] || {};
  const pool = coursePool[unit] || Object.values(coursePool)[0] || questions;
  return pool;
}

function allQuestions(){
  return [...questions, ...Object.values(unitQuestionBank).flatMap(course => Object.values(course).flat())];
}

function createQuestionRun(){
  const pool = getQuestionPool();
  const run = [];
  while (run.length < QUESTIONS_PER_RUN) {
    const deck = [...pool];
    for (let index = deck.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
    }
    if (run.length && deck.length > 1 && deck[0].id === run[run.length - 1].id) {
      [deck[0], deck[1]] = [deck[1], deck[0]];
    }
    run.push(...deck.slice(0, QUESTIONS_PER_RUN - run.length));
  }
  return run.map((question, index) => ({ ...question, runId: `${question.id}-${Date.now()}-${index}` }));
}

function activeQuestion(){
  if (!Array.isArray(state.currentRun) || state.currentRun.length !== QUESTIONS_PER_RUN) {
    state.currentRun = createQuestionRun();
    state.currentQuestionIndex = 0;
  }
  return state.currentRun[state.currentQuestionIndex];
}

function currentBossTheme(){
  const theme = bossThemes[state.currentCourse] || bossThemes["AP Physics 1"];
  const units = courseUnits[state.currentCourse] || [];
  const unitIndex = Math.max(0, units.findIndex(unit => unit[0] === state.currentUnit));
  const [name, artworkKey] = theme[unitIndex % theme.length];
  return { name, artworkKey, artwork: bossArtwork[artworkKey] };
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");
  window.scrollTo(0, 0);
  if (id === "analytics") renderAnalytics();
  if (id === "practice") renderPracticeQuestion();
  if (id === "boss") renderBossQuestion();
  updateUI();
}

function selectCourse(course){
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
      <button class="pixel-btn" style="margin-top:15px" onclick="startUnit(${i})">ENTER UNIT ▶</button>
    </div>`).join("");
  document.getElementById("courseDetail").classList.remove("hidden");
  showPage("courses");
  setTimeout(() => document.getElementById("courseDetail").scrollIntoView({ behavior: "smooth" }), 50);
}

function startPractice(){
  state.mode = "practice";
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.currentRun = createQuestionRun();
  showPage("practice");
}

function startUnit(index){
  const units = courseUnits[state.currentCourse] || [];
  const selected = units[index] || units[0] || ["Unit 1"];
  state.currentUnit = selected[0];
  state.mode = "practice";
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.currentRun = createQuestionRun();
  showPage("practice");
  renderPracticeQuestion();
}

function startBossBattle(){
  state.mode = "boss";
  state.currentQuestionIndex = 0;
  state.runXp = 0;
  state.bossHealth = 160;
  state.playerHealth = 100;
  state.currentRun = createQuestionRun();
  showPage("boss");
  renderBossQuestion();
}

function renderPracticeQuestion(){
  const q = activeQuestion();
  const questionNumber = state.currentQuestionIndex + 1;
  document.getElementById("practiceQuestionTag").textContent = `${q.unit.toUpperCase()} • MULTIPLE CHOICE`;
  document.getElementById("practiceQuestionText").textContent = q.text;
  document.getElementById("practiceAnswers").innerHTML = q.answers.map((a, i) => `<button class="answer" onclick="answerQuestion(${i}, 'practice')">${String.fromCharCode(65 + i)}. ${a}</button>`).join("");
  document.getElementById("practiceFeedback").textContent = "";
  document.getElementById("practiceFeedback").className = "feedback";
  document.getElementById("practiceNextBtn").classList.add("hidden");
  state.currentReview = state.reviewed.includes(q.id);
  const reviewBtn = document.getElementById("practiceReviewBtn");
  reviewBtn.textContent = state.currentReview ? "★ MARKED FOR REVIEW" : "☆ MARK FOR REVIEW";
  reviewBtn.classList.toggle("marked", state.currentReview);
  document.getElementById("practiceCourseLabel").textContent = `${state.currentCourse} • ${state.currentUnit}`;
  document.getElementById("questionNumber").textContent = `${questionNumber} / ${QUESTIONS_PER_RUN}`;
  document.getElementById("practiceProgressText").textContent = `${questionNumber} / ${QUESTIONS_PER_RUN}`;
  document.getElementById("practiceProgress").style.width = `${(questionNumber / QUESTIONS_PER_RUN) * 100}%`;
  document.getElementById("runXp").textContent = state.runXp;
  document.getElementById("practiceEnergy").style.width = `${Math.max(25, 100 - (state.questions % 8) * 8)}%`;
}

function renderBossQuestion(){
  const q = activeQuestion();
  const theme = currentBossTheme();
  document.getElementById("bossQuestionTag").textContent = `${q.unit.toUpperCase()} • BOSS CHALLENGE`;
  document.getElementById("bossSprite").innerHTML = theme.artwork;
  document.getElementById("bossSprite").dataset.course = state.currentCourse;
  document.getElementById("bossSprite").dataset.art = theme.artworkKey;
  document.getElementById("bossAvatar").setAttribute("aria-label", `${theme.name}, ${state.currentCourse} boss looming over the arena`);
  document.getElementById("bossTitle").textContent = theme.name;
  document.getElementById("bossQuestionText").textContent = q.text;
  document.getElementById("bossAnswers").innerHTML = q.answers.map((a, i) => `<button class="answer" onclick="answerQuestion(${i}, 'boss')">${String.fromCharCode(65 + i)}. ${a}</button>`).join("");
  document.getElementById("bossFeedback").textContent = "";
  document.getElementById("bossFeedback").className = "feedback";
  document.getElementById("bossNextBtn").classList.add("hidden");
  updateBattleBars();
  applyAvatarLook();
}

function updateBattleBars(){
  const bossFill = document.getElementById("bossHpBar");
  const playerFill = document.getElementById("playerHpBar");
  bossFill.style.width = `${Math.max(0, state.bossHealth) / 160 * 100}%`;
  playerFill.style.width = `${Math.max(0, state.playerHealth)}%`;
  document.getElementById("bossHpMeter").setAttribute("aria-valuenow", state.bossHealth);
  document.getElementById("playerHpMeter").setAttribute("aria-valuenow", state.playerHealth);
  document.getElementById("bossHpValue").textContent = `${state.bossHealth}/160`;
  document.getElementById("playerHpValue").textContent = `${state.playerHealth}/100`;
  document.getElementById("bossFightLabel").textContent = `${state.bossHealth}/160`;
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

  const correct = choice === q.correct;

  if (mode === "boss") {
    if (correct) {
      state.correct += 1;
      state.xp += 25;
      state.runXp += 25;
      state.bossHealth = Math.max(0, state.bossHealth - 20);
      animateHeroAttack();
      document.getElementById("bossFeedback").textContent = `✓ CRITICAL HIT! ${q.explain}`;
      document.getElementById("bossFeedback").className = "feedback good";
      buttons[choice].classList.add("correct");
      updateBattleBars();

      if (state.bossHealth <= 0) {
        state.xp += 100;
        state.runXp += 100;
        document.getElementById("bossFeedback").textContent = "★ BOSS DEFEATED! +100 BONUS XP ★";
        completeUnit();
      }
    } else {
      if (!state.reviewed.includes(q.id)) state.reviewed.push(q.id);
      state.playerHealth = Math.max(0, state.playerHealth - 15);
      animateBossAttack();
      document.getElementById("bossFeedback").textContent = `✗ THE BOSS STRIKES! ${q.explain}`;
      document.getElementById("bossFeedback").className = "feedback bad";
      buttons[choice].classList.add("wrong");
      buttons[q.correct].classList.add("correct");
      updateBattleBars();

      if (state.playerHealth <= 0) {
        document.getElementById("bossFeedback").textContent = "☠ YOU WERE DEFEATED. THE BOSS WINS THIS ROUND.";
      }
    }

    const lastBossQuestion = state.currentQuestionIndex === QUESTIONS_PER_RUN - 1;
    if (lastBossQuestion && state.bossHealth > 0 && state.playerHealth > 0) {
      document.getElementById("bossFeedback").textContent = "THE BOSS ESCAPED THIS ROUND. Clear the unit in the Practice Arena to earn its level.";
    }
    document.getElementById("bossNextBtn").textContent = state.playerHealth <= 0 ? "RETREAT" : state.bossHealth <= 0 ? "CLAIM VICTORY" : lastBossQuestion ? "END BATTLE" : "NEXT ATTACK ▶";
    document.getElementById("bossNextBtn").classList.remove("hidden");
    save();
    updateUI();
    return;
  }

  if (correct) {
    state.correct += 1;
    state.xp += 20;
    state.runXp += 20;
    state.bossHealth = Math.max(0, state.bossHealth - 20);
    document.getElementById("practiceFeedback").textContent = "✓ CORRECT! " + q.explain;
    document.getElementById("practiceFeedback").className = "feedback good";
    buttons[choice].classList.add("correct");
    if (state.bossHealth === 0) {
      state.xp += 100;
      state.runXp += 100;
      document.getElementById("practiceFeedback").textContent = "★ BOSS DEFEATED! +100 BONUS XP ★";
    }
  } else {
    if (!state.reviewed.includes(q.id)) state.reviewed.push(q.id);
    document.getElementById("practiceFeedback").textContent = "✗ NOT QUITE. " + q.explain;
    document.getElementById("practiceFeedback").className = "feedback bad";
    buttons[choice].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  const lastPracticeQuestion = state.currentQuestionIndex === QUESTIONS_PER_RUN - 1;
  document.getElementById("practiceNextBtn").textContent = lastPracticeQuestion ? "RETURN TO WORLDS ▶" : "NEXT QUESTION ▶";
  document.getElementById("practiceNextBtn").classList.remove("hidden");
  document.getElementById("practiceProgressText").textContent = `${state.currentQuestionIndex + 1} / ${QUESTIONS_PER_RUN}`;
  document.getElementById("practiceProgress").style.width = `${((state.currentQuestionIndex + 1) / QUESTIONS_PER_RUN) * 100}%`;
  document.getElementById("runXp").textContent = state.runXp;
  if (lastPracticeQuestion) completeUnit();
  save();
  updateUI();
}

function nextQuestion(){
  if (state.currentQuestionIndex >= QUESTIONS_PER_RUN - 1) {
    showPage("courses");
    return;
  }
  state.currentQuestionIndex += 1;
  renderPracticeQuestion();
}

function nextBossQuestion(){
  if (state.playerHealth <= 0 || state.bossHealth <= 0 || state.currentQuestionIndex >= QUESTIONS_PER_RUN - 1) {
    showPage("courses");
    return;
  }
  state.currentQuestionIndex += 1;
  renderBossQuestion();
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

function updateUI(){
  const accuracy = state.questions ? Math.round((state.correct / state.questions) * 100) : 0;
  document.getElementById("homeQuestions").textContent = state.questions;
  document.getElementById("homeAccuracy").textContent = `${accuracy}%`;
  document.getElementById("homeStreak").textContent = `${state.streak} DAY${state.streak === 1 ? "" : "S"}`;
  document.getElementById("homeXp").textContent = state.xp;
  document.getElementById("homeCourse").textContent = state.currentCourse;
  document.getElementById("homeUnit").textContent = `${state.currentUnit.toUpperCase()} MINI BOSS`;
  document.getElementById("navLevel").textContent = `LVL ${state.level}`;
  document.getElementById("navXp").style.width = `${(state.xp % 200) / 2}%`;
  document.getElementById("navProfileName").textContent = state.profile.name || "PLAYER_001";
  renderProfile();
}

function unitKey(){
  return `${state.currentCourse}::${state.currentUnit}`;
}

function completeUnit(){
  const key = unitKey();
  if (state.completedUnits.includes(key)) return;
  state.completedUnits.push(key);
  state.level += 1;
  state.xp += 100;
  document.getElementById("newLevel").textContent = state.level;
  document.getElementById("levelUp").classList.remove("hidden");
  document.querySelector("#levelUp .eyebrow").textContent = "★ UNIT CLEARED ★";
  document.querySelector("#levelUp h2").textContent = "LEVEL UP!";
  document.querySelector("#levelUp p").textContent = `${state.currentCourse} ${state.currentUnit} cleared. +100 XP and new gear may be available!`;
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
  document.getElementById("profileXpLabel").textContent = `${state.xp} XP • NEXT LEVEL: COMPLETE A UNIT`;
  document.getElementById("completedUnitCount").textContent = `${state.completedUnits.length} UNIT${state.completedUnits.length === 1 ? "" : "S"} CLEARED`;
  document.getElementById("profileXpBar").style.width = `${Math.min(100, state.completedUnits.length * 10)}%`;
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
}

function renderAnalytics(){
  const accuracy = state.questions ? Math.round((state.correct / state.questions) * 100) : 0;
  document.getElementById("aQuestions").textContent = state.questions;
  document.getElementById("aCorrect").textContent = state.correct;
  document.getElementById("aAccuracy").textContent = `${accuracy}%`;
  document.getElementById("aStreak").textContent = state.streak;
  const units = courseUnits[state.currentCourse] || [];
  document.getElementById("mastery").innerHTML = units.map(u => `
    <div class="mastery-row"><label>${u[0]}</label><div class="mastery-bar"><div style="width:${u[4]}%"></div></div><span>${u[4]}%</span></div>`).join("");
  const list = document.getElementById("reviewList");
  list.innerHTML = state.reviewed.length ? state.reviewed.map(id => {
    const q = allQuestions().find(x => x.id === id);
    return q ? `<div class="review-item"><span>${q.unit}: ${q.text}</span><span class="wrong-text">REVIEW</span></div>` : "";
  }).join("") : `<p style="color:#8d83a5">No questions marked yet. Missed questions will automatically appear here.</p>`;
}

function completeDay(btn){
  const card = btn.closest(".day-card");
  if (!card.classList.contains("completed")) {
    card.classList.add("completed");
    btn.textContent = "✓ QUEST COMPLETE";
    state.xp += 25;
    state.level = Math.floor(state.xp / 200) + 1;
    save();
    updateUI();
  }
}

function resetPlanner(){
  document.querySelectorAll(".day-card").forEach(c => {
    c.classList.remove("completed");
    c.querySelector("button").textContent = "COMPLETE QUEST";
  });
}

function closeModal(){
  document.getElementById("levelUp").classList.add("hidden");
}

function updateCountdown(){
  const diff = AP_EXAM_DATE - new Date();
  if (diff <= 0) {
    document.getElementById("countdown").textContent = "EXAM DAY";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  document.getElementById("countdown").textContent = `${d} DAYS ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

updateUI();
updateCountdown();
setInterval(updateCountdown, 1000);
