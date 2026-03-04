import { test, expect } from 'vitest';
import mergeDeep from './mergeDeep';

test('mergeDeep', () => {
  const obj1 = { a: { b: { c: 'c', d: 'd' } } };
  const obj2 = { a: { b: { e: 'e', f: 'f' } } };

  // Deep merge two objects
  const result = mergeDeep([obj1, obj2]);
  expect(result).toEqual({
    a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } }
  });

  // Original objects should remain unchanged (clone by default)
  expect(obj1).toEqual({ a: { b: { c: 'c', d: 'd' } } });
  expect(obj2).toEqual({ a: { b: { e: 'e', f: 'f' } } });

  // Test array merging when enabled
  const arrObj1 = { items: [1, 2] };
  const arrObj2 = { items: [3, 4] };
  const arrayResult = mergeDeep([arrObj1, arrObj2], { array: true });
  expect(arrayResult.items).toEqual([1, 2, 3, 4]);

  // Test no clone (mutate first object)
  const mutableObj = { x: 1 };
  const toMerge = { y: 2 };
  const noCloneResult = mergeDeep([mutableObj, toMerge], { clone: false });
  expect(noCloneResult).toBe(mutableObj);
  expect(mutableObj).toEqual({ x: 1, y: 2 });
});