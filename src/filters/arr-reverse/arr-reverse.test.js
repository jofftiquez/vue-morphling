import { arrReverse } from './arr-reverse';
import { describeFilter } from '../../../test/vue';

describeFilter(arrReverse, {
  filter: 'morph-arr-reverse',
  method: '$morphArrReverse',
  cases: [
    { title: 'reverses an array', args: [[1, 2, 3]], expected: [3, 2, 1] }
  ]
});
