import { morphTruncate as truncate } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(truncate, {
  filter: 'morph-truncate',
  method: '$morphTruncate',
  cases: [
    { title: 'truncates with an ellipsis', args: ['Leave out all the rest', 11], expected: 'Leave out a…' },
    { title: 'does not truncate short strings', args: ['One more light', 20], expected: 'One more light' }
  ]
});
