import { expect, test } from 'vitest';
import isWindows from './isWindows';

test('isWindows', () => {
  expect(isWindows()).toBe(false);
});
