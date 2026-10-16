import { morphUpperCase as uppercase } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(uppercase, {
  filter: 'morph-uppercase',
  method: '$morphUppercase',
  cases: [
    { title: 'uppercases a string', args: ['somewhere i belong'], expected: 'SOMEWHERE I BELONG' },
    { title: 'coerces non-strings', args: [true], expected: 'TRUE' }
  ]
});
