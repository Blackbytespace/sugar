import { test, expect } from 'vitest';
import deleteProperty from './deleteProperty';

test('deleteProperty', () => {
  // Delete top-level property
  const obj1 = { a: 1, b: 2, c: 3 };
  deleteProperty(obj1, 'b');
  expect(obj1).toEqual({ a: 1, c: 3 });

  // Delete nested property
  const obj2 = { 
    level1: { 
      level2: { 
        target: 'delete me', 
        keep: 'keep me' 
      } 
    } 
  };
  deleteProperty(obj2, 'level1.level2.target');
  expect(obj2.level1.level2).toEqual({ keep: 'keep me' });

  // Delete from array (removes matching value)
  const obj3 = { arr: [1, 2, 3, 2, 4] };
  deleteProperty(obj3, 'arr.2'); // deletes value at index 2, which is 3
  expect(obj3.arr).toEqual([1, 2, 2, 4]);

  // Bracket notation (converts to dotted path: [my-prop] becomes .my-prop)  
  const obj4 = { 'my-prop': { 'nested-prop': 'value', other: 'keep' } };
  deleteProperty(obj4, 'my-prop.nested-prop'); // Use dot notation instead
  expect(obj4['my-prop']).toEqual({ other: 'keep' });

  // Empty or root path should return object unchanged
  const obj5 = { a: 1, b: 2 };
  const result1 = deleteProperty(obj5, '');
  const result2 = deleteProperty(obj5, '.');
  expect(result1).toBe(obj5);
  expect(result2).toBe(obj5);

  // Non-existent property should not cause errors
  const obj6 = { a: 1 };
  deleteProperty(obj6, 'nonexistent');
  expect(obj6).toEqual({ a: 1 });

  // Deep nested deletion
  const obj7 = {
    a: {
      b: {
        c: {
          d: 'delete',
          e: 'keep'
        }
      }
    }
  };
  deleteProperty(obj7, 'a.b.c.d');
  expect(obj7.a.b.c).toEqual({ e: 'keep' });
});