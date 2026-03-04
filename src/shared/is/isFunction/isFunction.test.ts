import { describe, expect, it } from 'vitest';
import isFunction from './isFunction.js';
describe('isFunction', () => {
  it('returns true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
  });
  it('returns false for non-functions', () => {
    expect(isFunction({})).toBe(false);
    expect(isFunction('test')).toBe(false);
  });
});
