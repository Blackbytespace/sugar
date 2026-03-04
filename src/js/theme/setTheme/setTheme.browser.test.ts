import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import setTheme from './setTheme.js';

function clearThemeCookie(cookieName = 'theme') {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
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

describe('setTheme', () => {
  beforeEach(() => {
    // Clean up all theme-* classes from body
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

  it('adds theme-{name} class to document.body', () => {
    setTheme('dark');
    expect(document.body.classList.contains('theme-dark')).toBe(true);
  });

  it('stores the theme in the cookie', () => {
    setTheme('dark');
    expect(getCookieValue('theme')).toBe('dark');
  });

  it('removes old theme-* classes before setting a new one', () => {
    document.body.classList.add('theme-light');
    setTheme('dark');
    expect(document.body.classList.contains('theme-light')).toBe(false);
    expect(document.body.classList.contains('theme-dark')).toBe(true);
  });

  it('only one theme-* class is present after calling setTheme', () => {
    document.body.classList.add('theme-light');
    document.body.classList.add('theme-ocean');
    setTheme('dark');
    const themeClasses = Array.from(document.body.classList).filter((cls) =>
      cls.startsWith('theme-'),
    );
    expect(themeClasses).toHaveLength(1);
    expect(themeClasses[0]).toBe('theme-dark');
  });

  it('uses a custom cookie name via settings', () => {
    setTheme('ocean', { cookieName: 'custom-theme' });
    expect(getCookieValue('custom-theme')).toBe('ocean');
  });

  it('non-theme classes on body are preserved', () => {
    document.body.classList.add('my-class');
    setTheme('dark');
    expect(document.body.classList.contains('my-class')).toBe(true);
    document.body.classList.remove('my-class');
  });

  it('can switch themes multiple times', () => {
    setTheme('light');
    setTheme('dark');
    setTheme('ocean');
    const themeClasses = Array.from(document.body.classList).filter((cls) =>
      cls.startsWith('theme-'),
    );
    expect(themeClasses).toHaveLength(1);
    expect(themeClasses[0]).toBe('theme-ocean');
    expect(getCookieValue('theme')).toBe('ocean');
  });
});
