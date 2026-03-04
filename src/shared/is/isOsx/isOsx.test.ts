import { expect, test } from 'vitest';
import isOsx from './isOsx';

test('isOsx', () => {
  expect(isOsx()).toBe(true);
});
