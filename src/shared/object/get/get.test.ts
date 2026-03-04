import { test, expect } from 'vitest';
import get from './get';

test('get', () => {
  const obj = {
    a: {
      b: {
        c: 'value'
      }
    },
    x: 42,
    'y.z': 'quoted'
  };

  // Basic dotted path
  expect(get(obj, 'a.b.c')).toBe('value');
  expect(get(obj, 'x')).toBe(42);
  expect(get(obj, 'nonexistent')).toBeUndefined();

  // Array path
  expect(get(obj, ['a', 'b', 'c'])).toBe('value');

  // Root path
  expect(get(obj, '.')).toBe(obj);
  expect(get(obj, '')).toBe(obj);

  // Quoted paths
  expect(get(obj, '"y.z"')).toBe('quoted');
});