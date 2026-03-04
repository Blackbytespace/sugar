/**
 * @name            emToPx.browser.test.ts
 * @namespace       js.convert
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for emToPx — converts em values to px using the
 * computed font-size of a reference element.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import emToPx from './emToPx.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Creates a detached div with a known font-size and appends it to <body>. */
function createElmWithFontSize(px: number): HTMLElement {
  const el = document.createElement('div');
  el.style.fontSize = `${px}px`;
  document.body.appendChild(el);
  return el;
}

describe('emToPx (browser)', () => {
  // -------------------------------------------------------------------------
  // Return type
  // -------------------------------------------------------------------------

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof emToPx(1)).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(emToPx(1))).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Basic conversions against document.documentElement (default $elm)
  // -------------------------------------------------------------------------

  describe('default element (document.documentElement)', () => {
    it('0 em should equal 0 px', () => {
      expect(emToPx(0)).toBe(0);
    });

    it('result should be a positive number for a positive em value', () => {
      expect(emToPx(1)).toBeGreaterThan(0);
    });

    it('2 em should be exactly twice the font-size of documentElement', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(emToPx(2)).toBeCloseTo(2 * rootFontSize, 5);
    });

    it('result should scale linearly with the em value', () => {
      const one = emToPx(1);
      expect(emToPx(3)).toBeCloseTo(3 * one, 5);
      expect(emToPx(0.5)).toBeCloseTo(0.5 * one, 5);
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

    it('1 em should equal the element font-size in px', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(emToPx(1, el)).toBeCloseTo(fontSize, 5);
    });

    it('2 em should equal twice the element font-size in px', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(emToPx(2, el)).toBeCloseTo(2 * fontSize, 5);
    });

    it('0.5 em should equal half the element font-size in px', () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      expect(emToPx(0.5, el)).toBeCloseTo(0.5 * fontSize, 5);
    });

    it('result for a 10 px font-size element: 3 em → 30 px', () => {
      const small = createElmWithFontSize(10);
      const fontSize = parseFloat(getComputedStyle(small).fontSize);
      expect(emToPx(3, small)).toBeCloseTo(3 * fontSize, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('negative em value should produce a negative px value', () => {
      expect(emToPx(-1)).toBeLessThan(0);
    });

    it('fractional em values should work correctly', () => {
      expect(typeof emToPx(0.125)).toBe('number');
      expect(isFinite(emToPx(0.125))).toBe(true);
    });

    it('large em value should produce a proportionally large px value', () => {
      const one = emToPx(1);
      expect(emToPx(100)).toBeCloseTo(100 * one, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Inverse relationship with pxToEm
  // -------------------------------------------------------------------------

  describe('inverse relationship', () => {
    it('emToPx(1) should equal the root font-size in px', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(emToPx(1)).toBeCloseTo(rootFontSize, 5);
    });

    it('px / emToPx(1) should give back the original em value', () => {
      const em = 2.5;
      const px = emToPx(em);
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(px / rootFontSize).toBeCloseTo(em, 5);
    });
  });
});
