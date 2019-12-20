import { createLocalVue } from '@vue/test-utils';
import { json } from './json';

it('adds a $morphJson method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(json);
  expect(typeof localVue.prototype.$morphJson).toBe('function');
});

it('should return a pretty printed json string', () => {
  const localVue = createLocalVue();
  localVue.use(json);
  const fixture = { favoriteBand: 'Linkin Park' };
  expect(localVue.prototype.$morphJson(fixture, 2)).toEqual('{\n  "favoriteBand": "Linkin Park"\n}');
});
