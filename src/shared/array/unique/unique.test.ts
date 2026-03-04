import { describe, it, expect } from 'vitest';
import unique from './unique.js';

describe('shared.array.unique', () => {
  it('should remove duplicates from array of strings', () => {
    const input = ['hello', 'world', 'hello', 'world'];
    const result = unique(input);
    expect(result).toEqual(['hello', 'world']);
  });

  it('should remove duplicates from array of numbers', () => {
    const input = [1, 2, 3, 2, 1, 4];
    const result = unique(input);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty array', () => {
    const input: any[] = [];
    const result = unique(input);
    expect(result).toEqual([]);
  });

  it('should handle array with no duplicates', () => {
    const input = [1, 2, 3, 4];
    const result = unique(input);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle array with mixed types', () => {
    const input = [1, '1', 2, '2', 1, '1'];
    const result = unique(input);
    expect(result).toEqual([1, '1', 2, '2']);
  });

  it('should handle array with null and undefined', () => {
    const input = [1, null, 2, undefined, null, 1, undefined];
    const result = unique(input);
    expect(result).toEqual([1, null, 2, undefined]);
  });

  it('should handle objects without stringify option', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const input = [obj1, obj2, obj1];
    const result = unique(input);
    // Without stringify, objects are compared by reference
    expect(result).toEqual([obj1, obj2]);
  });

  it('should deduplicate objects with stringify option', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { a: 2, b: 3 };
    const input = [obj1, obj2, obj3, obj1];
    const result = unique(input, { stringify: true });
    expect(result).toEqual([obj1, obj3]);
  });

  it('should handle mixed objects and primitives with stringify option', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const input = [1, obj1, '1', obj2, 1];
    const result = unique(input, { stringify: true });
    expect(result).toEqual([1, obj1, '1']);
  });

  it('should preserve original array order', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    const result = unique(input);
    expect(result).toEqual([3, 1, 4, 5, 9, 2, 6]);
  });

  it('should not modify the original array', () => {
    const input = [1, 2, 2, 3];
    const originalInput = [...input];
    unique(input);
    expect(input).toEqual(originalInput);
  });

  it('should handle nested objects with stringify option', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 1 } };
    const obj3 = { a: { b: 2 } };
    const input = [obj1, obj2, obj3];
    const result = unique(input, { stringify: true });
    expect(result).toEqual([obj1, obj3]);
  });
});