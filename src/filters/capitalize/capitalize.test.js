import { capitalize } from './capitalize';
import { describeFilter } from '../../../test/vue';

describeFilter(capitalize, {
  filter: 'morph-capitalize',
  method: '$morphCapitalize',
  cases: [
    { title: 'capitalizes a string', args: ['numb'], expected: 'Numb' },
    { title: 'coerces non-strings', args: [123], expected: '123' }
  ]
});
