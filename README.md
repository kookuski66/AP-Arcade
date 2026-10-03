# AP Arcade — Prototype

This is a front-end prototype for the AP Arcade idea.

## Run it
1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Double-click `index.html` to open it in Chrome.
3. No server or installation is required for this prototype.

## What is included
- Retro 8-bit / arcade visual theme
- Home page
- AP countdown
- Course selection
- Unit/world map
- Multiple-choice practice
- Boss fight system
- Energy bar
- XP and levels
- Character profile with class selection and level-unlocked outfits and weapons
- 15-question practice and boss-battle runs
- One-time level and XP rewards for completing a course unit
- Character sprite that attacks and takes damage in boss battles
- Review/missed-question system
- Basic analytics
- Weekly study planner
- Local browser save using localStorage

## Important
The questions and exam data in this prototype are placeholder/demo content. A 15-question run currently shuffles and reuses each unit's available question pool when that pool has fewer than 15 authored questions. Before publishing, replace these with original questions or properly licensed/officially released material and verify current College Board information.

## First things to customize
- Change the AP exam date in `script.js`
- Add your own questions to the `questions` array
- Add/edit courses and units in `courseUnits`
- Change colors/fonts in `style.css`
