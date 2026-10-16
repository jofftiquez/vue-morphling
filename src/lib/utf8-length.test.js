import { utf8Length } from './utf8-length';
import { TextEncoder } from 'node:util';

it.each(['', 'abc', 'é', '₱100', '👋🏽 hi', '{"a":"日本語"}'])('matches TextEncoder for %j', (str) => {
  expect(utf8Length(str)).toBe(new TextEncoder().encode(str).length);
});
