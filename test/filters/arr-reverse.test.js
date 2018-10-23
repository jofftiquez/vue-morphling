import { createLocalVue } from '@vue/test-utils';
import { arrReverse } from '../../src/filters/arr-reverse';

it('adds a $morphArrReverse method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(arrReverse);
  expect(typeof localVue.prototype.$morphArrReverse).toBe('function');
});

it('should reverse an array', () => {
  const localVue = createLocalVue();
  localVue.use(arrReverse);
  expect(localVue.prototype.$morphArrReverse([1, 2, 3])).toEqual([3, 2, 1]);
});
