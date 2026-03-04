import { expect, test } from 'vitest';
import isColor from './isColor';

test('isColor', () => {
  expect(isColor('#ff0000')).toBe(true);
  expect(isColor('rgb(255,0,0)')).toBe(true);
  expect(isColor('invalid')).toBe(false);
});
