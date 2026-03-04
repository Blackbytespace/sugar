import { describe, expect, it } from 'vitest';
import isPhone from './isPhone.js';

describe('isPhone', () => {
  it('returns a boolean', () => {
    expect(typeof isPhone()).toBe('boolean');
  });

  it('returns false in a desktop browser test environment', () => {
    // isPhone is an alias for isMobile — desktop Playwright browsers
    // do not have touch events, orientation or coarse pointer.
    expect(isPhone()).toBe(false);
  });
});
