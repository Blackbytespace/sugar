import { test, expect } from 'vitest';
import decycle from './decycle';

test('decycle', () => {
  // Object with circular reference
  const obj: any = { a: 1, b: 2 };
  obj.self = obj;
  
  const decycled = decycle(obj);
  expect(decycled.a).toBe(1);
  expect(decycled.b).toBe(2);
  expect(decycled.self).toEqual({ "$ref": "$" }); // json-cyclic replaces with $ref

  // Nested circular reference
  const parent: any = { name: 'parent' };
  const child: any = { name: 'child', parent };
  parent.child = child;
  
  const decycledParent = decycle(parent);
  expect(decycledParent.name).toBe('parent');
  expect(decycledParent.child.name).toBe('child');
  expect(decycledParent.child.parent).toEqual({ "$ref": "$" });

  // Object without circular references should remain unchanged
  const simple = { a: 1, nested: { b: 2 } };
  const decycledSimple = decycle(simple);
  expect(decycledSimple).toEqual({ a: 1, nested: { b: 2 } });
});