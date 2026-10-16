import { morphPlaceholder as placeholder } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(placeholder, {
  filter: 'morph-placeholder',
  method: '$morphPlaceholder',
  cases: [
    { title: 'replaces the value with the placeholder', args: ['Battle Symphony', 'New Divide'], expected: 'New Divide' }
  ]
});
