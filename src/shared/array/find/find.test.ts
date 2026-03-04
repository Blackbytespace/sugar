import { describe, it, expect } from 'vitest';
import find from './find.js';

describe('shared.array.find', () => {
  it('should find item and return index and value', () => {
    const array = ['hello', 'world'];
    const result = find(array, (item) => item === 'world');
    
    expect(result).toEqual({
      index: 1,
      value: 'world'
    });
  });

  it('should return null when no item matches', () => {
    const array = ['hello', 'world'];
    const result = find(array, (item) => item === 'foo');
    
    expect(result).toBeNull();
  });

  it('should return first match for duplicates', () => {
    const array = ['hello', 'world', 'hello'];
    const result = find(array, (item) => item === 'hello');
    
    expect(result).toEqual({
      index: 0, // First occurrence
      value: 'hello'
    });
  });

  it('should handle empty arrays', () => {
    const array: any[] = [];
    const result = find(array, (item) => true);
    
    expect(result).toBeNull();
  });

  it('should work with number arrays', () => {
    const array = [1, 2, 3, 4, 5];
    const result = find(array, (item) => item > 3);
    
    expect(result).toEqual({
      index: 3,
      value: 4
    });
  });

  it('should work with complex check functions', () => {
    const array = [1, 5, 10, 15, 20];
    const result = find(array, (item) => item % 5 === 0 && item > 5);
    
    expect(result).toEqual({
      index: 2,
      value: 10
    });
  });

  it('should work with object arrays', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    const result = find(array, (item) => item.name === 'Bob');
    
    expect(result).toEqual({
      index: 1,
      value: { id: 2, name: 'Bob' }
    });
  });

  it('should work with boolean arrays', () => {
    const array = [false, true, false, true];
    const result = find(array, (item) => item === true);
    
    expect(result).toEqual({
      index: 1,
      value: true
    });
  });

  it('should handle null and undefined values', () => {
    const array = [null, undefined, 'test', null];
    const result = find(array, (item) => item === undefined);
    
    expect(result).toEqual({
      index: 1,
      value: undefined
    });
  });

  it('should work with mixed type arrays', () => {
    const array = [1, '1', true, null, undefined];
    const result = find(array, (item) => typeof item === 'string');
    
    expect(result).toEqual({
      index: 1,
      value: '1'
    });
  });

  it('should handle single element arrays', () => {
    const array = [42];
    const result = find(array, (item) => item === 42);
    
    expect(result).toEqual({
      index: 0,
      value: 42
    });
  });

  it('should work with function that always returns false', () => {
    const array = [1, 2, 3];
    const result = find(array, (item) => false);
    
    expect(result).toBeNull();
  });

  it('should work with function that always returns true', () => {
    const array = [1, 2, 3];
    const result = find(array, (item) => true);
    
    expect(result).toEqual({
      index: 0,
      value: 1
    });
  });

  it('should handle nested arrays', () => {
    const array = [[1, 2], [3, 4], [5, 6]];
    const result = find(array, (item) => Array.isArray(item) && item.includes(3));
    
    expect(result).toEqual({
      index: 1,
      value: [3, 4]
    });
  });

  it('should work with string operations', () => {
    const array = ['apple', 'banana', 'cherry'];
    const result = find(array, (item) => item.startsWith('b'));
    
    expect(result).toEqual({
      index: 1,
      value: 'banana'
    });
  });

  it('should handle property checks on objects', () => {
    const array = [
      { name: 'Alice', age: 30 },
      { name: 'Bob' }, // No age property
      { name: 'Charlie', age: 25 }
    ];
    const result = find(array, (item) => !('age' in item));
    
    expect(result).toEqual({
      index: 1,
      value: { name: 'Bob' }
    });
  });

  it('should work with date objects', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-12-31');
    const array = [date1, date2];
    const result = find(array, (item) => item.getFullYear() === 2023 && item.getMonth() === 11);
    
    expect(result).toEqual({
      index: 1,
      value: date2
    });
  });

  it('should handle regular expressions', () => {
    const array = ['hello123', 'world', 'test456'];
    const result = find(array, (item) => /\d+/.test(item));
    
    expect(result).toEqual({
      index: 0,
      value: 'hello123'
    });
  });

  it('should work with NaN values', () => {
    const array = [1, NaN, 3];
    const result = find(array, (item) => Number.isNaN(item));
    
     expect(result).toEqual({
       index: -1, // indexOf can't find NaN because NaN !== NaN
       value: NaN
     });
   });
 });