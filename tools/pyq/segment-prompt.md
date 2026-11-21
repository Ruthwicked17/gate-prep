# Segmentation prompt (Step 2, run inside Claude Code)

Paste this into a Claude Code session opened in the gate-platform folder, after `extract.py` has produced text files in `private/pyq/text/`. Do one paper per run so mistakes stay local.

---

Read `private/pyq/text/<PAPER FILE>.txt` (a GATE <EE or RA> <YEAR> question paper) and `public/content/syllabus.json` (topic ids).

Write `private/pyq/raw-questions.json` (append if it exists): a JSON array with one object per question:

```
{ "paper": "EE", "year": 2024, "qno": "17", "type": "MCQ|MSQ|NAT", "marks": 1,
  "text": "question text, maths as inline $...$ LaTeX only",
  "options": { "A": "...", "B": "...", "C": "...", "D": "..." },     // MCQ and MSQ only
  "concept": { "id": "<topic id from syllabus.json>", "confidence": 0.0-1.0 },
  "figurePage": 5 }                                                  // only if the question needs a figure/circuit/plot
```

Rules:
- Copy the question faithfully. Do NOT solve it, and do NOT include an answer field: answers come only from the official answer key (`keys.csv`).
- Marks: 1 or 2 from the paper's section headings. Type: MCQ (one option), MSQ (one or more), NAT (numerical).
- Pick the single best topic id. Use confidence below 0.8 when unsure, so it goes to the review queue instead of polluting the weak-area stats.
- If a question depends on a figure, set `figurePage` and describe what you can in the text. Never invent figure content.
- Skip General Aptitude questions unless a "ga" topic exists.
- Output valid JSON only. After writing, report: questions found per type, how many have confidence below 0.8, and any you could not parse.
