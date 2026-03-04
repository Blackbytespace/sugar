import { describe, expect, it } from 'vitest';
import isObject from './isObject.js';
describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });
  it('returns falsy for non-objects and special objects', () => {
    expect(isObject(null)).toBe(null);
    expect(isObject(undefined)).toBe(undefined);
    expect(isObject('test')).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject(new Date())).toBe(false);
  });
});
