import { expect, test } from 'vitest';
import isYyyymmddDate from './isYyyymmddDate';

test('isYyyymmddDate', () => {
  expect(isYyyymmddDate('2023-12-31')).toBe(true);
  expect(isYyyymmddDate('31/12/2023')).toBe(false);
});
