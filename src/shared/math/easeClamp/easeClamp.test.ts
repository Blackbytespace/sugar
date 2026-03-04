import { describe, it, expect } from 'vitest';
import easeClamp from './easeClamp.js';

describe('easeClamp', () => {
  it('returns value when within normal range', () => {
    // Value between minStart and maxStart should pass through unchanged
    expect(easeClamp(50, -10, 0, 100, 110)).toBe(50);
    expect(easeClamp(80, -10, 0, 100, 110)).toBe(80);
  });

  it('applies easing when below minStart', () => {
    // Values below minStart should be eased
    const result = easeClamp(-5, -10, 0, 100, 110);
    expect(result).toBeLessThan(0);
    expect(result).toBeGreaterThan(-10);
  });

  it('applies easing when above maxStart', () => {
    // Values above maxStart should be eased
    const result = easeClamp(105, -10, 0, 100, 110);
    expect(result).toBeGreaterThan(100);
    expect(result).toBeLessThan(110);
  });

  it('handles boundary values', () => {
    // Test exact boundary values
    expect(Math.abs(easeClamp(0, -10, 0, 100, 110))).toBe(0);
    expect(easeClamp(100, -10, 0, 100, 110)).toBe(100);
  });

  it('handles extreme values', () => {
    // Test values at the extreme ends
    const result1 = easeClamp(-10, -10, 0, 100, 110);
    expect(result1).toBeLessThan(0);
    
    const result2 = easeClamp(110, -10, 0, 100, 110);
    expect(result2).toBeGreaterThan(100);
  });
});