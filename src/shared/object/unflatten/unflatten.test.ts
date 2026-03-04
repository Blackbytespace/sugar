import { test, expect } from 'vitest';
import unflatten from './unflatten';

test('unflatten', () => {
  // Basic unflatten
  const flat1 = { 'a.b.c': 'value' };
  expect(unflatten(flat1)).toEqual({ a: { b: { c: 'value' } } });

  // Multiple nested properties
  const flat2 = {
    'user.name': 'John',
    'user.age': 30,
    'user.address.street': '123 Main St',
    'user.address.city': 'New York'
  };
  expect(unflatten(flat2)).toEqual({
    user: {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York'
      }
    }
  });

  // Array indices
  const flat3 = {
    'items.0': 'first',
    'items.1': 'second',
    'items.2': 'third'
  };
  expect(unflatten(flat3)).toEqual({
    items: ['first', 'second', 'third']
  });

  // Mixed arrays and objects
  const flat4 = {
    'users.0.name': 'John',
    'users.0.age': 30,
    'users.1.name': 'Jane',
    'users.1.age': 25,
    'meta.count': 2
  };
  expect(unflatten(flat4)).toEqual({
    users: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ],
    meta: { count: 2 }
  });

  // Single level (no dots)
  const flat5 = { name: 'John', age: 30 };
  expect(unflatten(flat5)).toEqual({ name: 'John', age: 30 });

  // Empty object
  expect(unflatten({})).toEqual({});

  // Deep nesting
  const flat6 = { 'a.b.c.d.e.f.g': 'deep' };
  expect(unflatten(flat6)).toEqual({
    a: { b: { c: { d: { e: { f: { g: 'deep' } } } } } }
  });

  // Complex array structure
  const flat7 = {
    'matrix.0.0': 1,
    'matrix.0.1': 2,
    'matrix.1.0': 3,
    'matrix.1.1': 4
  };
  expect(unflatten(flat7)).toEqual({
    matrix: [[1, 2], [3, 4]]
  });

  // Different data types
  const flat8 = {
    'data.string': 'text',
    'data.number': 42,
    'data.boolean': true,
    'data.null': null,
    'data.array.0': 'item1',
    'data.array.1': 'item2'
  };
  expect(unflatten(flat8)).toEqual({
    data: {
      string: 'text',
      number: 42,
      boolean: true,
      null: null,
      array: ['item1', 'item2']
    }
  });
});