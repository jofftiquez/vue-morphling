import { chop } from './chop';
import { describeFilter } from '../../../test/vue';

describeFilter(chop, {
  filter: 'morph-chop',
  method: '$morphChop',
  cases: [
    { title: 'chops from the end by default', args: ['Papercut', 2], expected: 'Paperc' },
    { title: 'chops from the end', args: ['Papercut', 3, 'end'], expected: 'Paper' },
    { title: 'chops from the start', args: ['Papercut', 2, 'start'], expected: 'percut' }
  ]
});
