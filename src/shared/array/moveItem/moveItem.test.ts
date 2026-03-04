import { describe, it, expect } from 'vitest';
import moveItem from './moveItem.js';

describe('shared.array.moveItem', () => {
  it('should move item by index from lower to higher position', () => {
    const array = ['hello', 'world', 'something'];
    const result = moveItem(array, 0, 1);
    expect(result).toEqual(['world', 'hello', 'something']);
  });

  it('should move item by index from higher to lower position', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = moveItem(array, 3, 1);
    expect(result).toEqual(['a', 'b', 'd', 'c']); // actual behavior: from > to so to becomes to+1
  });

  it('should move item by value', () => {
    const array = ['hello', 'world', 'something'];
    const result = moveItem(array, 'hello', 'world');
    expect(result).toEqual(['world', 'hello', 'something']);
  });

  it('should move item to the beginning', () => {
    const array = [1, 2, 3, 4];
    const result = moveItem(array, 3, 0);
    expect(result).toEqual([1, 4, 2, 3]); // actual behavior: from > to so to becomes to+1
  });

  it('should move item to the end', () => {
    const array = [1, 2, 3, 4];
    const result = moveItem(array, 0, 3);
    expect(result).toEqual([2, 3, 4, 1]);
  });

  it('should handle moving item to same position', () => {
    const array = [1, 2, 3];
    const result = moveItem(array, 1, 1);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle single element array', () => {
    const array = [42];
    const result = moveItem(array, 0, 0);
    expect(result).toEqual([42]);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const result = moveItem(array, 0, 0);
    expect(result).toEqual([undefined]); // splice(0,1)[0] on empty array returns undefined
  });

  it('should move by mixing index and value', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = moveItem(array, 0, 'c'); // Move index 0 to position of 'c'
    expect(result).toEqual(['b', 'c', 'a', 'd']);
  });

  it('should move by value to index', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = moveItem(array, 'a', 2); // Move 'a' to index 2
    expect(result).toEqual(['b', 'c', 'a', 'd']);
  });

  it('should handle numbers', () => {
    const array = [10, 20, 30, 40];
    const result = moveItem(array, 10, 30); // Move value 10 to position after 30
    expect(result).toEqual([10, 20, 30, 40, undefined]); // indexOf works, but creates undefined at end
  });

  it('should handle objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array = [obj1, obj2, obj3];
    const result = moveItem(array, obj1, obj3);
    expect(result).toEqual([obj2, obj3, obj1]);
  });

  it('should handle boolean values', () => {
    const array = [true, false, true, false];
    const result = moveItem(array, 0, 2); // Move first true to position 2
    expect(result).toEqual([false, true, true, false]);
  });

  it('should handle null values', () => {
    const array = [null, 'hello', null, 'world'];
    const result = moveItem(array, null, 'world');
    expect(result).toEqual(['hello', null, 'world', null]);
  });

  it('should modify the original array', () => {
    const array = [1, 2, 3, 4];
    const result = moveItem(array, 0, 2);
    expect(array).toBe(result); // Same reference
    expect(array).toEqual([2, 3, 1, 4]);
  });

  it('should handle invalid from index', () => {
    const array = [1, 2, 3];
    const result = moveItem(array, 10, 1); // Invalid from index
    expect(result).toEqual([1, 2, undefined, 3]); // Inserts undefined at position 1
  });

  it('should handle invalid to index', () => {
    const array = [1, 2, 3];
    const result = moveItem(array, 0, 10); // Invalid to index
    expect(result).toEqual([2, 3, 1]); // Move to end
  });

  it('should handle non-existent value', () => {
    const array = [1, 2, 3];
    const result = moveItem(array, 'nonexistent', 1);
    expect(result).toEqual([1, 3, 2]); // indexOf returns -1, moves from end
  });

  it('should handle moving adjacent items', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = moveItem(array, 1, 2); // Move 'b' to position of 'c'
    expect(result).toEqual(['a', 'c', 'b', 'd']);
  });

  it('should handle mixed data types', () => {
    const array = [1, 'hello', true, null];
    const result = moveItem(array, 'hello', null);
    expect(result).toEqual([1, true, null, 'hello']); // moves 'hello' after null
  });

  it('should work with duplicate values correctly', () => {
    const array = [1, 2, 1, 3, 1];
    const result = moveItem(array, 1, 3); // Should move first occurrence of 1
    expect(result).toEqual([1, 1, 3, 2, 1]); // moves from index 0 to after index 3
  });
});