import { expect, test } from 'vitest';
import isRegex from './isRegex';

test('isRegex', () => {
  expect(isRegex(/test/)).toBe(true);
  expect(isRegex(new RegExp('test'))).toBe(true);
  expect(isRegex('test')).toBe(false);
});
