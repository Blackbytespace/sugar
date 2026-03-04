import { afterEach, describe, expect, it } from 'vitest';
import getTheme from './getTheme.js';

function clearThemeCookie(cookieName = 'theme') {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function setRawCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

describe('getTheme', () => {
  afterEach(() => {
    clearThemeCookie();
    clearThemeCookie('custom-theme');
  });

  it('returns the default theme when no cookie is set', () => {
    clearThemeCookie();
    expect(getTheme('light')).toBe('light');
  });

  it('returns the cookie theme when the cookie is set', () => {
    setRawCookie('theme', 'dark');
    expect(getTheme('light')).toBe('dark');
  });

  it('uses the default fallback theme when cookie is absent', () => {
    clearThemeCookie();
    expect(getTheme('my-default-theme')).toBe('my-default-theme');
  });

  it('uses a custom cookie name via settings', () => {
    setRawCookie('custom-theme', 'ocean');
    expect(getTheme('light', { cookieName: 'custom-theme' })).toBe('ocean');
  });

  it('ignores a different cookie name and falls back to default', () => {
    setRawCookie('custom-theme', 'ocean');
    // default cookieName is 'theme', which is not set
    clearThemeCookie();
    expect(getTheme('fallback')).toBe('fallback');
  });

  it('returns a string', () => {
    clearThemeCookie();
    const result = getTheme('dark');
    expect(typeof result).toBe('string');
  });
});
