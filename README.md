# AP Arcade — Prototype

AP Arcade is a free, retro-style study hub for AP Physics 1, AP Chemistry, AP Calculus AB, AP Biology, AP English Language, AP English Literature, AP United States History, and AP Psychology.

## Run it

1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` directly for the offline prototype, or serve the folder over HTTP (for example with VS Code Live Server) to use accounts and the public question bank.
3. No package installation is required.

## What is included

- Retro 8-bit / arcade visual theme, course selection, and editable AP exam countdowns.
- Course maps for AP Physics 1, AP Chemistry, AP Calculus AB, AP Biology, AP English Language, AP English Literature, AP United States History, and AP Psychology.
- Multiple-choice and free-response practice, review tools, and answer explanations.
- Practice runs with up to 30 unique MCQs per unit and all authored FRQs.
- Standard, Ascendant Trial, and Omega Gauntlet boss exams, all available to everyone.
- XP, levels, character customization, analytics, and an adaptive weekly study planner.
- Personal Study Coach inside the planner, built from saved missed questions and authored explanations without an external AI service.
- Scholar's Wilds as its own free sandbox, with exploration, crafting, combat, and AP practice at the Study Shrine.
- Browser-local saves for everyone and optional account sign-in to sync study progress and the Wilds save across devices.

The original practice items are authored in `academic-content.js`; they are not copied from College Board materials. The course maps follow the published AP unit frameworks. Subject-matter experts should still review questions, answer keys, scoring guides, and exam alignment against current AP Course and Exam Descriptions before publishing.

Framework references: [AP Physics 1](https://apcentral.collegeboard.org/courses/ap-physics-1), [AP Chemistry](https://apcentral.collegeboard.org/courses/ap-chemistry), [AP Calculus AB](https://apcentral.collegeboard.org/courses/ap-calculus-ab), and [AP Biology](https://apcentral.collegeboard.org/courses/ap-biology).

## Supabase accounts and free question sets

Accounts are optional. Without signing in, study progress and the Scholar's Wilds save stay in the current browser. When someone signs in, the current browser save is associated with that account and synced through the `player_progress` table. Account progress is private to its owner through row-level security.

1. Apply all SQL files in `supabase/migrations/` in filename order. The earlier membership migrations are retained as history; the final migration removes the legacy subscription/grant tables, makes `premium_content` readable to all visitors, and creates the account progress table.
2. Set the Supabase project URL and public anon key in `account-config.js`. These values are safe for browser use; never put a service-role key or other secret in a browser file.
3. In Supabase Auth, allow the website URL and configure email confirmation as desired.
4. To load the authored extra questions, run `supabase/premium/seed_questions.sql` in the Supabase SQL Editor after applying the migrations. It inserts 33 grouped sets with 15 additional MCQs each (495 total), leaves existing free banks untouched, and skips sets already inserted by this seed.
5. To add more questions later, insert rows into `premium_content` with `course`, `content_key`, `content_type` (`mcq` or `frq`), and `content`. Despite the legacy table name, its content is free and readable by anonymous and signed-in visitors after the final migration. MCQ sets use a `questions` array of `[prompt, answerChoices, correctAnswerIndex, explanation]` tuples. `content_key` must match the existing bank key; some AP Physics units use legacy keys such as `Unit 4 Energy` and `Unit 5 Momentum`. FRQ rows use the existing FRQ object shape (`title`, `scenario`, and `parts`).

The Personal Study Coach builds a focused guide in the browser from up to eight recent missed questions, their authored answer explanations, and the units needing review. It uses no external AI service, API key, or Edge Function. Study progress and the Wilds save are stored locally and synced to `player_progress` while signed in. Do not store personal or sensitive information in question answers.

Opening `index.html` directly with `file://` still works for the offline prototype, but browser authentication and Supabase question loading require an HTTP origin. There is no Stripe setup or subscription service.

## AI essay grading

The full-length essay workspace sends the prompt, source materials, and student response to the private Supabase `grade-essay` Edge Function. The API key is stored only as a Supabase secret; it must never be added to browser configuration.

Deploy the function from the repository:

```bash
supabase functions deploy grade-essay
supabase secrets set OPENAI_API_KEY=your-server-side-key
```

The function returns separate rubric criterion scores, strengths, revision priorities, and overall feedback. AI scores are study estimates and should be reviewed against the official AP rubric.
