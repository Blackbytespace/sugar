import { test, expect } from 'vitest';
import toPlainObject from './toPlainObject';

test('toPlainObject', () => {
  // Basic plain object (should pass through unchanged)
  const plain = { a: 1, b: 'test', c: true };
  expect(toPlainObject(plain)).toEqual(plain);
  expect(toPlainObject(plain)).not.toBe(plain); // should be a new object

  // Object with getters and setters
  const objWithAccessors = {};
  Object.defineProperty(objWithAccessors, 'computed', {
    get() { return 'computed value'; },
    enumerable: true
  });
  Object.defineProperty(objWithAccessors, 'setter', {
    set(val) { 
      // Make _value non-enumerable so it doesn't appear in plain object conversion
      Object.defineProperty(this, '_value', { 
        value: val, 
        writable: true, 
        enumerable: false 
      }); 
    },
    get() { return this._value; },
    enumerable: true
  });
  (objWithAccessors as any).setter = 'test';
  (objWithAccessors as any).normal = 'normal prop';

  const plainObj = toPlainObject(objWithAccessors);
  expect(plainObj).toEqual({
    computed: 'computed value',
    setter: 'test',
    normal: 'normal prop'
  });

  // Nested objects with deep processing (default)
  const nested = {
    level1: {
      normal: 'value',
      level2: {}
    }
  };
  
  // Add getter to nested object
  Object.defineProperty(nested.level1.level2, 'deepComputed', {
    get() { return 'deep value'; },
    enumerable: true
  });

  const nestedPlain = toPlainObject(nested);
  expect(nestedPlain).toEqual({
    level1: {
      normal: 'value',
      level2: {
        deepComputed: 'deep value'
      }
    }
  });

  // Shallow processing
  const shallowResult = toPlainObject(nested, { deep: false });
  expect(shallowResult.level1.level2).toBe(nested.level1.level2); // reference should be same for shallow

  // Array handling
  const withArray = {
    items: [1, 2, 3],
    nested: {
      array: ['a', 'b']
    }
  };
  expect(toPlainObject(withArray)).toEqual(withArray);

  // Non-enumerable properties should not be included
  const objWithNonEnum = { visible: 'yes' };
  Object.defineProperty(objWithNonEnum, 'hidden', {
    value: 'hidden value',
    enumerable: false
  });
  
  const plainWithNonEnum = toPlainObject(objWithNonEnum);
  expect(plainWithNonEnum).toEqual({ visible: 'yes' });
  expect(plainWithNonEnum).not.toHaveProperty('hidden');

  // Date objects and other built-ins
  const withDate = {
    date: new Date('2023-01-01'),
    regex: /test/g,
    number: 42
  };
  const plainWithDate = toPlainObject(withDate);
  expect(plainWithDate.date).toBeInstanceOf(Date);
  expect(plainWithDate.regex).toBeInstanceOf(RegExp);
  expect(plainWithDate.number).toBe(42);

  // Empty object
  expect(toPlainObject({})).toEqual({});

  // Null and undefined
  expect(toPlainObject(null)).toEqual({});
  expect(toPlainObject(undefined)).toEqual({});
});