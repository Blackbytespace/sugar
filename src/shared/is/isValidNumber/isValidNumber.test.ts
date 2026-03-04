import { expect, test } from 'vitest';
import isValidNumber from './isValidNumber';

test('isValidNumber', () => {
  expect(isValidNumber(12)).toBe(true);
  expect(isValidNumber(3.14)).toBe(true);
  expect(isValidNumber('hello')).toBe(false);
  expect(isValidNumber(NaN)).toBe(false);
  expect(isValidNumber(undefined)).toBe(false);
});
