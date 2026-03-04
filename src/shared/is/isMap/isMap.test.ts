import { expect, test } from 'vitest';
import isMap from './isMap';

test('isMap', () => {
  expect(isMap(new Map())).toBe(true);
  expect(isMap({})).toBe(false);
  expect(isMap([])).toBe(false);
});
