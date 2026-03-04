import { expect, test } from 'vitest';
import isDomElement from './isDomElement';
test('isDomElement', () => {
  expect(isDomElement({})).toBe(false);
  expect(typeof isDomElement).toBe('function');
});
