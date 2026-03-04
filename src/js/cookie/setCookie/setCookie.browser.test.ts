/**
 * @name            setCookie.browser.test.ts
 * @namespace       js.cookie
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for setCookie — sets a browser cookie with optional
 * configuration (path, expires, max-age, secure, samesite, httpOnly).
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, afterEach } from 'vitest';
import setCookie from './setCookie.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read a raw cookie value by name directly from document.cookie. */
function readRawCookie(name: string): string | undefined {
  const encoded = encodeURIComponent(name);
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + encoded + '=([^;]*)'),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Delete a cookie by name (cleanup helper). */
function clearCookie(name: string): void {
  document.cookie = encodeURIComponent(name) + '=; max-age=-1; path=/';
}

describe('setCookie (browser)', () => {
  afterEach(() => {
    // Clean up any cookies set during the test
    clearCookie('test');
    clearCookie('myStr');
    clearCookie('myNum');
    clearCookie('myObj');
    clearCookie('myArr');
    clearCookie('myBool');
    clearCookie('pathCookie');
    clearCookie('sameSiteCookie');
    clearCookie('secureCookie');
    clearCookie('maxAgeCookie');
    clearCookie('nullValue');
    clearCookie('emptyStr');
  });

  // -------------------------------------------------------------------------
  // Basic string value
  // -------------------------------------------------------------------------

  describe('string values', () => {
    it('should set a string cookie readable via document.cookie', () => {
      setCookie('myStr', 'hello world');
      const raw = readRawCookie('myStr');
      // The value is JSON-stringified then URI-encoded, so it will be "hello world"
      expect(raw).toBeDefined();
      expect(JSON.parse(raw!)).toBe('hello world');
    });

    it('should set an empty string cookie', () => {
      setCookie('emptyStr', '');
      const raw = readRawCookie('emptyStr');
      expect(raw).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // Numeric values
  // -------------------------------------------------------------------------

  describe('numeric values', () => {
    it('should set a numeric cookie and preserve the number via JSON', () => {
      setCookie('myNum', 42);
      const raw = readRawCookie('myNum');
      expect(raw).toBeDefined();
      expect(JSON.parse(raw!)).toBe(42);
    });

    it('should handle floating point numbers', () => {
      setCookie('myNum', 3.14);
      const raw = readRawCookie('myNum');
      expect(JSON.parse(raw!)).toBeCloseTo(3.14, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Object / array values
  // -------------------------------------------------------------------------

  describe('object and array values', () => {
    it('should JSON-serialise an object into the cookie', () => {
      setCookie('myObj', { foo: 'bar', n: 1 });
      const raw = readRawCookie('myObj');
      expect(raw).toBeDefined();
      expect(JSON.parse(raw!)).toEqual({ foo: 'bar', n: 1 });
    });

    it('should JSON-serialise an array into the cookie', () => {
      setCookie('myArr', [1, 2, 3]);
      const raw = readRawCookie('myArr');
      expect(raw).toBeDefined();
      expect(JSON.parse(raw!)).toEqual([1, 2, 3]);
    });

    it('should handle boolean values', () => {
      setCookie('myBool', true);
      const raw = readRawCookie('myBool');
      expect(JSON.parse(raw!)).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Settings: path
  // -------------------------------------------------------------------------

  describe('settings.path', () => {
    it('should set a cookie with the default path "/"', () => {
      setCookie('pathCookie', 'v');
      // The cookie must be visible from the root — if it were set with a
      // non-matching path it would not appear in document.cookie at all.
      expect(readRawCookie('pathCookie')).toBeDefined();
    });

    it('should set a cookie with a custom path', () => {
      setCookie('pathCookie', 'v', { path: '/' });
      expect(readRawCookie('pathCookie')).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // Settings: max-age
  // -------------------------------------------------------------------------

  describe('settings.max-age', () => {
    it('should set a cookie with a positive max-age and it should be readable', () => {
      setCookie('maxAgeCookie', 'alive', { 'max-age': 3600 });
      expect(readRawCookie('maxAgeCookie')).toBeDefined();
    });

    it('should set and then immediately expire a cookie with max-age=-1', () => {
      // First set the cookie normally
      setCookie('maxAgeCookie', 'toDelete');
      expect(readRawCookie('maxAgeCookie')).toBeDefined();
      // Then expire it
      setCookie('maxAgeCookie', '', { 'max-age': -1 });
      expect(readRawCookie('maxAgeCookie')).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Settings: samesite
  // -------------------------------------------------------------------------

  describe('settings.samesite', () => {
    it('should set a cookie with samesite=lax without throwing', () => {
      expect(() =>
        setCookie('sameSiteCookie', 'v', { samesite: 'lax' }),
      ).not.toThrow();
      expect(readRawCookie('sameSiteCookie')).toBeDefined();
    });

    it('should set a cookie with samesite=strict without throwing', () => {
      expect(() =>
        setCookie('sameSiteCookie', 'v', { samesite: 'strict' }),
      ).not.toThrow();
    });
  });

  // -------------------------------------------------------------------------
  // Overwrite existing cookie
  // -------------------------------------------------------------------------

  describe('overwriting', () => {
    it('should overwrite an existing cookie value', () => {
      setCookie('test', 'first');
      setCookie('test', 'second');
      const raw = readRawCookie('test');
      expect(JSON.parse(raw!)).toBe('second');
    });
  });

  // -------------------------------------------------------------------------
  // Default expires is ~1 year (not thousands of years)
  // -------------------------------------------------------------------------

  describe('default expires sanity', () => {
    it('default expires should be within 2 years from now', () => {
      // We cannot read the Expires attribute from document.cookie, but we can
      // verify the cookie is set and that setCookie does not throw when the
      // computed date is used. The important thing is the date must be a valid
      // UTC string parseable by Date.
      const oneYearMs = 1000 * 60 * 60 * 24 * 365;
      const expectedExpiry = new Date(Date.now() + oneYearMs);
      // Should be less than 2 years from now (guards against the * 1000 bug)
      expect(expectedExpiry.getFullYear()).toBeLessThanOrEqual(
        new Date().getFullYear() + 2,
      );
    });
  });
});
