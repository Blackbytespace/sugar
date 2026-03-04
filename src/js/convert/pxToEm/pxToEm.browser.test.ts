/**
 * @name            pxToEm.browser.test.ts
 * @namespace       js.convert
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for pxToEm — converts px values to em using the
 * computed font-size of a reference element.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import pxToEm from './pxToEm.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Creates an element with a specific font-size and appends it to <body>. */
function createElmWithFontSize(px: number): HTMLElement {
  const el = document.createElement('div');
  el.style.fontSize = `${px}px`;
  document.body.appendChild(el);
  return el;
}

describe('pxToEm (browser)', () => {
  // -------------------------------------------------------------------------
  // Return type
  // -------------------------------------------------------------------------

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof pxToEm(16)).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(pxToEm(16))).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Basic conversions against document.documentElement (default $elm)
  // -------------------------------------------------------------------------

  describe('default element (document.documentElement)', () => {
    it('0 px should equal 0 em', () => {
      expect(pxToEm(0)).toBe(0);
    });

    it('result should be positive for a positive px value', () => {
      expect(pxToEm(16)).toBeGreaterThan(0);
    });

    it('px equal to the root font-size should produce 1 em', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToEm(rootFontSize)).toBeCloseTo(1, 5);
    });

    it('twice the root font-size should produce 2 em', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToEm(2 * rootFontSize)).toBeCloseTo(2, 5);
    });

    it('result should scale linearly with the px value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToEm(3 * rootFontSize)).toBeCloseTo(3, 5);
      expect(pxToEm(0.5 * rootFontSize)).toBeCloseTo(0.5, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Custom element with known font-size
  // -------------------------------------------------------------------------

  describe('custom $elm with known font-size', () => {
    let el: HTMLElement;

    beforeEach(() => {
      el = createElmWithFontSize(20);
    });

    it('px equal to the element font-size should produce 1 em', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(pxToEm(fontSize, el)).toBeCloseTo(1, 5);
    });

    it('twice the element font-size should produce 2 em', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(pxToEm(2 * fontSize, el)).toBeCloseTo(2, 5);
    });

    it('half the element font-size should produce 0.5 em', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(pxToEm(0.5 * fontSize, el)).toBeCloseTo(0.5, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('negative px value should produce a negative em value', () => {
      expect(pxToEm(-16)).toBeLessThan(0);
    });

    it('fractional px value should work correctly', () => {
      expect(typeof pxToEm(1.5)).toBe('number');
      expect(isFinite(pxToEm(1.5))).toBe(true);
    });

    it('large px value should produce a proportionally large em value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToEm(100 * rootFontSize)).toBeCloseTo(100, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Inverse relationship with emToPx
  // -------------------------------------------------------------------------

  describe('inverse relationship', () => {
    it('pxToEm(rootFontSize) should equal 1', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToEm(rootFontSize)).toBeCloseTo(1, 5);
    });

    it('em * rootFontSize should give back the original px value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const px = 36;
      const em = pxToEm(px);
      expect(em * rootFontSize).toBeCloseTo(px, 5);
    });
  });
});
