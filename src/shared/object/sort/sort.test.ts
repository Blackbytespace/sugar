import { test, expect } from 'vitest';
import sort from './sort';

test('sort', () => {
  // Default alphabetical sort by keys
  const obj1 = { c: 1, a: 2, b: 3 };
  expect(sort(obj1)).toEqual({ a: 2, b: 3, c: 1 });

  // Custom sort by value (ascending)
  const obj2 = {
    item1: { weight: 10 },
    item2: { weight: 2 },
    item3: { weight: 5 }
  };
  const sorted2 = sort(obj2, (a, b) => a.value.weight - b.value.weight);
  expect(Object.keys(sorted2)).toEqual(['item2', 'item3', 'item1']);
  expect(sorted2).toEqual({
    item2: { weight: 2 },
    item3: { weight: 5 },
    item1: { weight: 10 }
  });

  // Custom sort by value (descending)
  const obj3 = {
    low: 10,
    high: 100,
    medium: 50
  };
  const sorted3 = sort(obj3, (a, b) => b.value - a.value);
  expect(Object.keys(sorted3)).toEqual(['high', 'medium', 'low']);

  // Sort by key length
  const obj4 = {
    verylongkey: 1,
    short: 2,
    mediumkey: 3,
    a: 4
  };
  const sorted4 = sort(obj4, (a, b) => a.key.length - b.key.length);
  expect(Object.keys(sorted4)).toEqual(['a', 'short', 'mediumkey', 'verylongkey']);

  // Sort strings alphabetically (case sensitive)
  const obj5 = {
    Zebra: 'animal',
    apple: 'fruit',
    Banana: 'fruit',
    cat: 'animal'
  };
  const sorted5 = sort(obj5, (a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });
  expect(Object.keys(sorted5)).toEqual(['Banana', 'Zebra', 'apple', 'cat']);

  // Sort strings case insensitive
  const sorted5b = sort(obj5, (a, b) => {
    const aLower = a.key.toLowerCase();
    const bLower = b.key.toLowerCase();
    if (aLower < bLower) return -1;
    if (aLower > bLower) return 1;
    return 0;
  });
  expect(Object.keys(sorted5b)).toEqual(['apple', 'Banana', 'cat', 'Zebra']);

  // Complex sort with multiple criteria
  const obj6 = {
    user1: { name: 'John', age: 30 },
    user2: { name: 'Jane', age: 25 },
    user3: { name: 'John', age: 20 },
    user4: { name: 'Bob', age: 35 }
  };
  const sorted6 = sort(obj6, (a, b) => {
    // First sort by name, then by age
    if (a.value.name !== b.value.name) {
      return a.value.name.localeCompare(b.value.name);
    }
    return a.value.age - b.value.age;
  });
  expect(Object.keys(sorted6)).toEqual(['user4', 'user2', 'user3', 'user1']);

  // Empty object
  expect(sort({})).toEqual({});

  // Single property
  const single = { onlyOne: 'value' };
  expect(sort(single)).toEqual({ onlyOne: 'value' });

  // Numeric string keys
  const obj7 = { '10': 'ten', '2': 'two', '1': 'one' };
  expect(sort(obj7)).toEqual({ '1': 'one', '10': 'ten', '2': 'two' }); // alphabetical

  // Sort numeric string keys numerically
  const sorted7 = sort(obj7, (a, b) => parseInt(a.key) - parseInt(b.key));
  expect(Object.keys(sorted7)).toEqual(['1', '2', '10']);
});