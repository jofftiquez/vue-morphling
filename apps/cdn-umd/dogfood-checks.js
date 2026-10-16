// Verifies every row rendered by the dogfood page:
//   data-expect="text"   -> the cell's text must equal it
//   data-check="sel:n"   -> the cell must contain exactly n elements matching sel
// Marks each <tr> pass/fail, fills the banner and logs a summary line.
function runChecks (root, label) {
  const cells = [...root.querySelectorAll('[data-expect], [data-check]')];
  let pass = 0;
  const failures = [];
  for (const el of cells) {
    let ok;
    if (el.hasAttribute('data-expect')) {
      ok = el.textContent.trim() === el.getAttribute('data-expect');
    } else {
      ok = el.getAttribute('data-check').split(',').every(rule => {
        const [sel, n] = rule.split(':');
        return el.querySelectorAll(sel).length === Number(n);
      });
    }
    if (el.hasAttribute('data-no-script')) ok = ok && !window.pwned;
    const row = el.closest('tr');
    row.classList.remove('pass', 'fail');
    row.classList.add(ok ? 'pass' : 'fail');
    if (ok) pass++;
    else failures.push(row.querySelector('code') ? row.querySelector('code').textContent : el.textContent);
  }
  const banner = root.querySelector('.banner');
  const total = cells.length;
  const allOk = pass === total && total > 0;
  if (banner) {
    banner.className = 'banner ' + (allOk ? 'pass' : 'fail');
    banner.textContent = allOk
      ? `✅ ${pass}/${total} checks passed: every filter and directive rendered the expected output`
      : `❌ ${pass}/${total} checks passed. Failing: ${failures.join(' | ')}`;
  }
  window.__dogfood = { label, pass, total, failures };
  console.log(`[dogfood] ${label}: ${pass}/${total} checks passed${failures.length ? ' FAIL: ' + failures.join(' | ') : ''}`);
  return window.__dogfood;
}
