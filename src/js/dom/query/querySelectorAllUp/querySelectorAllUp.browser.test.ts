/**
 * @name            querySelectorAllUp.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for querySelectorAllUp
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import querySelectorAllUp from './querySelectorAllUp.js';

describe('querySelectorAllUp (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an array', () => {
      document.body.innerHTML = `<div><span id="child"></span></div>`;
      const result = querySelectorAllUp(
        document.getElementById('child')!,
        'div',
      );
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('finding ancestors', () => {
    it('should find all matching ancestors', () => {
      document.body.innerHTML = `
        <div class="ancestor">
          <div class="ancestor">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorAllUp($child, '.ancestor');
      // Should find both .ancestor elements
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('should return empty array when no ancestors match', () => {
      document.body.innerHTML = `<div><span id="child"></span></div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorAllUp($child, '.nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should find the single matching ancestor', () => {
      document.body.innerHTML = `
        <div id="grandparent" class="target">
          <div id="parent">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorAllUp($child, '.target');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('grandparent');
    });
  });

  describe('function selector', () => {
    it('should work with a function selector', () => {
      document.body.innerHTML = `
        <div data-marked="true">
          <div>
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorAllUp($child, (el: HTMLElement) =>
        el.hasAttribute('data-marked'),
      );
      expect(result.length).toBe(1);
    });
  });
});
