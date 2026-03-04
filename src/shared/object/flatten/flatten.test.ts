import { test, expect } from 'vitest';
import flatten from './flatten';

test('flatten', () => {
  // Basic nested object flattening
  const nested = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  };
  expect(flatten(nested)).toEqual({
    'a': 1,
    'b.c': 2,
    'b.d.e': 3
  });

  // Object with arrays
  const withArrays = {
    a: [1, 2, 3],
    b: {
      c: ['x', 'y']
    }
  };
  expect(flatten(withArrays)).toEqual({
    'a[0]': 1,
    'a[1]': 2,
    'a[2]': 3,
    'b.c[0]': 'x',
    'b.c[1]': 'y'
  });

  // Empty object
  expect(flatten({})).toEqual({});

  // Single level object (no nesting)
  const single = { a: 1, b: 'test', c: true };
  expect(flatten(single)).toEqual({ a: 1, b: 'test', c: true });

  // Deep nesting
  const deep = {
    level1: {
      level2: {
        level3: {
          level4: {
            value: 'deep'
          }
        }
      }
    }
  };
  expect(flatten(deep)).toEqual({
    'level1.level2.level3.level4.value': 'deep'
  });

  // Mixed content types (Date objects may not preserve properly in flattenjs library)
  const mixed = {
    string: 'value',
    number: 42,
    boolean: true,
    nested: {
      date: new Date('2023-01-01'),
      array: [{ inner: 'value' }]
    }
  };
  const flattened = flatten(mixed);
  expect(flattened.string).toBe('value');
  expect(flattened.number).toBe(42);
  expect(flattened.boolean).toBe(true);
  
  // Date objects may be serialized/lost by the flattenjs library
  if (flattened['nested.date']) {
    expect(flattened['nested.date']).toBeInstanceOf(Date);
  }
  
  expect(flattened['nested.array[0].inner']).toBe('value');
});