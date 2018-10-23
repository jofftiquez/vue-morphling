import { createLocalVue } from '@vue/test-utils';
import { date } from '../../src/filters/date';

it('adds a $morphDate method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(date);
  expect(typeof localVue.prototype.$morphDate).toBe('function');
});

it('should format date', () => {
  const localVue = createLocalVue();
  localVue.use(date);
  expect(localVue.prototype.$morphDate(new Date(2017, 6, 26), 'MMM DD, YYYY')).toEqual('Jul 26, 2017');
});
