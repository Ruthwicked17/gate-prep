// GATE-style scoring. MCQ: negative marking (1/3 for 1-mark, 2/3 for 2-mark).
// MSQ: all-or-nothing, no negative. NAT: within tolerance, no negative.

export function checkAnswer(q, answer) {
  if (answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && !answer.length)) {
    return { attempted: false, correct: false, marks: 0 };
  }
  let correct = false;
  if (q.type === 'MCQ') correct = answer === q.answer || (q.alts || []).includes(answer);
  else if (q.type === 'MSQ') {
    const a = [...answer].sort();
    const k = [...q.answer].sort();
    correct = a.length === k.length && a.every((v, i) => v === k[i]);
  } else if (q.type === 'NAT') {
    const v = parseFloat(answer);
    // official keys can accept more than one range (e.g. a sign ambiguity): q.alts = [{answer, tol}]
    const ranges = [{ answer: q.answer, tol: q.tol ?? 0 }, ...(q.alts || [])];
    correct = Number.isFinite(v) && ranges.some(r => Math.abs(v - r.answer) <= (r.tol ?? 0) + 1e-9);
  }
  let marks = 0;
  if (correct) marks = q.marks;
  else if (q.type === 'MCQ') marks = -(q.marks === 1 ? 1 / 3 : 2 / 3);
  return { attempted: true, correct, marks };
}
