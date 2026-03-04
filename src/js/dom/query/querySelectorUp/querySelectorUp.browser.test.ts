/**
 * @name            querySelectorUp.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for querySelectorUp
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import querySelectorUp from './querySelectorUp.js';

describe('querySelectorUp (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('css selector', () => {
    it('should find the first parent matching the selector', () => {
      document.body.innerHTML = `
        <div class="grandparent">
          <div class="parent target">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, '.target');
      expect(result?.classList.contains('target')).toBe(true);
    });

    it('should find the grandparent if parent does not match', () => {
      document.body.innerHTML = `
        <div class="grandparent target">
          <div class="parent">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, '.target');
      expect(result?.classList.contains('grandparent')).toBe(true);
    });

    it('should return undefined when no parent matches', () => {
      document.body.innerHTML = `
        <div>
          <span id="child"></span>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, '.nonexistent');
      expect(result).toBeUndefined();
    });

    it('should match by attribute selector', () => {
      document.body.innerHTML = `
        <div data-role="container">
          <span id="child"></span>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, '[data-role="container"]');
      expect(result?.getAttribute('data-role')).toBe('container');
    });
  });

  describe('function selector', () => {
    it('should find a parent using a predicate function', () => {
      document.body.innerHTML = `
        <div id="match" data-custom="yes">
          <div>
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, (el: HTMLElement) =>
        el.hasAttribute('data-custom'),
      );
      expect(result?.id).toBe('match');
    });

    it('should return undefined when predicate never matches', () => {
      document.body.innerHTML = `<div><span id="child"></span></div>`;
      const $child = document.getElementById('child')!;
      const result = querySelectorUp($child, () => false);
      expect(result).toBeUndefined();
    });
  });
});
