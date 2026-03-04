import { expect, test } from 'vitest';
import isIdCompliant from './isIdCompliant';
test('isIdCompliant', () => {
  expect(isIdCompliant('test-id')).toBe(true);
  expect(isIdCompliant('test id')).toBe(false);
});
