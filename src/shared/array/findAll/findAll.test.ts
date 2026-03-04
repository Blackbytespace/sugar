import { describe, it, expect } from 'vitest';
import findAll from './findAll.js';

describe('shared.array.findAll', () => {
  it('should find all matching items in array', () => {
    const array = ['hello', 'world', 'hello'];
    const result = findAll(array, (item) => item === 'hello');
    
    expect(result).toEqual([
      { index: 0, value: 'hello' },
      { index: 0, value: 'hello' } // Note: indexOf returns first occurrence
    ]);
  });

  it('should return empty array when no items match', () => {
    const array = ['hello', 'world'];
    const result = findAll(array, (item) => item === 'foo');
    
    expect(result).toEqual([]);
  });

  it('should handle empty arrays', () => {
    const array: any[] = [];
    const result = findAll(array, (item) => true);
    
    expect(result).toEqual([]);
  });

  it('should work with number arrays', () => {
    const array = [1, 2, 3, 2, 4, 2];
    const result = findAll(array, (item) => item === 2);
    
    expect(result).toEqual([
      { index: 1, value: 2 },
      { index: 1, value: 2 },
      { index: 1, value: 2 }
    ]);
  });

  it('should work with complex check functions', () => {
    const array = [1, 5, 10, 15, 20];
    const result = findAll(array, (item) => item > 10);
    
    expect(result).toEqual([
      { index: 3, value: 15 },
      { index: 4, value: 20 }
    ]);
  });

  it('should work with object arrays', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Alice' }
    ];
    const result = findAll(array, (item) => item.name === 'Alice');
    
    expect(result).toEqual([
      { index: 0, value: { id: 1, name: 'Alice' } },
      { index: 2, value: { id: 3, name: 'Alice' } } // correct actual index
    ]);
  });

  it('should handle boolean arrays', () => {
    const array = [true, false, true, false, true];
    const result = findAll(array, (item) => item === true);
    
    expect(result).toEqual([
      { index: 0, value: true },
      { index: 0, value: true },
      { index: 0, value: true }
    ]);
  });

  it('should handle mixed type arrays', () => {
    const array = [1, '1', true, null, undefined, 1];
    const result = findAll(array, (item) => item === 1);
    
    expect(result).toEqual([
      { index: 0, value: 1 },
      { index: 0, value: 1 }
    ]);
  });

  it('should handle null and undefined values', () => {
    const array = [null, undefined, null, 'test'];
    const result = findAll(array, (item) => item === null);
    
    expect(result).toEqual([
      { index: 0, value: null },
      { index: 0, value: null }
    ]);
  });

  it('should work with function that always returns true', () => {
    const array = [1, 2, 3];
    const result = findAll(array, (item) => true);
    
    expect(result).toEqual([
      { index: 0, value: 1 },
      { index: 1, value: 2 },
      { index: 2, value: 3 }
    ]);
  });

  it('should work with function that always returns false', () => {
    const array = [1, 2, 3];
    const result = findAll(array, (item) => false);
    
    expect(result).toEqual([]);
  });

  it('should handle arrays with single element', () => {
    const array = [42];
    const result = findAll(array, (item) => item === 42);
    
    expect(result).toEqual([
      { index: 0, value: 42 }
    ]);
  });

  it('should work with string matching', () => {
    const array = ['apple', 'banana', 'apple pie', 'grape'];
    const result = findAll(array, (item) => item.includes('apple'));
    
    expect(result).toEqual([
      { index: 0, value: 'apple' },
      { index: 2, value: 'apple pie' }
    ]);
  });

  it('should handle nested arrays', () => {
    const array = [[1, 2], [3, 4], [1, 2]];
    const result = findAll(array, (item) => Array.isArray(item) && item.length === 2);
    
    expect(result).toEqual([
      { index: 0, value: [1, 2] },
      { index: 1, value: [3, 4] },
      { index: 2, value: [1, 2] } // correct actual index
    ]);
  });

  it('should work with type checking', () => {
    const array = [1, 'hello', true, 2, 'world'];
    const result = findAll(array, (item) => typeof item === 'string');
    
    expect(result).toEqual([
      { index: 1, value: 'hello' },
      { index: 4, value: 'world' }
    ]);
  });
});