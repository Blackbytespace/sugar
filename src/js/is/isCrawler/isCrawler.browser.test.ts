import { describe, expect, it } from 'vitest';
import isCrawler from './isCrawler.js';

describe('isCrawler', () => {
  it('returns true for a known Googlebot UA', () => {
    const ua =
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    expect(isCrawler(ua)).toBe(true);
  });

  it('returns true for a known Bingbot UA', () => {
    const ua =
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)';
    expect(isCrawler(ua)).toBe(true);
  });

  it('returns false for a regular Chrome UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    expect(isCrawler(ua)).toBe(false);
  });

  it('returns false for a regular Firefox UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0';
    expect(isCrawler(ua)).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isCrawler('SomeUA')).toBe('boolean');
  });

  it('uses navigator.userAgent when no argument is passed', () => {
    expect(typeof isCrawler()).toBe('boolean');
  });
});
