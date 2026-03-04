import { expect, test } from 'vitest';
import isNode from './isNode';

test('isNode', () => {
  expect(isNode()).toBe(true);
});
