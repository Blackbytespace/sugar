import { describe, expect, it } from 'vitest';
import isMobile from './isMobile.js';

describe('isMobile', () => {
  it('returns a boolean', () => {
    expect(typeof isMobile()).toBe('boolean');
  });

  it('returns false in a desktop browser test environment', () => {
    // Desktop browsers used by Playwright do not have touch events,
    // orientation, or coarse pointer — so isMobile() must return false.
    expect(isMobile()).toBe(false);
  });
});
