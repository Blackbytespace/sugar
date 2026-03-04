import { expect, test } from 'vitest';
import isClassInstance from './isClassInstance';
test('isClassInstance', () => {
  expect(isClassInstance(new Date())).toBe(true);
  expect(isClassInstance(new Array())).toBe(true);
  expect(isClassInstance({})).toBe(false);
  class Test {}
  expect(isClassInstance(new Test())).toBe(false);
});
