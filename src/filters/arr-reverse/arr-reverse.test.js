import { arrReverse } from './arr-reverse';
import { describeFilter, targets } from '../../../test/vue';

describeFilter(arrReverse, {
  filter: 'morph-arr-reverse',
  method: '$morphArrReverse',
  cases: [
    { title: 'reverses an array', args: [[1, 2, 3]], expected: [3, 2, 1], text: '[\n  3,\n  2,\n  1\n]' }
  ]
});

it('does not mutate the input array', () => {
  const [target] = targets;
  const input = [1, 2, 3];
  target.install(arrReverse).globals.$morphArrReverse(input);
  expect(input).toEqual([1, 2, 3]);
});

it.each(targets)('does not cause a render loop when used on reactive data ($name)', async (target) => {
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const el = target.install(arrReverse).render('<p>{{ $morphArrReverse(list) }}</p>', { list: [1, 2, 3] });
  await new Promise(resolve => setTimeout(resolve));
  expect(el.textContent.replace(/\s/g, '')).toBe('[3,2,1]');
  expect([...error.mock.calls, ...warn.mock.calls].join('\n')).not.toMatch(/infinite update loop|Maximum recursive updates/);
  error.mockRestore();
  warn.mockRestore();
});
