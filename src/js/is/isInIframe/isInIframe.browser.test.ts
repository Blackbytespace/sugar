import { describe, expect, it } from 'vitest';
import isInIframe from './isInIframe.js';

describe('isInIframe', () => {
  it('returns a boolean', () => {
    const result = isInIframe();
    expect(typeof result).toBe('boolean');
  });

  it('returns true when running inside an iframe (as vitest browser tests do)', () => {
    // Vitest browser tests run inside an iframe, so window.self !== window.top
    expect(isInIframe()).toBe(true);
  });
});
