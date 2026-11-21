# GATE 2027 Prep (EE + RA Part B1)

Static, offline-capable PWA. No server, no running cost. Progress lives in your browser (IndexedDB) as an append-only event log; use **Backup** to download it.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm test           # planner + scoring tests
npm run build      # static output in dist/ (deploy to Cloudflare Pages from a PRIVATE repo)
```

## Content (all in `public/content/`)
- `syllabus.json` - 49 topics, EE/RA marks weights, prerequisites. EE weights = 3-year averages (inferred); RA weights = proxy until the official split is published. Edit here to re-weight; the plan re-orders automatically.
- `questions.json` - 7 starter questions (hand-verified). Add PYQs here (MCQ/MSQ/NAT; NAT needs `tol`).
- `notes/<topic-id>.md` - optional notes per topic; `$...$` renders as math.

## Privacy
Do not put copyrighted textbooks or PYQ PDFs in a publicly deployed bundle. Keep them local/private.

## Spaced revision
FSRS scheduling (ts-fsrs, whole-day intervals, capped so nothing is scheduled past the exam). Two kinds of card, both created automatically:
- **Question card**: the first time you answer a question. Wrong comes back tomorrow; right comes back later. In Review a wrong answer is forced to Again; a right one you rate Hard / Good / Easy.
- **Topic card**: when you mark a topic done (first review the next day). Front lists the subtopics to recall; back is that note's FORMULAS section.
Cards are not stored: they are rebuilt by replaying your event log, so backups and merging two devices keep your schedule intact. Today shows what is due and the Review tab shows a count.

## Mock tests
Mock tab: pick paper, source and number of questions (up to 65). Time is 1.8 min per mark (GATE: 180 min for 100 marks). Questions are sampled by topic mark weight, 1-mark first, avoiding ones used in earlier mocks.
- Exam screen: countdown timer, question palette (answered / not answered / marked / not visited), Save & Next, Mark for review, Clear. Progress is saved as you go, so a reload resumes; if time runs out while the app is closed it auto-submits with your last saved answers.
- Marking: MCQ -1/3 (1-mark) or -2/3 (2-mark) when wrong; MSQ all-or-nothing, no negative; NAT within tolerance, no negative.
- Result: score, accuracy, negative marks lost, per-section table, every question with its solution, and a score trend across mocks.
- Wrong answers go to the mistake log and the revision queue automatically.
Limits: the mix follows topic weights, not the exact paper pattern; there are no General Aptitude questions yet; no on-screen virtual calculator (use the official GATE mock interface for that). A full 65-question paper needs a PYQ pack.

## Week plan
Week 1 (done): Today, planner/auto-replan, topic page, practice, mistake log, backup, tutor prompt builder.
Weeks 2-3: PYQ bank, forgiving streak, coverage by section. Week 4: tutor gate decision (spaced revision and mock tests are done). Code freeze ~3 weeks before the exam.
