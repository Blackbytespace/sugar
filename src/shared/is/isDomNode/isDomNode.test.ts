import { expect, test } from 'vitest';
import isDomNode from './isDomNode';
test('isDomNode', () => {
  expect(isDomNode({})).toBe(false);
  expect(typeof isDomNode).toBe('function');
});
