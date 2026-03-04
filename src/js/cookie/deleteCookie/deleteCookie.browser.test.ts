/**
 * @name            deleteCookie.browser.test.ts
 * @namespace       js.cookie
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for deleteCookie — removes a cookie by setting its
 * max-age to -1 via setCookie.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import deleteCookie from './deleteCookie.js';
import setCookie from '../setCookie/setCookie.js';
import getCookie from '../getCookie/getCookie.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Delete a cookie by name (cleanup helper independent of deleteCookie). */
function clearCookie(name: string): void {
  document.cookie = encodeURIComponent(name) + '=; max-age=-1; path=/';
}

describe('deleteCookie (browser)', () => {
  afterEach(() => {
    clearCookie('toDel');
    clearCookie('other');
    clearCookie('missing');
  });

  // -------------------------------------------------------------------------
  // Basic deletion
  // -------------------------------------------------------------------------

  describe('basic deletion', () => {
    beforeEach(() => {
      setCookie('toDel', 'someValue');
    });

    it('cookie should exist before deletion', () => {
      expect(getCookie('toDel')).toBeDefined();
    });

    it('should remove the cookie so getCookie returns undefined', () => {
      deleteCookie('toDel');
      expect(getCookie('toDel')).toBeUndefined();
    });

    it('should not be present in document.cookie after deletion', () => {
      deleteCookie('toDel');
      expect(document.cookie).not.toContain('toDel');
    });
  });

  // -------------------------------------------------------------------------
  // Deleting a non-existent cookie
  // -------------------------------------------------------------------------

  describe('non-existent cookie', () => {
    it('should not throw when deleting a cookie that does not exist', () => {
      expect(() => deleteCookie('missing')).not.toThrow();
    });

    it('getCookie should still return undefined after deleting a non-existent cookie', () => {
      deleteCookie('missing');
      expect(getCookie('missing')).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Idempotency
  // -------------------------------------------------------------------------

  describe('idempotency', () => {
    it('calling deleteCookie twice should not throw', () => {
      setCookie('toDel', 'v');
      deleteCookie('toDel');
      expect(() => deleteCookie('toDel')).not.toThrow();
    });

    it('getCookie should still be undefined after double deletion', () => {
      setCookie('toDel', 'v');
      deleteCookie('toDel');
      deleteCookie('toDel');
      expect(getCookie('toDel')).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Isolation — only the target cookie is removed
  // -------------------------------------------------------------------------

  describe('isolation', () => {
    beforeEach(() => {
      setCookie('toDel', 'gone');
      setCookie('other', 'stays');
    });

    afterEach(() => {
      clearCookie('other');
    });

    it('should only delete the named cookie and leave others intact', () => {
      deleteCookie('toDel');
      expect(getCookie('toDel')).toBeUndefined();
      expect(getCookie('other')).toBe('stays');
    });
  });

  // -------------------------------------------------------------------------
  // Works with various value types
  // -------------------------------------------------------------------------

  describe('various value types', () => {
    it('should delete a cookie that held an object value', () => {
      setCookie('toDel', { key: 'value' });
      deleteCookie('toDel');
      expect(getCookie('toDel')).toBeUndefined();
    });

    it('should delete a cookie that held a numeric value', () => {
      setCookie('toDel', 123);
      deleteCookie('toDel');
      expect(getCookie('toDel')).toBeUndefined();
    });
  });
});
