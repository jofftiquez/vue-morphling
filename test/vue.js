// Shared test harness: install a morphling plugin into a real Vue runtime and
// render templates with it. Every target listed in `targets` runs the same
// specs, so a filter or directive is proven on each supported Vue major.
import Vue2 from 'vue2/dist/vue.common.js';

Vue2.config.productionTip = false;
Vue2.config.devtools = false;

const vue2 = {
  name: 'Vue 2',
  version: Vue2.version,
  supportsFilters: true,
  install (plugin, options) {
    const Local = Vue2.extend();
    Local.use(plugin, options);
    return {
      globals: Local.prototype,
      render (template, data = {}) {
        const vm = new Local({
          template: `<div>${template}</div>`,
          data: () => data
        }).$mount();
        return vm.$el;
      }
    };
  }
};

export const targets = [vue2];

// Runs `cases` against every target through three paths:
//   1. the global method   ($morphX(value, ...args))
//   2. the method inside a template   {{ $morphX(value, ...args) }}
//   3. the filter pipe syntax   {{ value | morph-x(...args) }}   (Vue 2 only)
export function describeFilter (plugin, { filter, method, cases }) {
  describe.each(targets)(`${filter} on $name`, (target) => {
    let vue;
    beforeEach(() => { vue = target.install(plugin); });

    it(`exposes ${method}`, () => {
      expect(typeof vue.globals[method]).toBe('function');
    });

    it.each(cases)('$title', ({ args, expected }) => {
      expect(vue.globals[method](...args)).toEqual(expected);
    });

    const textCases = cases.filter(c => c.text !== undefined || typeof c.expected === 'string' || typeof c.expected === 'number');
    if (!textCases.length) return;

    it.each(textCases)('$title (template method call)', ({ args, expected, text }) => {
      const el = vue.render(`{{ ${method}(v, ...a) }}`, { v: args[0], a: args.slice(1) });
      expect(el.textContent).toBe(text !== undefined ? text : String(expected));
    });

    if (!target.supportsFilters) return;

    it.each(textCases)('$title (filter pipe)', ({ args, expected, text }) => {
      const params = args.slice(1).map((_, i) => `a[${i}]`).join(', ');
      const el = vue.render(`{{ v | ${filter}(${params}) }}`, { v: args[0], a: args.slice(1) });
      expect(el.textContent).toBe(text !== undefined ? text : String(expected));
    });

    it('renders an empty string for a falsy value (filter pipe)', () => {
      const el = vue.render(`{{ v | ${filter} }}`, { v: '' });
      expect(el.textContent).toBe('');
    });
  });
}
