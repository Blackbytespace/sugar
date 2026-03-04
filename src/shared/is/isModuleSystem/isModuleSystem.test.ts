import { expect, test } from 'vitest';
import isModuleSystem from './isModuleSystem';
test('isModuleSystem', () => {
  expect(isModuleSystem('cjs')).toBe(true);
  expect(isModuleSystem('invalid')).toBe(false);
});
