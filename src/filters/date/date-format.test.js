import { morphDateFormat as dateFormat } from '../../index';
import { describeFilter } from '../../../test/vue';

describeFilter(dateFormat, {
  filter: 'morph-date-format',
  method: '$morphDateFormat',
  cases: [
    { title: 'formats a Date', args: [new Date(2017, 6, 26), 'MMM dd, yyyy'], expected: 'Jul 26, 2017' },
    { title: 'formats a timestamp', args: [new Date(2017, 6, 26).getTime(), 'yyyy-MM-dd'], expected: '2017-07-26' },
    { title: 'formats an ISO date-time string (date-fns >= 3)', args: ['2017-07-26T10:30:00', 'MMM dd, yyyy HH:mm'], expected: 'Jul 26, 2017 10:30' }
  ]
});
