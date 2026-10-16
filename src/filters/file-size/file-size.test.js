import { fileSize } from './file-size';
import { describeFilter } from '../../../test/vue';

describeFilter(fileSize, {
  filter: 'morph-file-size',
  method: '$morphFileSize',
  cases: [
    { title: 'formats a file size', args: [1024, { round: 0 }], expected: '1 KB' },
    { title: 'accepts numeric strings', args: ['2048', { round: 0 }], expected: '2 KB' }
  ]
});
