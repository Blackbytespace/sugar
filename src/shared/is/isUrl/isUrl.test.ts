import { describe, expect, it } from 'vitest';
import isUrl from './isUrl.js';

describe('isUrl', () => {
  it('returns true for valid URLs', () => {
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('https://google.com')).toBe(true);
  });

  it('returns false for invalid URLs', () => {
    expect(isUrl('invalid')).toBe(false);
    expect(isUrl('not-a-url')).toBe(false);
    expect(isUrl('')).toBe(false);
  });
});
