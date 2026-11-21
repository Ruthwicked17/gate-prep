"""Step 1: PDF -> per-page text, locally. Nothing is uploaded anywhere.

Usage:  python tools/pyq/extract.py [pdf_dir] [out_dir]
Defaults: private/pyq/pdfs  ->  private/pyq/text
Pages with no extractable text are listed: those are scanned and need OCR
(or have the question as an image), so they must be segmented by reading the page image.
"""
import sys, io
from pathlib import Path

try:
    import pypdf
except ImportError:
    sys.exit("Install pypdf first:  pip install pypdf")

pdf_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "private/pyq/pdfs")
out_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "private/pyq/text")
out_dir.mkdir(parents=True, exist_ok=True)

pdfs = sorted(pdf_dir.glob("*.pdf"))
if not pdfs:
    sys.exit(f"No PDFs found in {pdf_dir}. Put your papers there (they stay on this computer).")

for pdf in pdfs:
    reader = pypdf.PdfReader(str(pdf))
    parts, empty = [], []
    for i, page in enumerate(reader.pages, start=1):
        text = (page.extract_text() or "").strip()
        if len(text) < 40:
            empty.append(i)
        parts.append(f"=== page {i} ===\n{text}\n")
    out = out_dir / (pdf.stem + ".txt")
    out.write_text("\n".join(parts), encoding="utf-8")
    note = f"  (no text on pages {empty}: scanned? needs OCR)" if empty else ""
    print(f"{pdf.name}: {len(reader.pages)} pages -> {out}{note}")
