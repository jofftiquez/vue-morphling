import { currency } from './currency';
import { describeFilter } from '../../../test/vue';

describeFilter(currency, {
  filter: 'morph-currency',
  method: '$morphCurrency',
  cases: [
    { title: 'prefixes the currency symbol', args: ['100', 'PHP'], expected: '₱100' },
    { title: 'defaults to USD', args: ['100'], expected: '$100' }
  ]
});
