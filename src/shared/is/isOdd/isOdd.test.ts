import { expect, test } from 'vitest';
import isOdd from './isOdd';

test('isOdd', () => {
  expect(isOdd(3)).toBe(true);
  expect(isOdd(4)).toBe(false);
  expect(isOdd(1)).toBe(true);
  expect(isOdd(0)).toBe(false);
});
