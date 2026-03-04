import { describe, expect, it } from 'vitest';
import isString from './isString.js';

describe('isString', () => {
  it('returns true for strings', () => {
    expect(isString('test')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString(new String('test'))).toBe(true);
  });

  it('returns false for non-strings', () => {
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString({})).toBe(false);
  });
});
