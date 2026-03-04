import { expect, test } from 'vitest';
import isUrlCompliant from './isUrlCompliant';
test('isUrlCompliant', () => {
  expect(isUrlCompliant('test-url')).toBe(true);
  expect(isUrlCompliant('test url')).toBe(false);
});
