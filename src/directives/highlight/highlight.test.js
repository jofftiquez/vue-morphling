import { vMorphHighlight as highlight } from '../../index';
import { targets } from '../../../test/vue';

describe.each(targets)('v-morph-highlight on $name', (target) => {
  let vue;
  beforeEach(() => { vue = target.install(highlight); });

  const marks = el => [...el.querySelectorAll('mark')].map(m => m.textContent);

  it('highlights every match with the given color', () => {
    const el = vue.render('<p v-morph-highlight="\'in::yellow\'">in the end, in time</p>');
    expect(marks(el)).toEqual(['in', 'in']);
    expect(el.querySelector('mark').style.backgroundColor).toBe('yellow');
    expect(el.textContent).toBe('in the end, in time');
  });

  it('matches case-insensitively but keeps the original text', () => {
    const el = vue.render('<p v-morph-highlight="\'numb::pink\'">Numb, NUMB, numb</p>');
    expect(marks(el)).toEqual(['Numb', 'NUMB', 'numb']);
  });

  it('treats the search term literally, not as a regex', () => {
    const el = vue.render('<p v-morph-highlight="\'c++::yellow\'">I like c++ and c</p>');
    expect(marks(el)).toEqual(['c++']);
  });

  it('does not turn interpolated text into HTML (XSS)', () => {
    const text = '<img src=x onerror="window.pwned=1"> numb';
    const el = vue.render('<p v-morph-highlight="\'numb::pink\'">{{ text }}</p>', { text });
    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).toBe(text);
  });
});
