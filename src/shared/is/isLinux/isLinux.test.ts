import { expect, test } from 'vitest';
import isLinux from './isLinux';

test('isLinux', () => {
  expect(typeof isLinux()).toBe('boolean');
});
