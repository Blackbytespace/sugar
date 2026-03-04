import { describe, it, expect } from 'vitest';
import keysFirst from './keysFirst.js';

describe('shared.array.keysFirst', () => {
  it('should move specified keys to the beginning of array', () => {
    const array = ['a', 'b', 'd', 'g', 'c'];
    const keys = ['d', 'g'];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['d', 'g', 'a', 'b', 'c']);
  });

  it('should handle keys not in array', () => {
    const array = ['a', 'b', 'c'];
    const keys = ['x', 'y', 'a'];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty keys array', () => {
    const array = ['a', 'b', 'c'];
    const keys: any[] = [];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const keys = ['a', 'b'];
    const result = keysFirst(array, keys);
    expect(result).toEqual([]);
  });

  it('should handle both empty array and keys', () => {
    const array: any[] = [];
    const keys: any[] = [];
    const result = keysFirst(array, keys);
    expect(result).toEqual([]);
  });

  it('should remove duplicates when keys already exist in array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const keys = ['b', 'd', 'b']; // duplicate key
    const result = keysFirst(array, keys);
    expect(result).toEqual(['b', 'd', 'a', 'c']);
  });

  it('should maintain order of keys in final result', () => {
    const array = ['x', 'y', 'z', 'a', 'b'];
    const keys = ['z', 'a', 'x'];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['z', 'a', 'x', 'y', 'b']);
  });

  it('should work with number arrays', () => {
    const array = [1, 2, 3, 4, 5];
    const keys = [4, 2];
    const result = keysFirst(array, keys);
    expect(result).toEqual([4, 2, 1, 3, 5]);
  });

  it('should work with mixed type arrays', () => {
    const array = ['a', 1, true, null];
    const keys = [true, 'a'];
    const result = keysFirst(array, keys);
    expect(result).toEqual([true, 'a', 1, null]);
  });

  it('should handle keys that are all in array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const keys = ['c', 'a', 'b', 'd'];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['c', 'a', 'b', 'd']);
  });

  it('should not modify original arrays', () => {
    const array = ['a', 'b', 'c'];
    const keys = ['b', 'a'];
    const originalArray = [...array];
    const originalKeys = [...keys];
    
    keysFirst(array, keys);
    
    expect(array).toEqual(originalArray);
    expect(keys).toEqual(originalKeys);
  });

  it('should handle single element arrays', () => {
    const array = ['a'];
    const keys = ['a'];
    const result = keysFirst(array, keys);
    expect(result).toEqual(['a']);
  });
});