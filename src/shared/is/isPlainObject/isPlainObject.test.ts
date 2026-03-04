import { expect, test } from 'vitest';
import isPlainObject from './isPlainObject';
test('isPlainObject', () => {
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(null)).toBe(false);
});
