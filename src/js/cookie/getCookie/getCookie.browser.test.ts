/**
 * @name            getCookie.browser.test.ts
 * @namespace       js.cookie
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for getCookie — reads and JSON-parses a cookie value
 * from document.cookie by name.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import getCookie from './getCookie.js';
import setCookie from '../setCookie/setCookie.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Directly write a raw (non-JSON) cookie value for low-level tests. */
function writeRawCookie(name: string, rawValue: string): void {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(rawValue)}; path=/`;
}

/** Delete a cookie by name. */
function clearCookie(name: string): void {
  document.cookie = encodeURIComponent(name) + '=; max-age=-1; path=/';
}

describe('getCookie (browser)', () => {
  afterEach(() => {
    clearCookie('strCookie');
    clearCookie('numCookie');
    clearCookie('objCookie');
    clearCookie('arrCookie');
    clearCookie('boolCookie');
    clearCookie('rawCookie');
    clearCookie('missing');
    clearCookie('special.cookie');
    clearCookie('prefix_a');
    clearCookie('prefix_b');
    clearCookie('exact');
  });

  // -------------------------------------------------------------------------
  // Missing cookie
  // -------------------------------------------------------------------------

  describe('missing cookie', () => {
    it('should return undefined for a cookie that does not exist', () => {
      expect(getCookie('missing')).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // String values (set via setCookie which JSON-serialises)
  // -------------------------------------------------------------------------

  describe('string values', () => {
    beforeEach(() => {
      setCookie('strCookie', 'hello world');
    });

    it('should return a string value', () => {
      expect(getCookie('strCookie')).toBe('hello world');
    });

    it('should return the exact string without extra quotes', () => {
      const val = getCookie('strCookie');
      expect(typeof val).toBe('string');
    });
  });

  // -------------------------------------------------------------------------
  // Numeric values
  // -------------------------------------------------------------------------

  describe('numeric values', () => {
    beforeEach(() => {
      setCookie('numCookie', 42);
    });

    it('should return a number, not a string', () => {
      expect(getCookie('numCookie')).toBe(42);
      expect(typeof getCookie('numCookie')).toBe('number');
    });
  });

  // -------------------------------------------------------------------------
  // Object values
  // -------------------------------------------------------------------------

  describe('object values', () => {
    beforeEach(() => {
      setCookie('objCookie', { a: 1, b: 'two' });
    });

    it('should parse and return an object', () => {
      expect(getCookie('objCookie')).toEqual({ a: 1, b: 'two' });
    });
  });

  // -------------------------------------------------------------------------
  // Array values
  // -------------------------------------------------------------------------

  describe('array values', () => {
    beforeEach(() => {
      setCookie('arrCookie', [10, 20, 30]);
    });

    it('should parse and return an array', () => {
      expect(getCookie('arrCookie')).toEqual([10, 20, 30]);
    });
  });

  // -------------------------------------------------------------------------
  // Boolean values
  // -------------------------------------------------------------------------

  describe('boolean values', () => {
    it('should return boolean true', () => {
      setCookie('boolCookie', true);
      expect(getCookie('boolCookie')).toBe(true);
    });

    it('should return boolean false', () => {
      setCookie('boolCookie', false);
      expect(getCookie('boolCookie')).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Raw (non-JSON) cookie — fallback behaviour
  // -------------------------------------------------------------------------

  describe('raw non-JSON cookie', () => {
    it('should return the raw decoded string when the value is not valid JSON', () => {
      writeRawCookie('rawCookie', 'plain text value');
      expect(getCookie('rawCookie')).toBe('plain text value');
    });
  });

  // -------------------------------------------------------------------------
  // Cookie name with special characters
  // -------------------------------------------------------------------------

  describe('special characters in name', () => {
    it('should correctly retrieve a cookie whose name contains a dot', () => {
      setCookie('special.cookie', 'dotValue');
      expect(getCookie('special.cookie')).toBe('dotValue');
    });
  });

  // -------------------------------------------------------------------------
  // Exact name matching (no prefix bleed)
  // -------------------------------------------------------------------------

  describe('exact name matching', () => {
    it('should not return the value of a cookie with a longer name that starts the same way', () => {
      setCookie('prefix_a', 'valueA');
      setCookie('prefix_b', 'valueB');
      // Reading 'prefix_a' must not accidentally return 'prefix_b'
      expect(getCookie('prefix_a')).toBe('valueA');
      expect(getCookie('prefix_b')).toBe('valueB');
    });

    it('should not match a cookie name that is a substring of another', () => {
      setCookie('exact', 'right');
      // 'exa' is not set — should be undefined
      expect(getCookie('exa')).toBeUndefined();
    });
  });
});
