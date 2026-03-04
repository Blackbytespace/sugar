import { expect, test } from 'vitest';
import isJson from './isJson';

test('isJson', () => {
  expect(isJson('{"test": true}')).toBe(true);
  expect(isJson('[1,2,3]')).toBe(true);
  expect(isJson('invalid')).toBe(false);
});
