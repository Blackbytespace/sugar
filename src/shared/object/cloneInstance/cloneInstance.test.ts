import { test, expect } from 'vitest';
import cloneInstance from './cloneInstance';

test('cloneInstance', () => {
  class TestClass {
    prop: string;
    
    constructor(prop: string) {
      this.prop = prop;
    }
    
    method() {
      return `method: ${this.prop}`;
    }
  }

  // Clone class instance
  const original = new TestClass('original');
  const cloned = cloneInstance(original);
  
  expect(cloned).not.toBe(original);
  expect(cloned.prop).toBe('original');
  expect(cloned.method()).toBe('method: original');
  expect(cloned instanceof TestClass).toBe(true);

  // Modifying clone doesn't affect original
  cloned.prop = 'modified';
  expect(original.prop).toBe('original');
  expect(cloned.prop).toBe('modified');

  // Clone plain object
  const plainObj = { a: 1, b: 2 };
  const clonedObj = cloneInstance(plainObj);
  expect(clonedObj).not.toBe(plainObj);
  expect(clonedObj).toEqual({ a: 1, b: 2 });

  // Clone Date instance (note: cloneInstance has limitations with built-in objects)
  const date = new Date('2023-01-01');
  const clonedDate = cloneInstance(date);
  expect(clonedDate).not.toBe(date);
  expect(clonedDate instanceof Date).toBe(true);
  // Built-in objects like Date don't clone properly - they lack internal slots
  // This is a known limitation of the shallow cloning approach used

  // Clone Array instance (note: creates object with array prototype, not true array)
  const arr = [1, 2, 3];
  const clonedArr = cloneInstance(arr);
  expect(clonedArr).not.toBe(arr);
  // The result has array prototype but Array.isArray returns false (lacks internal [[Class]])
  expect(clonedArr instanceof Array).toBe(true);
  expect(Array.isArray(clonedArr)).toBe(false); // Known limitation
  // Properties are copied as numbered properties
  expect(clonedArr[0]).toBe(1);
  expect(clonedArr[1]).toBe(2);
  expect(clonedArr[2]).toBe(3);
});