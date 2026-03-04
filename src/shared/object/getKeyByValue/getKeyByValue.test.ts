import { test, expect } from 'vitest';
import getKeyByValue from './getKeyByValue';

test('getKeyByValue', () => {
  // Basic key-value lookup
  const obj1 = { name: 'John', age: 30, city: 'New York' };
  expect(getKeyByValue(obj1, 'John')).toBe('name');
  expect(getKeyByValue(obj1, 30)).toBe('age');
  expect(getKeyByValue(obj1, 'New York')).toBe('city');

  // Value not found
  expect(getKeyByValue(obj1, 'nonexistent')).toBeUndefined();

  // Multiple keys with same value (returns first match)
  const obj2 = { a: 'duplicate', b: 'duplicate', c: 'unique' };
  expect(getKeyByValue(obj2, 'duplicate')).toBe('a'); // first match
  expect(getKeyByValue(obj2, 'unique')).toBe('c');

  // Different data types
  const obj3 = {
    string: 'text',
    number: 42,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    array: [1, 2, 3],
    object: { nested: 'value' }
  };
  expect(getKeyByValue(obj3, 'text')).toBe('string');
  expect(getKeyByValue(obj3, 42)).toBe('number');
  expect(getKeyByValue(obj3, true)).toBe('boolean');
  expect(getKeyByValue(obj3, null)).toBe('nullValue');
  expect(getKeyByValue(obj3, undefined)).toBe('undefinedValue');

  // Array comparison (reference equality)
  const testArray = [1, 2, 3];
  const obj4 = { arr1: testArray, arr2: [1, 2, 3] };
  expect(getKeyByValue(obj4, testArray)).toBe('arr1');
  expect(getKeyByValue(obj4, [1, 2, 3])).toBeUndefined(); // different reference

  // Object comparison (reference equality)
  const testObject = { nested: 'value' };
  const obj5 = { obj1: testObject, obj2: { nested: 'value' } };
  expect(getKeyByValue(obj5, testObject)).toBe('obj1');
  expect(getKeyByValue(obj5, { nested: 'value' })).toBeUndefined(); // different reference

  // Empty object
  expect(getKeyByValue({}, 'anything')).toBeUndefined();

  // Falsy values
  const obj6 = { zero: 0, emptyString: '', falseValue: false };
  expect(getKeyByValue(obj6, 0)).toBe('zero');
  expect(getKeyByValue(obj6, '')).toBe('emptyString');
  expect(getKeyByValue(obj6, false)).toBe('falseValue');
});