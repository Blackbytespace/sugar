import { describe, expect, it } from 'vitest';
import isUcBrowser from './isUcBrowser.js';

describe('isUcBrowser', () => {
  it('returns true for a UC Browser user agent', () => {
    expect(
      isUcBrowser(
        'Mozilla/5.0 (Linux; U; Android 9; en-US; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 UCBrowser/13.4.0.1306 Mobile Safari/537.36',
      ),
    ).toBe(true);
  });

  it('returns false for a Chrome user agent', () => {
    expect(
      isUcBrowser(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ),
    ).toBe(false);
  });

  it('returns false for a Firefox user agent', () => {
    expect(
      isUcBrowser(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      ),
    ).toBe(false);
  });

  it('returns false for a Safari user agent', () => {
    expect(
      isUcBrowser(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      ),
    ).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isUcBrowser(navigator.userAgent)).toBe('boolean');
  });
});
