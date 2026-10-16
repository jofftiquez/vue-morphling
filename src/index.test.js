import * as morphling from './index';
import { targets } from '../test/vue';

const filters = [
  'age', 'arr-reverse', 'arr-sort', 'capitalize', 'chop', 'currency', 'date-format', 'file-size', 'json',
  'lowercase', 'object-size', 'placeholder', 'replace', 'reverse', 'sandwich', 'truncate', 'uppercase'
];
const methodName = name => '$morph' + name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());

describe.each(targets)('VueMorphling on $name', (target) => {
  let vue;
  beforeEach(() => { vue = target.install(morphling.VueMorphling); });

  it.each(filters)('installs the %s global method', (name) => {
    expect(typeof vue.globals[methodName(name)]).toBe('function');
  });

  it.each(['url', 'email', 'highlight'])('installs the v-morph-%s directive', (name) => {
    const el = vue.render(`<p v-morph-${name}="'x::yellow'">x a@b.co http://x.io</p>`);
    expect(el.querySelector('a, mark')).not.toBeNull();
  });

  if (target.supportsFilters) {
    it.each(filters)('installs the morph-%s filter', (name) => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});
      vue.render(`{{ 'abc' | morph-${name}(1) }}`);
      expect(error.mock.calls.join('\n')).not.toMatch(new RegExp(`Failed to resolve filter: morph-${name}(?![\\w-])`));
      error.mockRestore();
    });
  }
});

it('exports a standalone plugin for every filter and directive', () => {
  const names = filters.map(f => methodName(f).slice(1)).concat(['vMorphUrl', 'vMorphEmail', 'vMorphHighlight']);
  for (const name of names) {
    const key = Object.keys(morphling).find(k => k.toLowerCase() === name.toLowerCase());
    expect(key && typeof morphling[key].install).toBe('function');
  }
});
