import { morphFileSize as fileSize } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(fileSize, {
  filter: 'morph-file-size',
  method: '$morphFileSize',
  cases: [
    { title: 'formats a file size', args: [1024, { round: 0 }], expected: '1 KB' },
    { title: 'accepts numeric strings', args: ['2048', { round: 0 }], expected: '2 KB' },
    { title: 'keeps 1.x binary (1024) units by default', args: [1536], expected: '1.5 KB' },
    { title: 'keeps 1.x output for a megabyte', args: [1000000], expected: '976.56 KB' },
    { title: 'lets the caller opt into base 10', args: [1000000, { base: 10 }], expected: '1 MB' },
    { title: 'lets the caller pick the IEC standard', args: [1073741824, { standard: 'iec' }], expected: '1 GiB' }
  ]
});
