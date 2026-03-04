/**
 * @name            remToPx.browser.test.ts
 * @namespace       js.convert
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for remToPx — converts rem values to px using the
 * computed font-size of the root element (document.documentElement).
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect } from 'vitest';
import remToPx from './remToPx.js';

describe('remToPx (browser)', () => {
  // -------------------------------------------------------------------------
  // Return type
  // -------------------------------------------------------------------------

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof remToPx(1)).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(remToPx(1))).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Basic conversions
  // -------------------------------------------------------------------------

  describe('basic conversions', () => {
    it('0 rem should equal 0 px', () => {
      expect(remToPx(0)).toBe(0);
    });

    it('result should be positive for a positive rem value', () => {
      expect(remToPx(1)).toBeGreaterThan(0);
    });

    it('1 rem should equal the root font-size in px', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(remToPx(1)).toBeCloseTo(rootFontSize, 5);
    });

    it('2 rem should equal twice the root font-size in px', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(remToPx(2)).toBeCloseTo(2 * rootFontSize, 5);
    });

    it('result should scale linearly with the rem value', () => {
      const one = remToPx(1);
      expect(remToPx(3)).toBeCloseTo(3 * one, 5);
      expect(remToPx(0.5)).toBeCloseTo(0.5 * one, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('negative rem value should produce a negative px value', () => {
      expect(remToPx(-1)).toBeLessThan(0);
    });

    it('fractional rem values should work correctly', () => {
      expect(typeof remToPx(0.125)).toBe('number');
      expect(isFinite(remToPx(0.125))).toBe(true);
    });

    it('large rem value should produce a proportionally large px value', () => {
      const one = remToPx(1);
      expect(remToPx(100)).toBeCloseTo(100 * one, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Inverse relationship with pxToRem
  // -------------------------------------------------------------------------

  describe('inverse relationship', () => {
    it('remToPx(1) should equal the root font-size in px', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(remToPx(1)).toBeCloseTo(rootFontSize, 5);
    });

    it('px / remToPx(1) should give back the original rem value', () => {
      const rem = 2.5;
      const px = remToPx(rem);
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(px / rootFontSize).toBeCloseTo(rem, 5);
    });

    it('remToPx(pxToRem(px)) should round-trip back to the original px', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const originalPx = 36;
      // Manual round-trip: px → rem → px
      const rem = originalPx / rootFontSize;
      expect(remToPx(rem)).toBeCloseTo(originalPx, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Consistency: always uses document.documentElement
  // -------------------------------------------------------------------------

  describe('root element consistency', () => {
    it('should always use document.documentElement font-size regardless of other elements', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      // Create a child element with a very different font-size — remToPx should ignore it
      const child = document.createElement('div');
      child.style.fontSize = '50px';
      document.body.appendChild(child);

      expect(remToPx(1)).toBeCloseTo(rootFontSize, 5);
    });
  });
});
