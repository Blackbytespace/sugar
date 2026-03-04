import { expect, test } from 'vitest';
import isIsoDate from './isIsoDate';

test('isIsoDate', () => {
  expect(isIsoDate('2023-12-31')).toBe(true);
  expect(isIsoDate('invalid')).toBe(false);
});
