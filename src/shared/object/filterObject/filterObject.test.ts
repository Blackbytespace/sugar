import { test, expect } from 'vitest';
import filterObject from './filterObject';

test('filterObject', () => {
  // Filter by value type
  const mixed = { str: 'hello', num: 42, bool: true, anotherStr: 'world' };
  expect(filterObject(mixed, (key, value) => typeof value === 'string')).toEqual({
    str: 'hello',
    anotherStr: 'world'
  });

  // Filter by key name
  const obj = { prefix_a: 1, prefix_b: 2, other: 3, prefix_c: 4 };
  expect(filterObject(obj, (key) => key.startsWith('prefix_'))).toEqual({
    prefix_a: 1,
    prefix_b: 2,
    prefix_c: 4
  });

  // Filter by value condition
  const numbers = { a: 5, b: 10, c: 15, d: 20, e: 25 };
  expect(filterObject(numbers, (key, value) => value >= 15)).toEqual({
    c: 15,
    d: 20,
    e: 25
  });

  // Filter complex objects
  const users = {
    user1: { name: 'John', age: 25, active: true },
    user2: { name: 'Jane', age: 30, active: false },
    user3: { name: 'Bob', age: 35, active: true }
  };
  expect(filterObject(users, (key, value) => value.active)).toEqual({
    user1: { name: 'John', age: 25, active: true },
    user3: { name: 'Bob', age: 35, active: true }
  });

  // Filter excluding specific keys
  const data = { important: 'keep', temp: 'remove', critical: 'keep', debug: 'remove' };
  expect(filterObject(data, (key) => !['temp', 'debug'].includes(key))).toEqual({
    important: 'keep',
    critical: 'keep'
  });

  // Empty object
  expect(filterObject({}, () => true)).toEqual({});

  // No matches
  expect(filterObject({ a: 1, b: 2 }, () => false)).toEqual({});

  // All matches
  const original = { a: 1, b: 2, c: 3 };
  expect(filterObject(original, () => true)).toEqual(original);
});