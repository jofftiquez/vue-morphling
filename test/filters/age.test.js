import { createLocalVue } from '@vue/test-utils';
import { age } from '../../src/filters/age';

it('adds a $morphAge method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(age);
  expect(typeof localVue.prototype.$morphAge).toBe('function');
});

it('calculate the age', () => {
  const localVue = createLocalVue();
  localVue.use(age);
  expect(localVue.prototype.$morphAge(new Date(1976, 2, 20))).toBe(42);
});
