import { describe, expect, it } from 'vitest';
import isSamsungBrowser from './isSamsungBrowser.js';

describe('isSamsungBrowser', () => {
  it('returns true for a Samsung Browser user agent', () => {
    expect(
      isSamsungBrowser(
        'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
      ),
    ).toBe(true);
  });

  it('returns false for a Chrome user agent', () => {
    expect(
      isSamsungBrowser(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ),
    ).toBe(false);
  });

  it('returns false for a Safari user agent', () => {
    expect(
      isSamsungBrowser(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      ),
    ).toBe(false);
  });

  it('returns false for a Firefox user agent', () => {
    expect(
      isSamsungBrowser(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      ),
    ).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isSamsungBrowser(navigator.userAgent)).toBe('boolean');
  });
});
