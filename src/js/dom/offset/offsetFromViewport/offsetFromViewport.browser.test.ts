/**
 * @name            offsetFromViewport.browser.test.ts
 * @namespace       js.dom.offset
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for offsetFromViewport
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import offsetFromViewport from './offsetFromViewport.js';

describe('offsetFromViewport (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    window.scrollTo(0, 0);
  });

  describe('return type', () => {
    it('should return an object with top and left numbers', () => {
      const $el = document.createElement('div');
      $el.style.cssText = 'width:50px;height:50px;';
      document.body.appendChild($el);
      const result = offsetFromViewport($el);
      expect(typeof result.top).toBe('number');
      expect(typeof result.left).toBe('number');
    });
  });

  describe('basic offset calculation', () => {
    it('should return {top:0, left:0} for an element at the document origin', () => {
      const $el = document.createElement('div');
      $el.style.cssText = 'width:50px;height:50px;';
      document.body.appendChild($el);
      const result = offsetFromViewport($el);
      expect(result.top).toBe(0);
      expect(result.left).toBe(0);
    });

    it('should reflect the correct top offset for a positioned element', () => {
      const $spacer = document.createElement('div');
      $spacer.style.cssText = 'width:100%;height:80px;';
      document.body.appendChild($spacer);

      const $el = document.createElement('div');
      $el.style.cssText = 'width:50px;height:50px;';
      document.body.appendChild($el);

      const result = offsetFromViewport($el);
      expect(result.top).toBe(80);
    });

    it('should reflect the correct left offset', () => {
      const $row = document.createElement('div');
      $row.style.cssText =
        'display:flex;flex-direction:row;width:300px;height:50px;';
      document.body.appendChild($row);

      const $left = document.createElement('div');
      $left.style.cssText = 'width:120px;height:50px;flex-shrink:0;';
      $row.appendChild($left);

      const $el = document.createElement('div');
      $el.style.cssText = 'width:50px;height:50px;flex-shrink:0;';
      $row.appendChild($el);

      const result = offsetFromViewport($el);
      expect(result.left).toBe(120);
    });

    it('should return rounded integer values', () => {
      const $el = document.createElement('div');
      $el.style.cssText = 'width:50px;height:50px;';
      document.body.appendChild($el);
      const result = offsetFromViewport($el);
      expect(result.top).toBe(Math.round(result.top));
      expect(result.left).toBe(Math.round(result.left));
    });
  });

  describe('scrolled page', () => {
    it('should account for page scroll in the offset', async () => {
      // Create a tall page then scroll
      const $tall = document.createElement('div');
      $tall.style.cssText = 'width:100%;height:2000px;';
      document.body.appendChild($tall);

      const $el = document.createElement('div');
      $el.style.cssText =
        'width:50px;height:50px;position:absolute;top:500px;left:0;';
      document.body.appendChild($el);

      window.scrollTo(0, 300);
      await new Promise((r) => setTimeout(r, 50));

      const result = offsetFromViewport($el);
      // offsetFromViewport returns document-absolute offset (scrollTop included)
      expect(result.top).toBe(500);
    });
  });
});
