# AP Arcade — Prototype

This is a front-end prototype for the AP Arcade idea.

## Run it
1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Double-click `index.html` to open it in Chrome.
3. No server or installation is required for this prototype.

## What is included
- Retro 8-bit / arcade visual theme
- Home page
- Editable per-course AP exam countdowns
- Course selection
- Course unit maps (8 AP Physics 1, 9 AP Chemistry, 8 AP Calculus AB, 8 AP Biology units)
- Per-course AP exam date settings and countdowns
- Multiple-choice practice
- Separate FRQ practice with three five-part prompts per unit
- Boss fight system
- Energy bar
- XP and levels
- Character profile with class selection and level-unlocked outfits and weapons
- 15-question MCQ runs with no repeated item in a run
- Saved FRQ response drafts with revealable scoring guides
- Energy meter starts full and persists between sessions; it is also the player's HP in boss battles. Practice MCQs recharge it, and wrong boss answers drain it.
- One-time level and XP rewards for completing a course unit
- Character sprite that attacks and takes damage in boss battles
- Review/missed-question system
- Basic analytics
- Adaptive weekly study planner with selectable courses, units, study days, exam-aware quests, and completion tracking
- Local browser save using localStorage, with JSON export/import to transfer progress between devices

## Important
The original practice items are authored in `academic-content.js`; they are not copied from College Board materials. The course maps follow the published AP unit frameworks. Subject-matter experts should still review the questions, answer keys, scoring guides, and exam alignment against current AP Course and Exam Descriptions before publishing.

Framework references: [AP Physics 1](https://apcentral.collegeboard.org/courses/ap-physics-1), [AP Chemistry](https://apcentral.collegeboard.org/courses/ap-chemistry), [AP Calculus AB](https://apcentral.collegeboard.org/courses/ap-calculus-ab), and [AP Biology](https://apcentral.collegeboard.org/courses/ap-biology).

## First things to customize
- Set exam dates for each course on the home page
- Add or revise MCQs and FRQs in `academic-content.js`
- Add/edit courses and units in `courseUnits` and author matching banks in `academic-content.js`
- Change colors/fonts in `style.css`
