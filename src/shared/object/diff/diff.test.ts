import { test, expect } from 'vitest';
import diff from './diff';

test('diff', () => {
  // Basic difference detection
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { a: 1, b: 'changed', d: 'new' };
  
  expect(diff(obj1, obj2)).toEqual({ b: 'changed', d: 'new' });

  // Deep nested differences
  const nested1 = {
    level1: {
      a: 1,
      level2: { x: 'old', y: 2 }
    }
  };
  const nested2 = {
    level1: {
      a: 1,
      level2: { x: 'new', z: 3 }
    }
  };
  expect(diff(nested1, nested2)).toEqual({
    level1: {
      level2: { x: 'new', z: 3 }
    }
  });

  // Include deleted properties
  expect(diff(obj1, obj2, { deleted: true })).toEqual({
    b: 'changed',
    c: 3, // deleted property
    d: 'new'
  });

  // Include equal properties
  expect(diff(obj1, obj2, { equals: true })).toEqual({
    a: 1, // equal property
    b: 'changed',
    d: 'new'
  });

  // Exclude added properties
  expect(diff(obj1, obj2, { added: false })).toEqual({
    b: 'changed'
  });

  // Exclude updated properties
  expect(diff(obj1, obj2, { updated: false })).toEqual({
    d: 'new'
  });

  // Shallow diff (not deep)
  const shallow1 = { nested: { a: 1, b: 2 } };
  const shallow2 = { nested: { a: 1, c: 3 } };
  expect(diff(shallow1, shallow2, { deep: false })).toEqual({
    nested: { a: 1, c: 3 }
  });

  // Empty objects
  expect(diff({}, {})).toEqual({});
  expect(diff({ a: 1 }, {})).toEqual({});
  expect(diff({}, { a: 1 })).toEqual({ a: 1 });

  // Include empty objects (includes empty objects from object1 when emptyObject: true)
  const withEmpty1 = { a: { nested: 'value' }, b: {} };
  const withEmpty2 = { a: { nested: 'value' }, c: 'new' };
  expect(diff(withEmpty1, withEmpty2, { emptyObject: true })).toEqual({
    b: {}, // empty object from object1 is included due to emptyObject: true
    c: 'new'
  });
});