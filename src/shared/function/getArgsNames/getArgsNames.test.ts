import { describe, it, expect } from 'vitest';
import getArgsNames from './getArgsNames.js';

describe('getArgsNames', () => {
  it('extracts function parameter names', () => {
    function test(a, b, c) {}
    expect(getArgsNames(test)).toEqual(['a', 'b', 'c']);
  });

  it('handles arrow functions', () => {
    const fn = (x, y) => {};
    expect(getArgsNames(fn)).toEqual(['x', 'y']);
  });

  it('handles no parameters', () => {
    function empty() {}
    expect(getArgsNames(empty)).toEqual([]);
  });

  it('handles default values', () => {
    function defaults(a = 1, b = 'test') {}
    expect(getArgsNames(defaults)).toEqual(['a', 'b']);
  });
});