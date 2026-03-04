/**
 * @name            scrollLeft.browser.test.ts
 * @namespace       js.dom.distance
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for scrollLeft
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import scrollLeft from './scrollLeft.js';

describe('scrollLeft (browser)', () => {
  beforeEach(() => {
    window.scrollTo(0, 0);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  afterEach(() => {
    // Reset scroll and body dimensions
    window.scrollTo(0, 0);
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.overflowX = '';
  });

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof scrollLeft()).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(scrollLeft())).toBe(true);
    });
  });

  describe('at rest (no scroll)', () => {
    it('should return 0 when not scrolled horizontally', () => {
      expect(scrollLeft()).toBe(0);
    });

    it('should return a non-negative number', () => {
      expect(scrollLeft()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('after scrolling horizontally', () => {
    beforeEach(() => {
      // Make page wide enough to scroll
      document.body.style.width = '5000px';
      document.body.style.overflowX = 'auto';
    });

    it('should reflect horizontal scroll position after scrolling', async () => {
      window.scrollTo(200, 0);
      // Allow scroll event to settle
      await new Promise((r) => setTimeout(r, 50));
      expect(scrollLeft()).toBeGreaterThan(0);
    });

    it('should match window.scrollX after scrolling', async () => {
      window.scrollTo(300, 0);
      await new Promise((r) => setTimeout(r, 50));
      expect(scrollLeft()).toBe(window.scrollX || window.pageXOffset || 0);
    });
  });

  describe('consistency', () => {
    it('calling twice without scrolling should return the same value', () => {
      expect(scrollLeft()).toBe(scrollLeft());
    });
  });
});
