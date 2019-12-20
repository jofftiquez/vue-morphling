import { createLocalVue } from '@vue/test-utils';
import { placeholder } from './placeholder';

it('adds a $morphPlaceholder method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(placeholder);
  expect(typeof localVue.prototype.$morphPlaceholder).toBe('function');
});

it('should replaces the value with a give placeholder', () => {
  const localVue = createLocalVue();
  localVue.use(placeholder);
  expect(localVue.prototype.$morphPlaceholder('Battle Symphony', 'New Divide')).toEqual('New Divide');
});
