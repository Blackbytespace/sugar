import { expect, test } from 'vitest';
import isGlob from './isGlob';

test('isGlob', () => {
  expect(isGlob('*.js')).toBe(true);
  expect(isGlob('test/**')).toBe(true);
  expect(isGlob('test.js')).toBe(false);
});
