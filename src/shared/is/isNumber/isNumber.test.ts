import { describe, expect, it } from 'vitest';
import isNumber from './isNumber.js';

describe('isNumber', () => {
  it('returns true for numbers', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(12.5)).toBe(true);
    expect(isNumber(0)).toBe(true);
  });

  it('returns true for numeric strings', () => {
    expect(isNumber('123')).toBe(true);
    expect(isNumber('12.5')).toBe(true);
    expect(isNumber('0')).toBe(true);
  });

  it('returns false for non-numeric values', () => {
    expect(isNumber('abc')).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });
});
