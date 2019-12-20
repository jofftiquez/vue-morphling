import { createLocalVue } from '@vue/test-utils';
import { dateFormat } from './date-format';

it('adds a $morphDate method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(dateFormat);
  expect(typeof localVue.prototype.$morphDateFormat).toBe('function');
});

it('should format date', () => {
  const localVue = createLocalVue();
  localVue.use(dateFormat);
  expect(localVue.prototype.$morphDateFormat(new Date(2017, 6, 26), 'MMM DD, YYYY')).toEqual('Jul 26, 2017');
});
