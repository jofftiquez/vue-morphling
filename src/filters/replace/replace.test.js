import { createLocalVue } from '@vue/test-utils';
import { replace } from './replace';

it('adds a $morphReplace method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(replace);
  expect(typeof localVue.prototype.$morphReplace).toBe('function');
});

it('should replaces characters on a string with a given string', () => {
  const localVue = createLocalVue();
  localVue.use(replace);
  expect(localVue.prototype.$morphReplace('I\'ve given uuuuuup!!', 'given', 'new word')).toEqual('I\'ve new word uuuuuup!!');
});
