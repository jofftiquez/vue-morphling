import { sandwich } from './sandwich';
import { describeFilter } from '../../../test/vue';

describeFilter(sandwich, {
  filter: 'morph-sandwich',
  method: '$morphSandwich',
  cases: [
    { title: 'wraps the value with start and end', args: ['the', 'In ', ' end!'], expected: 'In the end!' },
    { title: 'mirrors the start when no end is given', args: ['x', '<(['], expected: '<([x])>' }
  ]
});
