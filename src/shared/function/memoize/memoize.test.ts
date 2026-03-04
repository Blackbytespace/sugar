import { describe, it, expect } from 'vitest';
import memoize from './memoize.js';

describe('memoize', () => {
  it('caches function results', () => {
    let calls = 0;
    const fn = memoize((x) => {
      calls++;
      return x * 2;
    });

    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
  });

  it('handles different arguments', () => {
    let calls = 0;
    const fn = memoize((x) => {
      calls++;
      return x * 2;
    });

    expect(fn(5)).toBe(10);
    expect(fn(10)).toBe(20);
    expect(calls).toBe(2);
  });
});