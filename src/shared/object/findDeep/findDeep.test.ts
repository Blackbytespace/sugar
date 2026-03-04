import { test, expect } from 'vitest';
import findDeep from './findDeep';

test('findDeep', () => {
  const testObj = {
    stringProp: 'hello',
    numberProp: 42,
    boolProp: true,
    nested: {
      innerString: 'world',
      innerNumber: 123,
      deepNested: {
        deepString: 'deep',
        deepNumber: 999
      }
    },
    array: [1, 2, 3]
  };

  // Find string values
  const strings = findDeep(testObj, ({ value }) => typeof value === 'string');
  expect(strings).toEqual({
    stringProp: 'hello',
    nested: {
      innerString: 'world',
      deepNested: {
        deepString: 'deep'
      }
    }
  });

  // Find by key pattern
  const deepProps = findDeep(testObj, ({ key }) => key.includes('deep'));
  expect(deepProps).toEqual({
    nested: {
      deepNested: {
        deepString: 'deep',
        deepNumber: 999
      }
    }
  });

  // Find numbers greater than 100
  const largeNumbers = findDeep(testObj, ({ value }) => {
    return typeof value === 'number' && value > 100;
  });
  expect(largeNumbers).toEqual({
    nested: {
      innerNumber: 123,
      deepNested: {
        deepNumber: 999
      }
    }
  });

  // Find array elements (keys are formatted as array[0], array[1], etc.)
  const arrayElements = findDeep(testObj, ({ key }) => {
    return /\[\d+\]/.test(key); // bracket notation with numeric indices
  });
  expect(arrayElements).toEqual({
    array: [1, 2, 3]
  });

  // Find specific value
  const specificValue = findDeep(testObj, ({ value }) => value === 'world');
  expect(specificValue).toEqual({
    nested: {
      innerString: 'world'
    }
  });

  // No matches
  const noMatches = findDeep(testObj, ({ value }) => value === 'nonexistent');
  expect(noMatches).toEqual({});

  // Empty object
  expect(findDeep({}, () => true)).toEqual({});

  // Find all boolean values
  const booleans = findDeep(testObj, ({ value }) => typeof value === 'boolean');
  expect(booleans).toEqual({
    boolProp: true
  });
});