import { expect, test } from 'vitest';
import pad from './pad';
test('pad', () => {
  expect(pad(123, 4)).toBe('0123');
  expect(pad(5, 3, '*')).toBe('**5');
  expect(pad(1234, 3)).toBe('1234');
  expect(pad(42, 5, 'x')).toBe('xxx42');
});
