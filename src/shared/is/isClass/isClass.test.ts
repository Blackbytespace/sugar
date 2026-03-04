import { expect, test } from 'vitest';
import isClass from './isClass';
test('isClass', () => {
  class Test {}
  expect(isClass(Test)).toBe(true);
  expect(isClass(() => {})).toBe(false);
});
