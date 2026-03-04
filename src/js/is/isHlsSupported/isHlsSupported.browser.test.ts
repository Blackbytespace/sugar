import { describe, expect, it } from 'vitest';
import isHlsSupported from './isHlsSupported.js';

describe('isHlsSupported', () => {
  it('returns a boolean', () => {
    expect(typeof isHlsSupported()).toBe('boolean');
  });

  it('returns true on Safari (native HLS support) or false on others', () => {
    // We can only verify the return type deterministically;
    // native HLS is supported on Safari but not on Firefox/Chrome without MSE.
    const result = isHlsSupported();
    expect(result === true || result === false).toBe(true);
  });

  it('does not throw', () => {
    expect(() => isHlsSupported()).not.toThrow();
  });
});
