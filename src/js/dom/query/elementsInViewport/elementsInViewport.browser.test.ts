/**
 * @name            elementsInViewport.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for elementsInViewport
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import elementsInViewport from './elementsInViewport.js';

describe('elementsInViewport (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    window.scrollTo(0, 0);
  });

  describe('return type', () => {
    it('should return an array', () => {
      document.body.innerHTML = '<p>test</p>';
      const result = elementsInViewport();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should not throw with empty body', () => {
      expect(() => elementsInViewport()).not.toThrow();
    });
  });

  describe('visible elements', () => {
    it('should include elements that are in the viewport', () => {
      const $el = document.createElement('div');
      $el.className = 'in-viewport';
      $el.style.cssText = 'width:50px;height:50px;';
      document.body.appendChild($el);

      const result = elementsInViewport();
      expect(result.some((el) => el.classList.contains('in-viewport'))).toBe(
        true,
      );
    });

    it('should only include HTMLElements', () => {
      document.body.innerHTML = '<p>one</p><span>two</span>';
      const result = elementsInViewport();
      result.forEach((el) => {
        expect(el instanceof HTMLElement).toBe(true);
      });
    });
  });

  describe('rootNode option', () => {
    it('should not include elements outside the rootNode', () => {
      const $root = document.createElement('div');
      $root.id = 'root';
      $root.style.cssText = 'width:100px;height:100px;';
      const $child = document.createElement('p');
      $child.id = 'root-child';
      $root.appendChild($child);

      const $outside = document.createElement('p');
      $outside.id = 'outside';
      document.body.appendChild($outside);
      document.body.appendChild($root);

      const result = elementsInViewport({ rootNode: $root });
      const ids = result.map((el) => el.id);
      expect(ids).not.toContain('outside');
    });
  });

  describe('far-off-screen elements', () => {
    it('should not include elements positioned far below the viewport', () => {
      const $offscreen = document.createElement('div');
      $offscreen.id = 'offscreen';
      $offscreen.style.cssText =
        'position:absolute;top:100000px;left:0;width:50px;height:50px;';
      document.body.appendChild($offscreen);

      const result = elementsInViewport({ threshold: 1 });
      expect(result.some((el) => el.id === 'offscreen')).toBe(false);
    });
  });
});
