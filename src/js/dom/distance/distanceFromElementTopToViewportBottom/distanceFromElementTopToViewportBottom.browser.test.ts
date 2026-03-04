/**
 * @name            distanceFromElementTopToViewportBottom.browser.test.ts
 * @namespace       js.dom.distance
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for distanceFromElementTopToViewportBottom
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import distanceFromElementTopToViewportBottom from './distanceFromElementTopToViewportBottom.js';

describe('distanceFromElementTopToViewportBottom (browser)', () => {
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
      expect(typeof distanceFromElementTopToViewportBottom($elm)).toBe(
        'number',
      );
    });

    it('should return a finite number', () => {
      const $elm = document.createElement('div');
      document.body.appendChild($elm);
      expect(isFinite(distanceFromElementTopToViewportBottom($elm))).toBe(true);
    });
  });

  describe('element at top of viewport', () => {
    it('element at top (offsetTop=0) should return window.innerHeight', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '0px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance).toBeCloseTo(window.innerHeight, 1);
    });

    it('element at bottom of viewport should return ~0', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.bottom = '0px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const rect = $elm.getBoundingClientRect();
      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance).toBeCloseTo(window.innerHeight - rect.top, 1);
    });
  });

  describe('element at a known position', () => {
    it('element fixed at 100px from top should return innerHeight - 100', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '100px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance).toBeCloseTo(window.innerHeight - 100, 1);
    });

    it('element fixed at 200px from top should return innerHeight - 200', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '200px';
      $elm.style.left = '0px';
      $elm.style.width = '10px';
      $elm.style.height = '10px';
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance).toBeCloseTo(window.innerHeight - 200, 1);
    });
  });

  describe('relationship to viewport height', () => {
    it('distance + elmTop should equal window.innerHeight', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = '150px';
      document.body.appendChild($elm);

      const elmTop = $elm.getBoundingClientRect().top;
      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance + elmTop).toBeCloseTo(window.innerHeight, 1);
    });

    it('element below viewport should return a negative distance', () => {
      const $elm = document.createElement('div');
      $elm.style.position = 'fixed';
      $elm.style.top = `${window.innerHeight + 100}px`;
      document.body.appendChild($elm);

      const distance = distanceFromElementTopToViewportBottom($elm);
      expect(distance).toBeLessThan(0);
    });
  });
});
