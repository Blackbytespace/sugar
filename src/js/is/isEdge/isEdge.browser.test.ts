import { describe, expect, it } from 'vitest';
import isEdge from './isEdge.js';

describe('isEdge', () => {
  it('returns true for a Chromium Edge UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36 Edg/120.0.2210.61';
    expect(isEdge(ua)).toBe(true);
  });

  it('returns false for a Chrome UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    expect(isEdge(ua)).toBe(false);
  });

  it('returns false for a Firefox UA', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0';
    expect(isEdge(ua)).toBe(false);
  });

  it('returns false for a Safari UA', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
    expect(isEdge(ua)).toBe(false);
  });

  it('returns a boolean', () => {
    expect(typeof isEdge('SomeUA')).toBe('boolean');
  });

  it('uses navigator.userAgent when no argument is passed', () => {
    expect(typeof isEdge()).toBe('boolean');
  });
});
