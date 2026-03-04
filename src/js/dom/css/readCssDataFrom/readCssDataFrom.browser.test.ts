/**
 * @name            readCssDataFrom.browser.test.ts
 * @namespace       js.dom.css
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for readCssDataFrom
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import readCssDataFrom from './readCssDataFrom.js';

describe('readCssDataFrom (browser)', () => {
  let $elm: HTMLElement;
  let $style: HTMLStyleElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $elm = document.createElement('div');
    $elm.id = 'test-elm';
    document.body.appendChild($elm);
    $style = document.createElement('style');
    document.head.appendChild($style);
  });

  afterEach(() => {
    $style.remove();
  });

  describe('return type', () => {
    it('should return an object', () => {
      const result = readCssDataFrom($elm);
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('should return an empty object when no CSS data is present', () => {
      const result = readCssDataFrom($elm);
      expect(result).toEqual({});
    });
  });

  describe('reading from ::before pseudo-element', () => {
    it('should read JSON data from ::before content property', () => {
      const data = { foo: 'bar', count: 42 };
      // The function does JSON.parse twice, so the content must be a
      // JSON-stringified JSON string (i.e. double-encoded)
      const encoded = JSON.stringify(JSON.stringify(data));
      $style.textContent = `#test-elm::before { content: ${encoded}; }`;

      const result = readCssDataFrom($elm);
      expect(result).toEqual(data);
    });

    it('should handle nested objects in ::before content', () => {
      const data = { nested: { a: 1, b: [1, 2, 3] } };
      const encoded = JSON.stringify(JSON.stringify(data));
      $style.textContent = `#test-elm::before { content: ${encoded}; }`;

      const result = readCssDataFrom($elm);
      expect(result).toEqual(data);
    });
  });

  describe('reading from ::after pseudo-element', () => {
    it('should fall back to ::after when ::before has no content', () => {
      const data = { source: 'after', value: true };
      const encoded = JSON.stringify(JSON.stringify(data));
      $style.textContent = `#test-elm::after { content: ${encoded}; }`;

      const result = readCssDataFrom($elm);
      expect(result).toEqual(data);
    });

    it('should prefer ::before over ::after when both have content', () => {
      const beforeData = { from: 'before' };
      const afterData = { from: 'after' };
      const encodedBefore = JSON.stringify(JSON.stringify(beforeData));
      const encodedAfter = JSON.stringify(JSON.stringify(afterData));
      $style.textContent = `
        #test-elm::before { content: ${encodedBefore}; }
        #test-elm::after  { content: ${encodedAfter}; }
      `;

      const result = readCssDataFrom($elm);
      expect(result).toEqual(beforeData);
    });
  });

  describe('edge cases', () => {
    it('should return empty object when content is "none"', () => {
      $style.textContent = `#test-elm::before { content: none; }`;
      const result = readCssDataFrom($elm);
      expect(result).toEqual({});
    });

    it('should return empty object when content is invalid JSON', () => {
      $style.textContent = `#test-elm::before { content: "not-valid-json"; }`;
      const result = readCssDataFrom($elm);
      expect(result).toEqual({});
    });

    it('should not throw for an element with no pseudo-element styles', () => {
      expect(() => readCssDataFrom($elm)).not.toThrow();
    });
  });
});
