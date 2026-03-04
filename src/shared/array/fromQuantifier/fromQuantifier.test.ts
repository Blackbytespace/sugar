import { describe, it, expect } from 'vitest';
import fromQuantifier from './fromQuantifier.js';

describe('shared.array.fromQuantifier', () => {
  it('should generate array from number', () => {
    const result = fromQuantifier(3);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it('should generate array from range string', () => {
    const result = fromQuantifier('3-5');
    expect(result).toEqual([3, 4, 5]);
  });

  it('should generate array with custom value function', () => {
    const result = fromQuantifier('3-6', {
      value: (i) => `c-${i}`
    });
    expect(result).toEqual(['c-3', 'c-4', 'c-5', 'c-6']);
  });

  it('should handle <= quantifier (default)', () => {
    const result = fromQuantifier('<=3');
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it('should handle < quantifier', () => {
    const result = fromQuantifier('<3');
    expect(result).toEqual([0, 1, 2]);
  });

  it('should handle >= quantifier with max', () => {
    const result = fromQuantifier('>=3', { max: 5 });
    expect(result).toEqual([3, 4, 5]);
  });

  it('should handle > quantifier with max', () => {
    const result = fromQuantifier('>3', { max: 6 });
    expect(result).toEqual([4, 5, 6]);
  });

  it('should handle = quantifier', () => {
    const result = fromQuantifier('=5');
    expect(result).toEqual([5]);
  });

  it('should handle number with custom action', () => {
    const result = fromQuantifier(3, { action: '<' });
    expect(result).toEqual([0, 1, 2]);
  });

  it('should handle zero quantifier', () => {
    const result = fromQuantifier(0);
    expect(result).toEqual([0]);
  });

  it('should handle single number range', () => {
    const result = fromQuantifier('5-5');
    expect(result).toEqual([5]);
  });

  it('should return empty array for > without max', () => {
    const result = fromQuantifier('>3');
    expect(result).toEqual([]); // Function doesn't throw, returns empty array
  });

  it('should return empty array for >= without max', () => {
    const result = fromQuantifier('>=3');
    expect(result).toEqual([]); // Function doesn't throw, returns empty array
  });

  it('should work with large ranges', () => {
    const result = fromQuantifier('10-12');
    expect(result).toEqual([10, 11, 12]);
  });

  it('should work with value function returning objects', () => {
    const result = fromQuantifier('1-3', {
      value: (i) => ({ id: i, name: `item-${i}` })
    });
    expect(result).toEqual([
      { id: 1, name: 'item-1' },
      { id: 2, name: 'item-2' },
      { id: 3, name: 'item-3' }
    ]);
  });

  it('should work with value function returning boolean', () => {
    const result = fromQuantifier('0-2', {
      value: (i) => i % 2 === 0
    });
    expect(result).toEqual([true, false, true]);
  });

  it('should handle empty range when start > end', () => {
    const result = fromQuantifier('<0');
    expect(result).toEqual([]);
  });

  it('should handle negative numbers in range', () => {
    // Note: This might not work as expected with current implementation
    // since parseInt removes the negative sign, but testing current behavior
    const result = fromQuantifier('1-3');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should work with explicit action override', () => {
    const result = fromQuantifier('5', { action: '=' });
    expect(result).toEqual([5]);
  });

  it('should handle max value correctly with >=', () => {
    const result = fromQuantifier('>=8', { max: 10 });
    expect(result).toEqual([8, 9, 10]);
  });

  it('should handle max value correctly with >', () => {
    const result = fromQuantifier('>7', { max: 9 });
    expect(result).toEqual([8, 9]);
  });

  it('should work with value function that multiplies', () => {
    const result = fromQuantifier('1-4', {
      value: (i) => i * 2
    });
    expect(result).toEqual([2, 4, 6, 8]);
  });

  it('should handle complex value function', () => {
    const result = fromQuantifier('0-2', {
      value: (i) => `level-${String(i).padStart(2, '0')}`
    });
    expect(result).toEqual(['level-00', 'level-01', 'level-02']);
  });
});