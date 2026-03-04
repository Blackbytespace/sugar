import { test, expect } from 'vitest';
import objectHash from './objectHash';

test('objectHash', () => {
  // Same objects should produce same hash
  const obj1 = { name: 'John', age: 30 };
  const obj2 = { name: 'John', age: 30 };
  expect(objectHash(obj1)).toBe(objectHash(obj2));

  // Different objects should produce different hashes
  const obj3 = { name: 'Jane', age: 25 };
  expect(objectHash(obj1)).not.toBe(objectHash(obj3));

  // Order shouldn't matter for objects
  const obj4 = { age: 30, name: 'John' };
  expect(objectHash(obj1)).toBe(objectHash(obj4));

  // Nested objects
  const nested1 = { user: { name: 'John', details: { age: 30 } } };
  const nested2 = { user: { name: 'John', details: { age: 30 } } };
  expect(objectHash(nested1)).toBe(objectHash(nested2));

  // Arrays
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  const arr3 = [3, 2, 1];
  expect(objectHash(arr1)).toBe(objectHash(arr2));
  expect(objectHash(arr1)).not.toBe(objectHash(arr3));

  // Mixed types
  const mixed1 = {
    string: 'test',
    number: 42,
    boolean: true,
    array: [1, 2, 3],
    object: { nested: 'value' },
    nullValue: null
  };
  const mixed2 = {
    string: 'test',
    number: 42,
    boolean: true,
    array: [1, 2, 3],
    object: { nested: 'value' },
    nullValue: null
  };
  expect(objectHash(mixed1)).toBe(objectHash(mixed2));

  // Empty values
  expect(objectHash({})).toBe(objectHash({}));
  expect(objectHash([])).toBe(objectHash([]));
  expect(objectHash(null)).toBe(objectHash(null));
  expect(objectHash(undefined)).toBe(objectHash(undefined));

  // Primitives
  expect(objectHash('test')).toBe(objectHash('test'));
  expect(objectHash(42)).toBe(objectHash(42));
  expect(objectHash(true)).toBe(objectHash(true));

  // Different primitives produce different hashes
  expect(objectHash('test')).not.toBe(objectHash('different'));
  expect(objectHash(42)).not.toBe(objectHash(43));
  expect(objectHash(true)).not.toBe(objectHash(false));

  // Hash should be a string
  expect(typeof objectHash({})).toBe('string');
  expect(objectHash({}).length).toBeGreaterThan(0);
});