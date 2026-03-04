import { describe, expect, it } from 'vitest';
import isInteger from './isInteger.js';
describe('isInteger', () => {
  it('returns true for integers', () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(0)).toBe(true);
  });
  it('returns false for non-integers', () => {
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger('1')).toBe(false);
  });
});
