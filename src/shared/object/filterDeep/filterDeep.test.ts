import { test, expect } from 'vitest';
import filterDeep from './filterDeep';

test('filterDeep', () => {
  const testObj = {
    stringProp: 'hello',
    numberProp: 42,
    boolProp: true,
    nested: {
      innerString: 'world',
      innerNumber: 123,
      deepNested: {
        deepString: 'deep'
      }
    }
  };

  // Filter only string values
  const stringOnly = filterDeep(testObj, ({ value }) => typeof value === 'string');
  // Check that string properties are preserved
  expect(stringOnly).toHaveProperty('stringProp', 'hello');
  expect(typeof stringOnly.stringProp).toBe('string');

  // Filter by key name
  const keyFilter = filterDeep(testObj, ({ key }) => key.includes('number'));
  // Check that properties with "number" in the key are preserved
  expect(keyFilter).toHaveProperty('numberProp', 42);

  // Filter numbers greater than 50
  const numberFilter = filterDeep(testObj, ({ value }) => {
    if (typeof value === 'number') {
      return value > 50;
    }
    return undefined; // keep objects for traversal
  });
  expect(numberFilter).toHaveProperty('nested');
  expect(numberFilter.nested).toHaveProperty('innerNumber', 123);

  // Return false to exclude property
  const excludeBool = filterDeep(testObj, ({ value }) => typeof value !== 'boolean');
  expect(excludeBool).toHaveProperty('stringProp', 'hello');
  expect(excludeBool).toHaveProperty('numberProp', 42);
  expect(excludeBool).not.toHaveProperty('boolProp');

  // Test with clone: false
  const original = { a: 1, b: { c: 2 } };
  const filtered = filterDeep(original, ({ value }) => typeof value === 'number', { clone: false });
  expect(filtered).toHaveProperty('a', 1);

  // Empty object
  expect(filterDeep({}, () => true)).toEqual({});

  // Filter with isObject flag
  const objectFilter = filterDeep(testObj, ({ isObject }) => !isObject);
  expect(objectFilter).toHaveProperty('stringProp', 'hello');
  expect(objectFilter).toHaveProperty('numberProp', 42);
  expect(objectFilter).toHaveProperty('boolProp', true);
});