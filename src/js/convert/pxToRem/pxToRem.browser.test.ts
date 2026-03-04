/**
 * @name            pxToRem.browser.test.ts
 * @namespace       js.convert
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for pxToRem — converts px values to rem using the
 * computed font-size of the root element (document.documentElement).
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect } from 'vitest';
import pxToRem from './pxToRem.js';

describe('pxToRem (browser)', () => {
  // -------------------------------------------------------------------------
  // Return type
  // -------------------------------------------------------------------------

  describe('return type', () => {
    it('should return a number', () => {
      expect(typeof pxToRem(16)).toBe('number');
    });

    it('should return a finite number', () => {
      expect(isFinite(pxToRem(16))).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Basic conversions
  // -------------------------------------------------------------------------

  describe('basic conversions', () => {
    it('0 px should equal 0 rem', () => {
      expect(pxToRem(0)).toBe(0);
    });

    it('result should be positive for a positive px value', () => {
      expect(pxToRem(16)).toBeGreaterThan(0);
    });

    it('px equal to the root font-size should produce 1 rem', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToRem(rootFontSize)).toBeCloseTo(1, 5);
    });

    it('twice the root font-size should produce 2 rem', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToRem(2 * rootFontSize)).toBeCloseTo(2, 5);
    });

    it('result should scale linearly with the px value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToRem(3 * rootFontSize)).toBeCloseTo(3, 5);
      expect(pxToRem(0.5 * rootFontSize)).toBeCloseTo(0.5, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('negative px value should produce a negative rem value', () => {
      expect(pxToRem(-16)).toBeLessThan(0);
    });

    it('fractional px value should work correctly', () => {
      expect(typeof pxToRem(1.5)).toBe('number');
      expect(isFinite(pxToRem(1.5))).toBe(true);
    });

    it('large px value should produce a proportionally large rem value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToRem(100 * rootFontSize)).toBeCloseTo(100, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Inverse relationship with remToPx
  // -------------------------------------------------------------------------

  describe('inverse relationship', () => {
    it('rem * rootFontSize should give back the original px value', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const px = 36;
      const rem = pxToRem(px);
      expect(rem * rootFontSize).toBeCloseTo(px, 5);
    });

    it('pxToRem(rootFontSize) should equal 1', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      expect(pxToRem(rootFontSize)).toBeCloseTo(1, 5);
    });
  });

  // -------------------------------------------------------------------------
  // Consistency: always uses document.documentElement
  // -------------------------------------------------------------------------

  describe('root element consistency', () => {
    it('should always use document.documentElement font-size', () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      // Create a child element with a very different font-size
      const child = document.createElement('div');
      child.style.fontSize = '50px';
      document.body.appendChild(child);

      // pxToRem ignores child elements — always uses root
      // 50px relative to root should not equal 1 rem unless root is 50px
      const rem = pxToRem(rootFontSize);
      expect(rem).toBeCloseTo(1, 5);
    });
  });
});
