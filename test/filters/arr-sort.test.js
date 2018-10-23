import { createLocalVue } from '@vue/test-utils';
import { arrSort } from '../../src/filters/arr-sort';

it('adds a $morphArrSort method to the Vue prototype', () => {
  const localVue = createLocalVue();
  localVue.use(arrSort);
  expect(typeof localVue.prototype.$morphArrSort).toBe('function');
});

it('should sort an array of objects', () => {
  const localVue = createLocalVue();
  localVue.use(arrSort);
  expect(localVue.prototype.$morphArrSort([{ a: 4 }, { a: 6 }, { a: 2 }], 'a', 'asc')).toEqual([{ a: 2 }, { a: 4 }, { a: 6 }]);
});
