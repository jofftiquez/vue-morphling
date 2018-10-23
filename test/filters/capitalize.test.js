import { createLocalVue } from '@vue/test-utils';
import { capitalize } from '../../src/filters/capitalize';

it('adds a $morphCapitalize method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(capitalize);
  expect(typeof localVue.prototype.$morphCapitalize).toBe('function');
});

it('should capitalize a string', () => {
  const localVue = createLocalVue();
  localVue.use(capitalize);
  expect(localVue.prototype.$morphCapitalize('numb')).toEqual('Numb');
});
