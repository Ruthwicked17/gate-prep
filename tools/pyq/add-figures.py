# Adds a picture of the original paper page to every question that depends on a figure.
# Needs PyMuPDF (pip install pymupdf). Usage: python tools/pyq/add-figures.py [pack.json] [pdf-dir]
# The pictures go into the private pack only (never into the deployed app).
import sys, json, base64, fitz
pack_path = sys.argv[1] if len(sys.argv) > 1 else 'private/pyq/pack.json'
pdf_dir = sys.argv[2] if len(sys.argv) > 2 else 'private/pyq/pdfs'
pack = json.load(open(pack_path, encoding='utf8'))
docs, cache, total = {}, {}, 0
for q in pack['questions']:
    q.pop('figure', None)
    if not q.get('figurePage'): continue
    key = (q['paper'], q['year'], q['figurePage'])
    if key not in cache:
        doc = docs.setdefault(key[:2], fitz.open(f"{pdf_dir}/{q['paper']}_{q['year']}_QP.pdf"))
        page = doc[q['figurePage'] - 1]
        rects = [fitz.Rect(b[:4]) for b in page.get_text('blocks')] + [d['rect'] for d in page.get_drawings()] + [fitz.Rect(i['bbox']) for i in page.get_image_info()]
        clip = fitz.Rect(rects[0])
        for r in rects[1:]: clip |= r
        clip = (clip + (-8, -8, 8, 8)) & page.rect
        data = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), clip=clip).tobytes('jpeg', jpg_quality=72)
        cache[key] = 'data:image/jpeg;base64,' + base64.b64encode(data).decode()
        total += len(data)
    q['figure'] = cache[key]
json.dump(pack, open(pack_path, 'w', encoding='utf8'), ensure_ascii=False)
print(f"{sum(1 for q in pack['questions'] if q.get('figure'))} questions, {len(cache)} page images, {total // 1024} KB of images")
