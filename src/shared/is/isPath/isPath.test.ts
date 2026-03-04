import { expect, test } from 'vitest';
import isPath from './isPath';

test('isPath', () => {
  expect(isPath('/Users/test')).toBe(true);
  expect(isPath('./test')).toBe(true);
  expect(isPath('test')).toBe(true);
});
