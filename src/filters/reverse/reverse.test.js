import { morphReverse as reverse } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(reverse, {
  filter: 'morph-reverse',
  method: '$morphReverse',
  cases: [
    { title: 'reverses a string', args: ['Shadow of the day'], expected: 'yad eht fo wodahS' }
  ]
});
