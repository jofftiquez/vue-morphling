import { lowerCase } from './lowercase';
import { describeFilter } from '../../../test/vue';

describeFilter(lowerCase, {
  filter: 'morph-lowercase',
  method: '$morphLowercase',
  cases: [
    { title: 'lowercases a string', args: ['LOST IN THE ECHO'], expected: 'lost in the echo' }
  ]
});
