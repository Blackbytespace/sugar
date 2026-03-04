/**
 * @name            closestElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for closestElement (alias for querySelectorUp)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import closestElement from './closestElement.js';

describe('closestElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('css selector', () => {
    it('should find a parent element matching the selector', () => {
      document.body.innerHTML = `
        <div class="grandparent">
          <div class="parent">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const $found = closestElement($child, '.parent');
      expect($found).not.toBeNull();
      expect($found?.classList.contains('parent')).toBe(true);
    });

    it('should find a grandparent if immediate parent does not match', () => {
      document.body.innerHTML = `
        <div class="grandparent">
          <div class="parent">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const $found = closestElement($child, '.grandparent');
      expect($found?.classList.contains('grandparent')).toBe(true);
    });

    it('should return undefined if no matching ancestor exists', () => {
      document.body.innerHTML = `<div id="child"></div>`;
      const $child = document.getElementById('child')!;
      const $found = closestElement($child, '.nonexistent');
      expect($found).toBeUndefined();
    });
  });

  describe('function selector', () => {
    it('should find the first parent matching a predicate function', () => {
      document.body.innerHTML = `
        <div id="grandparent" data-target="true">
          <div id="parent">
            <span id="child"></span>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const $found = closestElement($child, (el: HTMLElement) =>
        el.hasAttribute('data-target'),
      );
      expect($found?.id).toBe('grandparent');
    });
  });
});
