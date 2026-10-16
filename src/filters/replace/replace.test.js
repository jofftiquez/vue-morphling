import { morphReplace as replace } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(replace, {
  filter: 'morph-replace',
  method: '$morphReplace',
  cases: [
    { title: 'replaces a substring', args: ['I\'ve given uuuuuup!!', 'given', 'new word'], expected: 'I\'ve new word uuuuuup!!' }
  ]
});
