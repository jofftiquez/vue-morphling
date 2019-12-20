import { createLocalVue } from '@vue/test-utils';
import { lowerCase } from './lowercase';

it('adds a $morphLowercase method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(lowerCase);
  expect(typeof localVue.prototype.$morphLowercase).toBe('function');
});

it('should convert a string to lowercase', () => {
  const localVue = createLocalVue();
  localVue.use(lowerCase);
  expect(localVue.prototype.$morphLowercase('LOST IN THE ECHO')).toEqual('lost in the echo');
});
