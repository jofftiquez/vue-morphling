import { objectSize } from './object-size';
import { describeFilter } from '../../../test/vue';

describeFilter(objectSize, {
  filter: 'morph-object-size',
  method: '$morphObjectSize',
  cases: [
    { title: 'formats the object size', args: [{ a: 'test obj size' }, { base: 0 }], expected: '21 B' },
    { title: 'counts multi-byte characters as utf-8 bytes', args: [{ a: '₱' }], expected: '11 B' }
  ]
});
