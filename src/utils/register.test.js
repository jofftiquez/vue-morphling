import { registerDirective, registerFilter } from './register';

const definition = { filter: 'morph-x', method: '$morphX', fn: value => `x:${value}` };

it('registers both the pipe filter and the global property on a @vue/compat app', () => {
  const app = { config: { globalProperties: {} }, filter: jest.fn(), directive: jest.fn() };
  registerFilter(app, definition);
  expect(app.config.globalProperties.$morphX('a')).toBe('x:a');
  expect(app.filter).toHaveBeenCalledWith('morph-x', expect.any(Function));
  const pipe = app.filter.mock.calls[0][1];
  expect(pipe('a')).toBe('x:a');
  expect(pipe('')).toBeUndefined();
});

it('uses the Vue 3 directive hook on a @vue/compat app', () => {
  const app = { config: { globalProperties: {} }, filter: jest.fn(), directive: jest.fn() };
  const apply = () => {};
  registerDirective(app, { directive: 'morph-y', apply });
  expect(app.directive).toHaveBeenCalledWith('morph-y', { mounted: apply });
});
