// PYQ question-pack logic shared by the app and the build CLI.
// Pipeline: raw segmented questions (+ official answer keys) -> validated pack + review queue.
// Packs are PRIVATE: they are imported from a local file into IndexedDB and never deployed.

export const TYPES = ['MCQ', 'MSQ', 'NAT'];
export const PACK_APP = 'gate-prep-questions';

// FNV-1a 32-bit over normalised text+options: dedupes the same question appearing in several sets.
export function hashQuestion(q) {
  const norm = (String(q.text || '') + '|' + JSON.stringify(q.options || {}))
    .toLowerCase().replace(/\s+/g, ' ').trim();
  let h = 0x811c9dc5;
  for (let i = 0; i < norm.length; i++) { h ^= norm.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

// Basic structural checks on a finished question (used again at import time in the browser).
export function validateQuestion(q) {
  const errors = [];
  if (!q || typeof q !== 'object') return ['not an object'];
  if (!q.id) errors.push('missing id');
  if (!q.text || !String(q.text).trim()) errors.push('missing text');
  if (!TYPES.includes(q.type)) errors.push('type must be MCQ, MSQ or NAT');
  if (![1, 2].includes(q.marks)) errors.push('marks must be 1 or 2');
  if (q.type === 'MCQ' || q.type === 'MSQ') {
    const keys = Object.keys(q.options || {});
    if (keys.length < 2) errors.push('options needed for ' + q.type);
    if (q.type === 'MCQ' && !keys.includes(q.answer)) errors.push('MCQ answer must be one of the option keys');
    if (q.type === 'MCQ' && q.alts && !(Array.isArray(q.alts) && q.alts.every(a => keys.includes(a)))) errors.push('MCQ alternative answers must be option keys');
    if (q.type === 'MSQ' && !(Array.isArray(q.answer) && q.answer.length && q.answer.every(a => keys.includes(a)))) errors.push('MSQ answer must be a non-empty list of option keys');
  }
  if (q.type === 'NAT' && !Number.isFinite(q.answer)) errors.push('NAT answer must be a number');
  if (q.type === 'NAT' && q.alts && !(Array.isArray(q.alts) && q.alts.every(a => Number.isFinite(a.answer) && a.tol >= 0))) errors.push('NAT alternative ranges must have answer and tol');
  if (q.type === 'NAT' && q.tol !== undefined && !(Number.isFinite(q.tol) && q.tol >= 0)) errors.push('NAT tol must be >= 0');
  return errors;
}

// Official key cell -> answer fields.
// MCQ "B" or "B|D" (either accepted); MSQ "A;D"; NAT "4.5", "4.4:4.6" (midpoint + half-width) or several ranges "a:b|c:d".
function parseNat(s) {
  const m = s.match(/^(-?[\d.]+)\s*:\s*(-?[\d.]+)$/);
  if (m) {
    const lo = parseFloat(m[1]), hi = parseFloat(m[2]);
    if (Number.isFinite(lo) && Number.isFinite(hi)) return { answer: (lo + hi) / 2, tol: Math.abs(hi - lo) / 2 };
  }
  const v = parseFloat(s);
  return /^-?[\d.]+$/.test(s) && Number.isFinite(v) ? { answer: v, tol: 0.01 } : null;
}
export function parseKeyAnswer(type, raw) {
  const s = String(raw ?? '').trim();
  if (!s) return null;
  const parts = s.split('|').map(x => x.trim()).filter(Boolean);
  if (type === 'MCQ') {
    const a = parts.map(x => x.toUpperCase());
    return a.every(x => /^[A-Z]$/.test(x)) ? { answer: a[0], ...(a.length > 1 ? { alts: a.slice(1) } : {}) } : null;
  }
  if (type === 'MSQ') return { answer: s.toUpperCase().split(/[;,\s]+/).filter(Boolean).sort() };
  if (type === 'NAT') {
    const rs = parts.map(parseNat);
    if (!rs.length || rs.some(r => !r)) return null;
    return rs.length > 1 ? { ...rs[0], alts: rs.slice(1) } : rs[0];
  }
  return null;
}

// keys.csv rows: paper,year,qno,answer[,type,marks,section]  (type/marks/section are optional cross-check data)
export function parseKeysCsv(text) {
  const keys = new Map();
  for (const line of text.split(/\r?\n/)) {
    const l = line.trim();
    if (!l || l.toLowerCase().startsWith('paper')) continue;
    const [paper, year, qno, answer = ''] = l.split(',');
    keys.set(`${paper.trim().toUpperCase()}-${year.trim()}-${qno.trim()}`, answer.trim());
  }
  return keys;
}
export function parseKeysMeta(text) {
  const meta = new Map();
  for (const line of text.split(/\r?\n/)) {
    const l = line.trim();
    if (!l || l.toLowerCase().startsWith('paper')) continue;
    const [paper, year, qno, , type, marks, section] = l.split(',');
    if (type) meta.set(`${paper.trim().toUpperCase()}-${year.trim()}-${qno.trim()}`, { type: type.trim(), marks: Number(marks), section: (section || '').trim() });
  }
  return meta;
}

// raw: [{paper, year, qno, type, marks, text, options?, answer?, concept:{id, confidence}, figurePage?}]
const SOFT = /^needs (figure|check)/; // flagged but kept
export function buildPack(raw, keys, conceptIds, { minConfidence = 0.8, meta = new Map() } = {}) {
  const ids = new Set(conceptIds);
  const questions = [];
  const review = [];
  const seen = new Map();
  for (const r of raw) {
    const reasons = [];
    const id = `${String(r.paper).toUpperCase()}-${r.year}-${r.qno}`;
    const q = {
      id, source: 'pyq', paper: String(r.paper).toUpperCase(), year: Number(r.year), qno: r.qno,
      type: r.type, marks: r.marks, text: r.text,
    };
    if (r.options) q.options = r.options;
    if (r.page) q.page = r.page;
    if (r.figurePage) q.figurePage = r.figurePage;
    else if (r.uncertain && r.page) q.figurePage = r.page;
    // Official key is ground truth; a model-extracted answer is never trusted as verified.
    const keyRaw = keys.get(id);
    const parsed = keyRaw !== undefined && !/^MTA$/i.test(keyRaw) ? parseKeyAnswer(r.type, keyRaw) : null;
    if (parsed) { Object.assign(q, parsed); q.verified = true; }
    else if (/^MTA$/i.test(keyRaw || '')) reasons.push('official key: marks awarded to all (question withdrawn)');
    else if (keyRaw !== undefined) reasons.push('unparseable official key: ' + keyRaw);
    else reasons.push('no official answer key');
    // The key also states each question's type and marks: a mismatch means the extraction is wrong.
    const m = meta.get(id);
    if (m && (m.type !== r.type || m.marks !== r.marks)) reasons.push(`type/marks mismatch: extracted ${r.type} ${r.marks}, key says ${m.type} ${m.marks}`);
    const c = r.concept || {};
    if (!ids.has(c.id)) reasons.push('unknown concept: ' + c.id);
    else if (!(c.confidence >= minConfidence)) reasons.push(`low tagging confidence ${c.confidence} for ${c.id}`);
    q.concept = c.id;
    if (r.figurePage) reasons.push('needs figure: see paper page ' + r.figurePage + ' (kept, flagged)');
    if (r.uncertain) reasons.push('needs check: ' + r.uncertain + (r.page ? ' (paper page ' + r.page + ', kept, flagged)' : ''));
    const hardReasons = reasons.filter(x => !SOFT.test(x));
    const errs = hardReasons.length ? [] : validateQuestion(q);
    reasons.push(...errs);
    const blocking = reasons.filter(x => !SOFT.test(x));
    q.hash = hashQuestion(q);
    if (!blocking.length) {
      if (seen.has(q.hash)) { review.push({ id, reasons: ['duplicate of ' + seen.get(q.hash)], raw: r }); continue; }
      seen.set(q.hash, id);
      questions.push(q);
      if (reasons.length) review.push({ id, reasons, raw: r, included: true });
    } else review.push({ id, reasons, raw: r });
  }
  return {
    pack: { app: PACK_APP, version: 1, built: new Date().toISOString(), questions },
    review,
  };
}

// Bundled starter questions + imported packs. Dedupe by id first, then content hash.
export function mergeQuestions(bundled, packQuestions) {
  const out = [];
  const ids = new Set();
  const hashes = new Set();
  for (const q of [...packQuestions, ...bundled]) {
    const h = q.hash || hashQuestion(q);
    if (ids.has(q.id) || hashes.has(h)) continue;
    ids.add(q.id); hashes.add(h); out.push(q);
  }
  return out;
}

export function checkPackShape(data) {
  if (!data || data.app !== PACK_APP || !Array.isArray(data.questions)) throw new Error('Not a GATE Prep question pack');
  const bad = [];
  for (const q of data.questions) { const e = validateQuestion(q); if (e.length) bad.push(`${q && q.id}: ${e.join(', ')}`); }
  return { valid: data.questions.filter(q => !validateQuestion(q).length), bad };
}
