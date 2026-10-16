import { dateFormat } from './date-format';
import { describeFilter } from '../../../test/vue';

describeFilter(dateFormat, {
  filter: 'morph-date-format',
  method: '$morphDateFormat',
  cases: [
    { title: 'formats a Date', args: [new Date(2017, 6, 26), 'MMM dd, yyyy'], expected: 'Jul 26, 2017' },
    { title: 'formats a timestamp', args: [new Date(2017, 6, 26).getTime(), 'yyyy-MM-dd'], expected: '2017-07-26' }
  ]
});
