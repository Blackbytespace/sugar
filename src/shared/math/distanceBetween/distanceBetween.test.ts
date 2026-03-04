import { describe, it, expect } from 'vitest';
import distanceBetween from './distanceBetween.js';

describe('distanceBetween', () => {
  it('calculates distance between horizontal points', () => {
    expect(distanceBetween({ x: 0, y: 0 }, { x: 3, y: 0 })).toBe(3);
    expect(distanceBetween({ x: 10, y: 20 }, { x: 10, y: 30 })).toBe(10);
  });

  it('calculates distance between vertical points', () => {
    expect(distanceBetween({ x: 0, y: 0 }, { x: 0, y: 4 })).toBe(4);
    expect(distanceBetween({ x: 5, y: 5 }, { x: 12, y: 5 })).toBe(7);
  });

  it('calculates distance between diagonal points', () => {
    expect(distanceBetween({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(distanceBetween({ x: 1, y: 1 }, { x: 4, y: 5 })).toBe(5);
  });

  it('returns 0 for same points', () => {
    expect(distanceBetween({ x: 5, y: 10 }, { x: 5, y: 10 })).toBe(0);
  });
});