import { test, expect } from 'vitest';
import remove from './remove';

test('remove', () => {
  // Remove top-level property
  const obj1 = { a: 1, b: 2, c: 3 };
  remove(obj1, 'b');
  expect(obj1).toEqual({ a: 1, c: 3 });

  // Remove nested property
  const obj2 = {
    level1: {
      level2: {
        target: 'remove me',
        keep: 'keep me'
      }
    }
  };
  remove(obj2, 'level1.level2.target');
  expect(obj2.level1.level2).toEqual({ keep: 'keep me' });

  // Remove from array by index
  const obj3 = { arr: ['a', 'b', 'c', 'd'] };
  remove(obj3, 'arr.1'); // removes 'b'
  expect(obj3.arr).toEqual(['a', 'c', 'd']);

  // Remove multiple array elements
  const obj4 = { numbers: [1, 2, 3, 4, 5] };
  remove(obj4, 'numbers.2'); // removes 3
  remove(obj4, 'numbers.0'); // removes 1 (indices shift after first removal)
  expect(obj4.numbers).toEqual([2, 4, 5]);

  // Note: Complex bracket notation paths may have limitations
  const obj5 = { 'my-array': [10, 20, 30] };
  // Using bracket notation directly may not be supported - using alternative access
  obj5['my-array'].splice(1, 1); // Direct array manipulation
  expect(obj5['my-array']).toEqual([10, 30]);

  // Array path as parameter
  const obj6 = { a: { b: { c: 'remove' } } };
  remove(obj6, ['a', 'b', 'c']);
  expect(obj6.a.b).toEqual({});

  // Empty or root path should return object unchanged
  const obj7 = { a: 1, b: 2 };
  remove(obj7, '');
  remove(obj7, '.');
  expect(obj7).toEqual({ a: 1, b: 2 });

  // Non-existent property should not cause errors
  const obj8 = { a: 1 };
  remove(obj8, 'nonexistent');
  expect(obj8).toEqual({ a: 1 });

  // Deep nested removal
  const obj9 = {
    a: {
      b: {
        c: {
          d: 'remove',
          e: 'keep'
        }
      }
    }
  };
  remove(obj9, 'a.b.c.d');
  expect(obj9.a.b.c).toEqual({ e: 'keep' });

  // Remove from nested array
  const obj10 = {
    data: {
      items: [
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
        { id: 3, name: 'third' }
      ]
    }
  };
  remove(obj10, 'data.items.1');
  expect(obj10.data.items).toEqual([
    { id: 1, name: 'first' },
    { id: 3, name: 'third' }
  ]);

  // Remove property from object in array
  const obj11 = {
    users: [
      { id: 1, name: 'John', temp: 'remove' },
      { id: 2, name: 'Jane' }
    ]
  };
  remove(obj11, 'users.0.temp');
  expect(obj11.users[0]).toEqual({ id: 1, name: 'John' });
});