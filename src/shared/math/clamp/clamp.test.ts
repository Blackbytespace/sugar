import { describe, it, expect } from 'vitest';
import clamp from './clamp.js';

describe('clamp', () => {
  it('returns value within range', () => {
    expect(clamp(10, 0, 100)).toBe(10);
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it('clamps to minimum value', () => {
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(-1, 0, 100)).toBe(0);
  });

  it('clamps to maximum value', () => {
    expect(clamp(101, 0, 100)).toBe(100);
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('handles boundary values', () => {
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });
});