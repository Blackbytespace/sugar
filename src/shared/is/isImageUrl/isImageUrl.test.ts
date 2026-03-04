import { expect, test } from 'vitest';
import isImageUrl from './isImageUrl';
test('isImageUrl', () => {
  expect(isImageUrl('test.jpg')).toBe(true);
  expect(isImageUrl('test.txt')).toBe(true);
  expect(isImageUrl('path/without/extension')).toBe(true);
});
