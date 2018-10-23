import { createLocalVue } from '@vue/test-utils';
import { sandwich } from '../../src/filters/sandwich';

it('adds a $morphSandwich method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(sandwich);
  expect(typeof localVue.prototype.$morphSandwich).toBe('function');
});

it('should prepend and append data around a given value', () => {
  const localVue = createLocalVue();
  localVue.use(sandwich);
  expect(localVue.prototype.$morphSandwich('the', 'In ', ' end!')).toEqual('In the end!');
});
