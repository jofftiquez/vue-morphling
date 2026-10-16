// `Vue.use(plugin)` hands Vue 2 plugins the Vue constructor and Vue 3 plugins
// the app instance. Only the Vue 3 app has `config.globalProperties`.
export const isVue3 = (app) => Boolean(app && app.config && app.config.globalProperties);

// Vue 2: a global `morph-*` filter plus `Vue.prototype.$morph*`.
// Vue 3 has no filters, so only `app.config.globalProperties.$morph*`.
export function registerFilter (app, { filter, method, fn }) {
  if (isVue3(app)) {
    app.config.globalProperties[method] = fn;
    return;
  }
  app.filter(filter, (value, ...args) => {
    if (!value) return;
    return fn(value, ...args);
  });
  app.prototype[method] = fn;
}

// Directives run once the element and its children exist: `bind` in Vue 2,
// `mounted` in Vue 3.
export function registerDirective (app, { directive, apply }) {
  app.directive(directive, isVue3(app) ? { mounted: apply } : { bind: apply });
}
