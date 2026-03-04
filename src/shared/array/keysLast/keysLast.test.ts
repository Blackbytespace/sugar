import { describe, it, expect } from 'vitest';
import keysLast from './keysLast.js';

describe('shared.array.keysLast', () => {
  it('should move specified keys to the end of array', () => {
    const array = ['a', 'b', 'd', 'g', 'c'];
    const keys = ['d', 'g'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['a', 'b', 'c', 'd', 'g']);
  });

  it('should handle keys not in array', () => {
    const array = ['a', 'b', 'c'];
    const keys = ['x', 'y', 'a'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['b', 'c', 'a']);
  });

  it('should handle empty keys array', () => {
    const array = ['a', 'b', 'c'];
    const keys: any[] = [];
    const result = keysLast(array, keys);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const keys = ['a', 'b'];
    const result = keysLast(array, keys);
    expect(result).toEqual([]);
  });

  it('should handle both empty array and keys', () => {
    const array: any[] = [];
    const keys: any[] = [];
    const result = keysLast(array, keys);
    expect(result).toEqual([]);
  });

  it('should remove duplicates when keys already exist in array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const keys = ['b', 'd', 'b']; // duplicate key
    const result = keysLast(array, keys);
    expect(result).toEqual(['a', 'c', 'd', 'b']); // actual behavior: processes duplicates 
  });

  it('should maintain order of keys at the end', () => {
    const array = ['x', 'y', 'z', 'a', 'b'];
    const keys = ['z', 'a', 'x'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['y', 'b', 'z', 'a', 'x']);
  });

  it('should work with number arrays', () => {
    const array = [1, 2, 3, 4, 5];
    const keys = [4, 2];
    const result = keysLast(array, keys);
    expect(result).toEqual([1, 3, 5, 4, 2]);
  });

  it('should work with mixed type arrays', () => {
    const array = ['a', 1, true, null];
    const keys = [true, 'a'];
    const result = keysLast(array, keys);
    expect(result).toEqual([1, null, true, 'a']);
  });

  it('should handle keys that are all in array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const keys = ['c', 'a', 'b', 'd'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['c', 'a', 'b', 'd']);
  });

  it('should not modify original arrays', () => {
    const array = ['a', 'b', 'c'];
    const keys = ['b', 'a'];
    const originalArray = [...array];
    const originalKeys = [...keys];
    
    keysLast(array, keys);
    
    expect(array).toEqual(originalArray);
    expect(keys).toEqual(originalKeys);
  });

  it('should handle single element arrays', () => {
    const array = ['a'];
    const keys = ['a'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['a']);
  });

  it('should preserve order when keys are already at the end', () => {
    const array = ['a', 'b', 'c', 'd'];
    const keys = ['c', 'd'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should handle keys in reverse order', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const keys = ['e', 'd', 'c'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['a', 'b', 'e', 'd', 'c']);
  });

  it('should handle all elements as keys', () => {
    const array = ['a', 'b', 'c'];
    const keys = ['c', 'b', 'a'];
    const result = keysLast(array, keys);
    expect(result).toEqual(['c', 'b', 'a']);
  });
});