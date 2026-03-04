import { describe, expect, it } from 'vitest';
import isSafari from './isSafari.js';

describe('isSafari', () => {
  it('returns true for a Safari user agent', () => {
    expect(
      isSafari(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      ),
    ).toBe(true);
  });

  it('returns false for a Chrome user agent (contains both Safari and Chrome)', () => {
    expect(
      isSafari(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ),
    ).toBe(false);
  });

  it('returns false for a Firefox user agent', () => {
    expect(
      isSafari(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      ),
    ).toBe(false);
  });

  it('returns false for an Edge user agent', () => {
    expect(
      isSafari(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
      ),
    ).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isSafari(navigator.userAgent)).toBe('boolean');
  });
});
