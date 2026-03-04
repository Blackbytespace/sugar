import { describe, expect, it } from 'vitest';
import isChrome from './isChrome.js';

describe('isChrome', () => {
  it('returns true for a Chrome UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    expect(isChrome(ua)).toBe(true);
  });

  it('returns false for a Firefox UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0';
    expect(isChrome(ua)).toBe(false);
  });

  it('returns false for a Safari UA', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
    expect(isChrome(ua)).toBe(false);
  });

  it('returns false for an IE UA', () => {
    const ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)';
    expect(isChrome(ua)).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isChrome('SomeUA')).toBe('boolean');
  });

  it('uses navigator.userAgent when no argument is passed', () => {
    // Just verify it does not throw and returns a boolean
    expect(typeof isChrome()).toBe('boolean');
  });
});
