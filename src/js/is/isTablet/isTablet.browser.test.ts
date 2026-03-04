import { describe, expect, it } from 'vitest';
import isTablet from './isTablet.js';

describe('isTablet', () => {
  it('returns a boolean', () => {
    expect(typeof isTablet()).toBe('boolean');
  });

  it('returns false in a desktop browser test environment', () => {
    // Desktop Playwright browsers do not have touch events, orientation,
    // or coarse pointer — isTablet() must return false.
    expect(isTablet()).toBe(false);
  });
});
