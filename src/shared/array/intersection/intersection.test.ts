import { describe, it, expect } from 'vitest';
import intersection from './intersection.js';

describe('shared.array.intersection', () => {
  it('should return intersection of two arrays', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [1, 3, 5];
    const result = intersection(array1, array2);
    expect(result).toEqual([1, 3]);
  });

  it('should return empty array when no intersection', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const result = intersection(array1, array2);
    expect(result).toEqual([]);
  });

  it('should handle empty arrays', () => {
    const array1: any[] = [];
    const array2 = [1, 2, 3];
    const result = intersection(array1, array2);
    expect(result).toEqual([]);
  });

  it('should handle both arrays empty', () => {
    const array1: any[] = [];
    const array2: any[] = [];
    const result = intersection(array1, array2);
    expect(result).toEqual([]);
  });

  it('should work with string arrays', () => {
    const array1 = ['a', 'b', 'c'];
    const array2 = ['b', 'c', 'd'];
    const result = intersection(array1, array2);
    expect(result).toEqual(['b', 'c']);
  });

  it('should handle mixed type arrays', () => {
    const array1 = [1, 'a', true, null];
    const array2 = ['a', 2, true, undefined];
    const result = intersection(array1, array2);
    expect(result).toEqual(['a', true]);
  });

  it('should remove duplicates from result', () => {
    const array1 = [1, 1, 2, 3];
    const array2 = [1, 1, 2, 4];
    const result = intersection(array1, array2);
    expect(result).toEqual([1, 2]);
  });

  it('should handle multiple arrays', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [2, 3, 4, 5];
    const array3 = [3, 4, 5, 6];
    const result = intersection(array1, array2, array3);
    expect(result).toEqual([3, 4]);
  });

  it('should handle objects with hash comparison enabled', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { c: 3 };
    const array1 = [obj1, obj3];
    const array2 = [obj2, { d: 4 }];
    const result = intersection(array1, array2, { hash: true });
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ a: 1, b: 2 });
  });

  it('should handle objects with reference comparison only', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const array1 = [obj1, 'test'];
    const array2 = [obj2, 'test', obj1];
    const result = intersection(array1, array2, { hash: false, references: true });
    expect(result).toEqual([obj1, 'test']); // maintains order from first array
  });

  it('should handle arrays with null and undefined', () => {
    const array1 = [null, undefined, 1, 2];
    const array2 = [null, 3, 4];
    const result = intersection(array1, array2);
    expect(result).toEqual([null]);
  });

  it('should work with settings object passed', () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const result = intersection(array1, array2, { references: true, hash: true });
    expect(result).toEqual([2, 3]);
  });

  it('should handle single array', () => {
    const array1 = [1, 2, 3];
    const result = intersection(array1);
    expect(result).toEqual([]); // no second array to intersect with
  });

  it('should handle no arrays passed', () => {
    const result = intersection();
    expect(result).toEqual([]);
  });

  it('should ignore non-array arguments except settings object', () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const result = intersection(array1, 'not-array', array2, 42);
    expect(result).toEqual([2, 3]);
  });

  it('should maintain order from first array', () => {
    const array1 = [3, 1, 4, 2];
    const array2 = [1, 2, 5, 3];
    const result = intersection(array1, array2);
    expect(result).toEqual([3, 1, 2]);
  });

  it('should handle arrays with boolean values', () => {
    const array1 = [true, false, 1, 0];
    const array2 = [false, true, 2, 1];
    const result = intersection(array1, array2);
    expect(result).toEqual([true, false, 1]);
  });
});