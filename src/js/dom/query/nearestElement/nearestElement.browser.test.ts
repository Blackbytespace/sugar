/**
 * @name            nearestElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for nearestElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import nearestElement from './nearestElement.js';

describe('nearestElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  function createBox(left: number, top: number, size = 20): HTMLDivElement {
    const $el = document.createElement('div');
    $el.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;`;
    document.body.appendChild($el);
    return $el;
  }

  describe('return type', () => {
    it('should return an HTMLElement or undefined', () => {
      const $from = createBox(0, 0);
      const $near = createBox(50, 0);
      const result = nearestElement($from, [$near]);
      expect(result === undefined || result instanceof HTMLElement).toBe(true);
    });
  });

  describe('nearest without direction', () => {
    it('should return the closest element', () => {
      const $from = createBox(100, 100);
      const $close = createBox(110, 100);
      const $far = createBox(300, 300);
      const result = nearestElement($from, [$close, $far]);
      expect(result).toBe($close);
    });

    it('should exclude the source element', () => {
      const $from = createBox(100, 100);
      const $other = createBox(200, 100);
      const result = nearestElement($from, [$from, $other]);
      expect(result).toBe($other);
    });

    it('should return undefined for empty list', () => {
      const $from = createBox(100, 100);
      const result = nearestElement($from, []);
      expect(result).toBeUndefined();
    });
  });

  describe('directional search', () => {
    it('should only find elements above when direction is top', () => {
      const $from = createBox(100, 200);
      const $above = createBox(100, 50); // top < from top → qualifies
      const $below = createBox(100, 400); // top > from top → excluded
      const result = nearestElement($from, [$above, $below], {
        direction: 'top',
      });
      expect(result).toBe($above);
    });

    it('should only find elements below when direction is bottom', () => {
      const $from = createBox(100, 100);
      const $below = createBox(100, 300);
      const $above = createBox(100, 0);
      const result = nearestElement($from, [$below, $above], {
        direction: 'bottom',
      });
      expect(result).toBe($below);
    });
  });
});
