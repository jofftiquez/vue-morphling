import { arrSort } from './arr-sort';
import { describeFilter, targets } from '../../../test/vue';

describeFilter(arrSort, {
  filter: 'morph-arr-sort',
  method: '$morphArrSort',
  cases: [
    { title: 'sorts an array of objects ascending', args: [[{ a: 4 }, { a: 6 }, { a: 2 }], 'a', 'asc'], expected: [{ a: 2 }, { a: 4 }, { a: 6 }] },
    { title: 'sorts an array of objects descending', args: [[{ a: 4 }, { a: 6 }, { a: 2 }], 'a', 'desc'], expected: [{ a: 6 }, { a: 4 }, { a: 2 }] }
  ]
});

it('does not mutate the input array', () => {
  const [target] = targets;
  const input = [{ a: 4 }, { a: 6 }, { a: 2 }];
  target.install(arrSort).globals.$morphArrSort(input, 'a', 'asc');
  expect(input).toEqual([{ a: 4 }, { a: 6 }, { a: 2 }]);
});
