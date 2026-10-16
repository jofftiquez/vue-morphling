// Shared test harness: install a morphling plugin into a real Vue runtime and
// render templates with it. Every target listed in `targets` runs the same
// specs, so a filter or directive is proven on each supported Vue major.
import Vue2 from 'vue2/dist/vue.common.js';
import Vue26 from 'vue26/dist/vue.common.js';
import * as Vue3 from 'vue';
import { morphFilters } from '../src/index';

for (const Vue of [Vue2, Vue26]) {
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
}

// Tear down everything a test mounted so no app outlives its test file.
const mounted = [];
afterEach(() => {
  while (mounted.length) mounted.pop()();
});

const vue2Target = (Vue, name) => ({
  name,
  version: Vue.version,
  supportsFilters: true,
  install (plugin, options) {
    const Local = Vue.extend();
    Local.use(plugin, options);
    return {
      globals: Local.prototype,
      render (template, data = {}) {
        const vm = new Local({
          template: `<div>${template}</div>`,
          data: () => data
        }).$mount();
        mounted.push(() => vm.$destroy());
        return vm.$el;
      }
    };
  }
});

const vue3 = {
  name: 'Vue 3',
  version: Vue3.version,
  supportsFilters: false,
  install (plugin, options) {
    const app = Vue3.createApp({});
    app.use(plugin, options);
    return {
      globals: app.config.globalProperties,
      render (template, data = {}) {
        const el = document.createElement('div');
        const app = Vue3.createApp({
          template: `<div>${template}</div>`,
          data: () => data
        }).use(plugin, options);
        app.mount(el);
        mounted.push(() => app.unmount());
        return el.firstElementChild;
      }
    };
  }
};

export const targets = [vue2Target(Vue2, 'Vue 2.7'), vue2Target(Vue26, 'Vue 2.6'), vue3];

// Runs `cases` against every target through three paths:
//   1. the global method   ($morphX(value, ...args))
//   2. the method inside a template   {{ $morphX(value, ...args) }}
//   3. the filter pipe syntax   {{ value | morph-x(...args) }}   (Vue 2 only)
// plus the plain function exported as `morphFilters.x`.
export function describeFilter (plugin, { filter, method, cases }) {
  const key = method.charAt(6).toLowerCase() + method.slice(7);
  it.each(cases)(`morphFilters.${key}: $title`, ({ args, expected }) => {
    expect(morphFilters[key](...args)).toEqual(expected);
  });

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
