import { createLocalVue } from '@vue/test-utils';
import { truncate } from '../../src/filters/truncate';

it('adds a $morphTruncate method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(truncate);
  expect(typeof localVue.prototype.$morphTruncate).toBe('function');
});

it('should truncate a string with ellipsis', () => {
  const localVue = createLocalVue();
  localVue.use(truncate);
  expect(localVue.prototype.$morphTruncate('Leave out all the rest', 11)).toEqual('Leave out a…');
});

it('should not truncate', () => {
  const localVue = createLocalVue();
  localVue.use(truncate);
  expect(localVue.prototype.$morphTruncate('One more light', 20)).toEqual('One more light');
});
