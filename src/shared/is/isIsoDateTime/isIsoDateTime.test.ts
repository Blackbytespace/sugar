import { expect, test } from 'vitest';
import isIsoDateTime from './isIsoDateTime';

test('isIsoDateTime', () => {
  expect(isIsoDateTime('2008-08-30 17:21:59')).toBe(true);
  expect(isIsoDateTime('2023-12-31 14:30:00')).toBe(true);
  expect(isIsoDateTime('2023-12-31T14:30:00Z')).toBe(false);
  expect(isIsoDateTime('invalid')).toBe(false);
});
