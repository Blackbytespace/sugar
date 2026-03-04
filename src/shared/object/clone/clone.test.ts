import { test, expect } from 'vitest';
import clone from './clone';

test('clone', () => {
  const obj = { a: 1, b: { c: 2 } };
  
  // Shallow clone
  const shallowCloned = clone(obj);
  expect(shallowCloned).toEqual(obj);
  expect(shallowCloned).not.toBe(obj);
  expect(shallowCloned.b).toBe(obj.b); // Same reference for nested objects
  
  // Deep clone
  const deepCloned = clone(obj, { deep: true });
  expect(deepCloned).toEqual(obj);
  expect(deepCloned).not.toBe(obj);
  expect(deepCloned.b).not.toBe(obj.b); // Different reference for nested objects
  expect(deepCloned.b).toEqual(obj.b);
});