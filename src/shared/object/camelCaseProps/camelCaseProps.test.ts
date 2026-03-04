import { test, expect } from 'vitest';
import camelCaseProps from './camelCaseProps';

test('camelCaseProps', () => {
  // Basic snake_case to camelCase conversion
  const obj1 = { hello_world: 'test', simple_key: 42 };
  expect(camelCaseProps(obj1)).toEqual({ helloWorld: 'test', simpleKey: 42 });

  // kebab-case to camelCase conversion
  const obj2 = { 'hello-world': 'test', 'simple-key': 42 };
  expect(camelCaseProps(obj2)).toEqual({ helloWorld: 'test', simpleKey: 42 });

  // Deep conversion (default)
  const obj3 = {
    'outer-key': {
      'inner-key': 'value',
      'nested_prop': true
    }
  };
  expect(camelCaseProps(obj3)).toEqual({
    outerKey: {
      innerKey: 'value',
      nestedProp: true
    }
  });

  // Shallow conversion
  const obj4 = {
    'outer-key': {
      'inner-key': 'value'
    }
  };
  expect(camelCaseProps(obj4, { deep: false })).toEqual({
    outerKey: {
      'inner-key': 'value'
    }
  });

  // Already camelCase keys should remain unchanged
  const obj5 = { alreadyCamel: 'test', normalKey: 42 };
  expect(camelCaseProps(obj5)).toEqual({ alreadyCamel: 'test', normalKey: 42 });

  // Mixed key formats
  const obj6 = { 'kebab-case': 1, snake_case: 2, camelCase: 3 };
  expect(camelCaseProps(obj6)).toEqual({ kebabCase: 1, snakeCase: 2, camelCase: 3 });

  // Empty object
  expect(camelCaseProps({})).toEqual({});
});