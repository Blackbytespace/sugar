import { expect, test } from 'vitest';
import isIsoTime from './isIsoTime';

test('isIsoTime', () => {
  expect(isIsoTime('14:30:00')).toBe(true);
  expect(isIsoTime('invalid')).toBe(false);
});
