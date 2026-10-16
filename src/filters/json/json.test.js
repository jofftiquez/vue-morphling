import { morphJson as json } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(json, {
  filter: 'morph-json',
  method: '$morphJson',
  cases: [
    { title: 'pretty prints json', args: [{ favoriteBand: 'Linkin Park' }, 2], expected: '{\n  "favoriteBand": "Linkin Park"\n}' },
    { title: 'prints compact json', args: [{ a: 1 }], expected: '{"a":1}' }
  ]
});
