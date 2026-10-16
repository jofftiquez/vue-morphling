import { morphAge as age } from '../../index';
import { describeFilter, targets } from '../../../test/vue';

const thisYear = new Date().getFullYear();

describeFilter(age, {
  filter: 'morph-age',
  method: '$morphAge',
  cases: [
    { title: 'calculates the age from a Date', args: [new Date(thisYear - 30, 0, 1)], expected: 30 },
    { title: 'calculates the age from a timestamp', args: [new Date(thisYear - 5, 0, 1).getTime()], expected: 5 }
  ]
});

describe('birthday not reached yet this year', () => {
  beforeEach(() => { jest.useFakeTimers({ now: new Date(2026, 0, 1) }); });
  afterEach(() => { jest.useRealTimers(); });

  it.each([
    ['1990-12-31', 35],
    ['1990-01-01', 36],
    ['1990-01-02', 35]
  ])('born %s is %i on 2026-01-01', (birthday, expected) => {
    const [y, m, d] = birthday.split('-').map(Number);
    expect(targets[0].install(age).globals.$morphAge(new Date(y, m - 1, d))).toBe(expected);
  });

  // jest.config.js pins TZ to America/New_York, where new Date('1990-01-02')
  // is still Jan 1 locally.
  it.each([
    ['1990-01-02', 35],
    ['1990-01-01', 36]
  ])('reads the date-only string %s as a local date (%i)', (birthday, expected) => {
    expect(targets[0].install(age).globals.$morphAge(birthday)).toBe(expected);
  });
});
