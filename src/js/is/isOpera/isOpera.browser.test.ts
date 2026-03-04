import { describe, expect, it } from 'vitest';
import isOpera from './isOpera.js';

describe('isOpera', () => {
  it('returns true for an OPR/ user agent', () => {
    expect(
      isOpera(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
      ),
    ).toBe(true);
  });

  it('returns true for a legacy Opera user agent', () => {
    expect(
      isOpera(
        'Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18',
      ),
    ).toBe(true);
  });

  it('returns false for a Chrome user agent', () => {
    expect(
      isOpera(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ),
    ).toBe(false);
  });

  it('returns false for a Firefox user agent', () => {
    expect(
      isOpera(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      ),
    ).toBe(false);
  });

  it('returns false for a Safari user agent', () => {
    expect(
      isOpera(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      ),
    ).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isOpera(navigator.userAgent)).toBe('boolean');
  });
});
