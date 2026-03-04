import { test, expect } from 'vitest';
import sortDeep from './sortDeep';

test('sortDeep', () => {
  // Deep sort by keys alphabetically (default)
  const obj1 = {
    z: { c: 3, a: 1, b: 2 },
    a: { z: 26, x: 24, y: 25 },
    m: 'middle'
  };
  
  const sorted1 = sortDeep(obj1, (a, b) => a.key.localeCompare(b.key));
  expect(Object.keys(sorted1)).toEqual(['a', 'm', 'z']);
  expect(Object.keys(sorted1.a)).toEqual(['x', 'y', 'z']);
  expect(Object.keys(sorted1.z)).toEqual(['a', 'b', 'c']);

  // Deep sort by value
  const obj2 = {
    items: {
      heavy: { weight: 100 },
      light: { weight: 10 },
      medium: { weight: 50 }
    },
    meta: {
      priority: { value: 2 },
      status: { value: 1 }
    }
  };
  
  const sorted2 = sortDeep(obj2, (a, b) => {
    if (a.value.weight !== undefined && b.value.weight !== undefined) {
      return a.value.weight - b.value.weight;
    }
    if (a.value.value !== undefined && b.value.value !== undefined) {
      return a.value.value - b.value.value;
    }
    return a.key.localeCompare(b.key);
  });
  
  expect(Object.keys(sorted2)).toEqual(['items', 'meta']);
  expect(Object.keys(sorted2.items)).toEqual(['light', 'medium', 'heavy']);
  expect(Object.keys(sorted2.meta)).toEqual(['status', 'priority']);

  // Complex nested structure
  const obj3 = {
    users: {
      bob: {
        details: { age: 30, name: 'Bob' },
        settings: { theme: 'dark', lang: 'en' }
      },
      alice: {
        details: { age: 25, name: 'Alice' },
        settings: { theme: 'light', lang: 'fr' }
      }
    },
    config: {
      database: { host: 'localhost', port: 5432 },
      cache: { ttl: 3600, enabled: true }
    }
  };
  
  const sorted3 = sortDeep(obj3, (a, b) => a.key.localeCompare(b.key));
  expect(Object.keys(sorted3)).toEqual(['config', 'users']);
  expect(Object.keys(sorted3.config)).toEqual(['cache', 'database']);
  expect(Object.keys(sorted3.config.cache)).toEqual(['enabled', 'ttl']);
  expect(Object.keys(sorted3.users)).toEqual(['alice', 'bob']);
  expect(Object.keys(sorted3.users.alice.details)).toEqual(['age', 'name']);

  // Mixed with primitives and objects
  const obj4 = {
    string: 'value',
    nested: { b: 2, a: 1 },
    number: 42,
    anotherNested: { z: { y: 2, x: 1 }, a: 'first' }
  };
  
  const sorted4 = sortDeep(obj4, (a, b) => a.key.localeCompare(b.key));
  expect(Object.keys(sorted4)).toEqual(['anotherNested', 'nested', 'number', 'string']);
  expect(Object.keys(sorted4.nested)).toEqual(['a', 'b']);
  expect(Object.keys(sorted4.anotherNested)).toEqual(['a', 'z']);
  expect(Object.keys(sorted4.anotherNested.z)).toEqual(['x', 'y']);

  // Empty objects and single properties
  expect(sortDeep({}, (a, b) => a.key.localeCompare(b.key))).toEqual({});
  expect(sortDeep({ single: 'value' }, (a, b) => a.key.localeCompare(b.key))).toEqual({ single: 'value' });

  // Array values (should not be sorted as they're not plain objects)
  const obj5 = {
    z: [3, 1, 2],
    a: { c: 3, b: 2, a: 1 }
  };
  
  const sorted5 = sortDeep(obj5, (a, b) => a.key.localeCompare(b.key));
  expect(Object.keys(sorted5)).toEqual(['a', 'z']);
  expect(sorted5.z).toEqual([3, 1, 2]); // array unchanged
  expect(Object.keys(sorted5.a)).toEqual(['a', 'b', 'c']); // object sorted
});