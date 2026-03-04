import { test, expect } from 'vitest';
import map from './map';

test('map', () => {
  // Basic mapping with value transformation
  const obj1 = { a: 1, b: 2, c: 3 };
  const result1 = map(obj1, ({ value }) => value * 2);
  expect(result1).toEqual({ a: 2, b: 4, c: 6 });

  // Mapping with key-based logic
  const obj2 = { name: 'john', age: 30, city: 'paris' };
  const result2 = map(obj2, ({ value, key }) => {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  });
  expect(result2).toEqual({ name: 'JOHN', age: 30, city: 'PARIS' });

  // Conditional transformation based on index
  const obj3 = { first: 'a', second: 'b', third: 'c' };
  const result3 = map(obj3, ({ value, i }) => {
    return i === 0 ? `${value}-first` : value;
  });
  expect(result3).toEqual({ first: 'a-first', second: 'b', third: 'c' });

  // Delete properties by returning -1
  const obj4 = { keep1: 'value1', delete: 'remove', keep2: 'value2' };
  const result4 = map(obj4, ({ key, value }) => {
    return key === 'delete' ? -1 : value;
  });
  expect(result4).toEqual({ keep1: 'value1', keep2: 'value2' });

  // Complex transformation using all parameters
  const obj5 = { x: 10, y: 20, z: 30 };
  const result5 = map(obj5, ({ value, key, prop, i, idx }) => {
    expect(key).toBe(prop); // key and prop should be the same
    expect(i).toBe(idx); // i and idx should be the same
    return `${key}:${value}:${i}`;
  });
  expect(result5).toEqual({ x: 'x:10:0', y: 'y:20:1', z: 'z:30:2' });

  // Empty object
  const result6 = map({}, ({ value }) => value);
  expect(result6).toEqual({});

  // Object with different data types
  const obj7 = {
    str: 'hello',
    num: 42,
    bool: true,
    arr: [1, 2, 3],
    obj: { nested: 'value' }
  };
  const result7 = map(obj7, ({ value, key }) => {
    if (key === 'str') return value.toUpperCase();
    if (key === 'num') return value + 10;
    if (key === 'bool') return !value;
    return value; // keep arrays and objects as-is
  });
  expect(result7).toEqual({
    str: 'HELLO',
    num: 52,
    bool: false,
    arr: [1, 2, 3],
    obj: { nested: 'value' }
  });
});