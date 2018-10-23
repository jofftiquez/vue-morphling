import { createLocalVue } from '@vue/test-utils';
import { chop } from '../../src/filters/chop';

it('adds a $morphChop method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(chop);
  expect(typeof localVue.prototype.$morphChop).toBe('function');
});

it('should chop a string without location', () => {
  const localVue = createLocalVue();
  localVue.use(chop);
  expect(localVue.prototype.$morphChop('Papercut', 2)).toEqual('Paperc');
});

it('should chop a string with location', () => {
  const localVue = createLocalVue();
  localVue.use(chop);
  expect(localVue.prototype.$morphChop('Papercut', 3, 'end')).toEqual('Paper');
});

it('should chop a string from start', () => {
  const localVue = createLocalVue();
  localVue.use(chop);
  expect(localVue.prototype.$morphChop('Papercut', 2, 'start')).toEqual('percut');
});
