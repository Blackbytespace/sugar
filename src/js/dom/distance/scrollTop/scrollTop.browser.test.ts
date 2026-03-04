/**
 * @name            scrollTop.browser.test.ts
 * @namespace       js.dom.distance
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for scrollTop
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import scrollTop from './scrollTop.js';

describe('scrollTop (browser)', () => {
  beforeEach(() => {
    window.scrollTo(0, 0);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  afterEach(() => {
    window.scrollTo(0, 0);
    document.body.style.height = '';
    document.body.style.overflowY = '';
  });

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof scrollTop()).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(scrollTop())).toBe(true);
    });
  });

  describe('at rest (no scroll)', () => {
    it('should return 0 when not scrolled vertically', () => {
      expect(scrollTop()).toBe(0);
    });

    it('should return a non-negative number', () => {
      expect(scrollTop()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('after scrolling vertically', () => {
    beforeEach(() => {
      // Make page tall enough to scroll
      document.body.style.height = '5000px';
      document.body.style.overflowY = 'auto';
    });

    it('should reflect vertical scroll position after scrolling', async () => {
      window.scrollTo(0, 200);
      await new Promise((r) => setTimeout(r, 50));
      expect(scrollTop()).toBeGreaterThan(0);
    });

    it('should match window.scrollY after scrolling', async () => {
      window.scrollTo(0, 350);
      await new Promise((r) => setTimeout(r, 50));
      expect(scrollTop()).toBe(window.scrollY || window.pageYOffset || 0);
    });

    it('should increase as page is scrolled further down', async () => {
      window.scrollTo(0, 100);
      await new Promise((r) => setTimeout(r, 50));
      const first = scrollTop();

      window.scrollTo(0, 400);
      await new Promise((r) => setTimeout(r, 50));
      const second = scrollTop();

      expect(second).toBeGreaterThan(first);
    });
  });

  describe('consistency', () => {
    it('calling twice without scrolling should return the same value', () => {
      expect(scrollTop()).toBe(scrollTop());
    });
  });
});
