import { age } from './age';
import { describeFilter } from '../../../test/vue';

const thisYear = new Date().getFullYear();

describeFilter(age, {
  filter: 'morph-age',
  method: '$morphAge',
  cases: [
    { title: 'calculates the age from a Date', args: [new Date(thisYear - 30, 0, 1)], expected: 30 },
    { title: 'calculates the age from a timestamp', args: [new Date(thisYear - 5, 0, 1).getTime()], expected: 5 }
  ]
});
