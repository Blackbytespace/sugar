/**
 * @name            distanceFromElementTopToViewportTop.browser.test.ts
 * @namespace       js.dom.distance
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for distanceFromElementTopToViewportTop
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import distanceFromElementTopToViewportTop from './distanceFromElementTopToViewportTop.js';

describe('distanceFromElementTopToViewportTop (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.scrollTo(0, 0);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  describe('return type', () => {
    it('should return a number', () => {
      const $elm = document.createElement('div');
      document.body.appendChild($elm);
      expect(typeof distanceFromElementTopToViewportTop($elm)).toBe('number');
    });

    it('should return a finite number', () => {
      const $elm = document.createElement('div');
      document.body.appendChild($elm);
      expect(isFinite(distanceFromElementTopToViewportTop($elm))).toBe(true);
    });
  });

  describe('element at top of viewport (no scroll)', () => {
    it('element fixed at top=0 should return ~0', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '0px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportTop($elm);
      expect(distance).toBeCloseTo(0, 1);
    });

    it('element fixed at top=100px should return ~100', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '100px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportTop($elm);
      expect(distance).toBeCloseTo(100, 1);
    });

    it('element fixed at top=250px should return ~250', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '250px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportTop($elm);
      expect(distance).toBeCloseTo(250, 1);
    });
  });

  describe('element above viewport', () => {
    it('element fixed with negative top should return a negative distance', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '-50px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportTop($elm);
      expect(distance).toBeCloseTo(-50, 1);
    });
  });

  describe('consistency with getBoundingClientRect', () => {
    it('distance should equal getBoundingClientRect().top at zero scroll', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '80px';
      document.body.appendChild($elm);

      const rect = $elm.getBoundingClientRect();
      const distance = distanceFromElementTopToViewportTop($elm);
      expect(distance).toBeCloseTo(rect.top, 1);
    });
  });
});
