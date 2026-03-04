import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import restoreTheme from './restoreTheme.js';

function clearThemeCookie(cookieName = 'theme') {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function setRawCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

function getCookieValue(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  if (!matches) return null;
  const raw = decodeURIComponent(matches[1]);
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

describe('restoreTheme', () => {
  beforeEach(() => {
    Array.from(document.body.classList)
      .filter((cls) => cls.startsWith('theme-'))
      .forEach((cls) => document.body.classList.remove(cls));
    clearThemeCookie();
    clearThemeCookie('custom-theme');
  });

  afterEach(() => {
    Array.from(document.body.classList)
      .filter((cls) => cls.startsWith('theme-'))
      .forEach((cls) => document.body.classList.remove(cls));
    clearThemeCookie();
    clearThemeCookie('custom-theme');
  });

  it('applies the default theme when no cookie is set', () => {
    clearThemeCookie();
    restoreTheme('light');
    expect(document.body.classList.contains('theme-light')).toBe(true);
  });

  it('applies the stored theme from the cookie', () => {
    setRawCookie('theme', 'dark');
    restoreTheme('light');
    expect(document.body.classList.contains('theme-dark')).toBe(true);
    expect(document.body.classList.contains('theme-light')).toBe(false);
  });

  it('stores the restored theme back in the cookie', () => {
    setRawCookie('theme', 'dark');
    restoreTheme('light');
    expect(getCookieValue('theme')).toBe('dark');
  });

  it('stores the default theme in the cookie when no cookie was set', () => {
    clearThemeCookie();
    restoreTheme('light');
    expect(getCookieValue('theme')).toBe('light');
  });

  it('uses a custom cookie name via settings', () => {
    setRawCookie('custom-theme', 'ocean');
    restoreTheme('light', { cookieName: 'custom-theme' });
    expect(document.body.classList.contains('theme-ocean')).toBe(true);
  });

  it('removes old theme-* classes when restoring', () => {
    document.body.classList.add('theme-old');
    setRawCookie('theme', 'dark');
    restoreTheme('light');
    expect(document.body.classList.contains('theme-old')).toBe(false);
    expect(document.body.classList.contains('theme-dark')).toBe(true);
  });

  it('only one theme-* class is set after restoring', () => {
    setRawCookie('theme', 'dark');
    restoreTheme('light');
    const themeClasses = Array.from(document.body.classList).filter((cls) =>
      cls.startsWith('theme-'),
    );
    expect(themeClasses).toHaveLength(1);
  });
});
