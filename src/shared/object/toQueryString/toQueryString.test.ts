import { test, expect } from 'vitest';
import toQueryString from './toQueryString';

test('toQueryString', () => {
  // Basic key-value pairs
  const obj1 = { name: 'John', age: 30 };
  expect(toQueryString(obj1)).toBe('?name=John&age=30');

  // Empty object
  expect(toQueryString({})).toBe('?');

  // Single property
  expect(toQueryString({ single: 'value' })).toBe('?single=value');

  // URL encoding for special characters
  const obj2 = { 
    message: 'hello world',
    symbols: 'test@example.com',
    spaces: 'multiple   spaces'
  };
  expect(toQueryString(obj2)).toBe('?message=hello%20world&symbols=test%40example.com&spaces=multiple%20%20%20spaces');

  // Numbers and booleans
  const obj3 = {
    number: 42,
    boolean: true,
    zero: 0,
    negative: -10
  };
  expect(toQueryString(obj3)).toBe('?number=42&boolean=true&zero=0&negative=-10');

  // Skip null and undefined values
  const obj4 = {
    keep: 'this',
    skipNull: null,
    skipUndefined: undefined,
    alsoKeep: 'value'
  };
  expect(toQueryString(obj4)).toBe('?keep=this&alsoKeep=value');

  // Empty strings should be included
  const obj5 = {
    empty: '',
    normal: 'value'
  };
  expect(toQueryString(obj5)).toBe('?empty=&normal=value');

  // Special characters that need encoding
  const obj6 = {
    encoded: '100%',
    ampersand: 'a&b',
    equals: 'x=y',
    hash: '#hashtag',
    plus: 'a+b'
  };
  expect(toQueryString(obj6)).toBe('?encoded=100%25&ampersand=a%26b&equals=x%3Dy&hash=%23hashtag&plus=a%2Bb');

  // Objects and arrays get stringified
  const obj7 = {
    array: [1, 2, 3],
    object: { nested: 'value' }
  };
  const result7 = toQueryString(obj7);
  expect(result7).toContain('array=1%2C2%2C3');
  expect(result7).toContain('object=%5Bobject%20Object%5D');

  // Unicode characters
  const obj8 = {
    unicode: '你好',
    emoji: '😀'
  };
  expect(toQueryString(obj8)).toBe('?unicode=%E4%BD%A0%E5%A5%BD&emoji=%F0%9F%98%80');
});