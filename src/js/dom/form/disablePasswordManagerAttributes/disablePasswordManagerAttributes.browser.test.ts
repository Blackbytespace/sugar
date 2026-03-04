/**
 * @name            disablePasswordManagerAttributes.browser.test.ts
 * @namespace       js.dom.form
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for disablePasswordManagerAttributes
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect } from 'vitest';
import disablePasswordManagerAttributes from './disablePasswordManagerAttributes.js';

describe('disablePasswordManagerAttributes (browser)', () => {
  describe('return type', () => {
    it('should return an object', () => {
      const attrs = disablePasswordManagerAttributes();
      expect(typeof attrs).toBe('object');
      expect(attrs).not.toBeNull();
    });

    it('should not throw', () => {
      expect(() => disablePasswordManagerAttributes()).not.toThrow();
    });
  });

  describe('1Password attribute', () => {
    it('should include data-1p-ignore set to true', () => {
      const attrs = disablePasswordManagerAttributes();
      expect(attrs['data-1p-ignore']).toBe(true);
    });
  });

  describe('LastPass attribute', () => {
    it('should include data-lpignore set to true', () => {
      const attrs = disablePasswordManagerAttributes();
      expect(attrs['data-lpignore']).toBe(true);
    });
  });

  describe('Dashlane / form-type attribute', () => {
    it('should include data-form-type set to "other"', () => {
      const attrs = disablePasswordManagerAttributes();
      expect(attrs['data-form-type']).toBe('other');
    });
  });

  describe('Bitwarden attribute', () => {
    it('should include data-bwignore set to true', () => {
      const attrs = disablePasswordManagerAttributes();
      expect(attrs['data-bwignore']).toBe(true);
    });
  });

  describe('applying attributes to a DOM element', () => {
    it('should be spreadable onto an input element as dataset attributes', () => {
      const attrs = disablePasswordManagerAttributes();
      const $input = document.createElement('input');

      for (const [key, value] of Object.entries(attrs)) {
        $input.setAttribute(key, String(value));
      }

      expect($input.getAttribute('data-1p-ignore')).toBe('true');
      expect($input.getAttribute('data-lpignore')).toBe('true');
      expect($input.getAttribute('data-form-type')).toBe('other');
      expect($input.getAttribute('data-bwignore')).toBe('true');
    });

    it('should return the same shape on every call', () => {
      const first = disablePasswordManagerAttributes();
      const second = disablePasswordManagerAttributes();
      expect(Object.keys(first).sort()).toEqual(Object.keys(second).sort());
      for (const key of Object.keys(first)) {
        expect(first[key]).toBe(second[key]);
      }
    });
  });
});
