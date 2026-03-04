import { describe, it, expect } from 'vitest';
import splitEvery from './splitEvery.js';

describe('shared.array.splitEvery', () => {
  it('should split array into chunks of specified size', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = splitEvery(input, 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('should handle arrays not evenly divisible by chunk size', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = splitEvery(input, 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]]);
  });

  it('should handle chunk size larger than array length', () => {
    const input = [1, 2, 3];
    const result = splitEvery(input, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size of 1', () => {
    const input = [1, 2, 3, 4];
    const result = splitEvery(input, 1);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });

  it('should handle empty array', () => {
    const input: any[] = [];
    const result = splitEvery(input, 3);
    expect(result).toEqual([]);
  });

  it('should handle chunk size equal to array length', () => {
    const input = [1, 2, 3, 4];
    const result = splitEvery(input, 4);
    expect(result).toEqual([[1, 2, 3, 4]]);
  });

  it('should work with string arrays', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const result = splitEvery(input, 2);
    expect(result).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
  });

  it('should work with mixed type arrays', () => {
    const input = [1, 'a', true, null, undefined, {}];
    const result = splitEvery(input, 2);
    expect(result).toEqual([[1, 'a'], [true, null], [undefined, {}]]);
  });

  it('should not modify the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const originalInput = [...input];
    splitEvery(input, 2);
    expect(input).toEqual(originalInput);
  });

  it('should handle array with single element', () => {
    const input = [42];
    const result = splitEvery(input, 3);
    expect(result).toEqual([[42]]);
  });

  it('should handle large chunk size with single element', () => {
    const input = [1];
    const result = splitEvery(input, 100);
    expect(result).toEqual([[1]]);
  });
});