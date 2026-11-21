# PYQ ingestion (private, local)

Turns previous-year question papers into a **private question pack** you import into the app.
Nothing is uploaded. Papers, text and packs live under `private/` (gitignored, never deployed).

```
PDFs --extract.py--> text --Claude Code (segment-prompt.md)--> raw-questions.json
                                                    + keys.csv (official answer keys)
                                                       --build-pack.mjs--> pack.json + review.json
                                                                           --> import in app
```

## Steps
1. Put papers in `private/pyq/pdfs/` (e.g. `EE_2024_Set1.pdf`).
2. `python tools/pyq/extract.py` -> `private/pyq/text/*.txt`. Pages listed as "no text" are scanned: tell Claude Code to read those page images instead.
3. In Claude Code, run the prompt in `tools/pyq/segment-prompt.md` once per paper -> `private/pyq/raw-questions.json`.
4. Create `private/pyq/keys.csv` from the official answer keys (GATE archive / IIT site):
   ```
   paper,year,qno,answer
   EE,2024,1,A
   EE,2024,17,A;C        (MSQ: options separated by ;)
   EE,2024,23,4.5        (NAT value, tolerance 0.01 assumed)
   EE,2024,24,4.4:4.6    (NAT range, midpoint + half-width)
   ```
5. `node tools/pyq/build-pack.mjs` -> `private/pyq/pack.json` and `private/pyq/review.json`.
6. Open `review.json`: fix or drop what was excluded (no key, low tagging confidence, unknown topic, duplicate), put corrected entries back in `raw-questions.json`, rebuild.
7. In the app: Backup > Question packs > Import `pack.json`. Practice now has a Previous-year filter.

## Safety rules built in
- **Answers come only from the official key.** A model-extracted answer is never trusted: no key means the question is excluded and listed in `review.json`. Imported PYQs show as verified.
- **Doubtful tags are not guessed.** Below 0.8 confidence the question goes to review, so weak-area statistics are not polluted.
- **Duplicates** (same question in several sets) are collapsed by content hash.
- **Figure questions** are kept but flagged with the original page number.
- Packs are not part of backups, so keep `pack.json` safe; attempts are in backups either way.
- Use PYQs privately for your own study; do not publish them or deploy them in a public bundle.

## Tests
`npm test` runs the pipeline against synthetic fixtures in `tests/fixtures/` (no real papers).

## Figure pictures and General Aptitude
- `ga-raw.py` writes `private/pyq/raw-ga.json` (GA questions typed from the papers; answers come from the key). Merge it with the EE raw file into `raw-all.json`, then run `build-pack.mjs private/pyq/raw-all.json`.
- `add-figures.py` (needs `pip install pymupdf`) attaches a picture of the original paper page to every figure-dependent question in the pack. Figure questions then show the page in Practice/Review and are included in mocks. Run it after `build-pack.mjs`; the pack grows to about 11 MB.
