/**
 * @name            closestScrollableElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for closestScrollableElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import closestScrollableElement from './closestScrollableElement.js';

describe('closestScrollableElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('with a scrollable parent', () => {
    it('should find the closest scrollable ancestor', () => {
      const $scrollable = document.createElement('div');
      $scrollable.style.cssText = 'overflow:scroll;width:200px;height:200px;';
      const $inner = document.createElement('div');
      $inner.style.cssText = 'height:1000px;';
      const $child = document.createElement('span');
      $inner.appendChild($child);
      $scrollable.appendChild($inner);
      document.body.appendChild($scrollable);

      const result = closestScrollableElement($child);
      expect(result).toBe($scrollable);
    });

    it('should find the closest among multiple scrollable ancestors', () => {
      const $outer = document.createElement('div');
      $outer.style.cssText = 'overflow:auto;width:400px;height:400px;';
      const $inner = document.createElement('div');
      $inner.style.cssText = 'overflow:scroll;width:200px;height:200px;';
      const $innerContent = document.createElement('div');
      $innerContent.style.cssText = 'height:1000px;';
      const $child = document.createElement('span');
      $innerContent.appendChild($child);
      $inner.appendChild($innerContent);
      $outer.appendChild($inner);
      document.body.appendChild($outer);

      const result = closestScrollableElement($child);
      expect(result).toBe($inner);
    });
  });

  describe('without a scrollable parent', () => {
    it('should return undefined when no scrollable ancestor exists', () => {
      document.body.innerHTML = `
        <div id="parent">
          <span id="child">text</span>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = closestScrollableElement($child);
      expect(result).toBeUndefined();
    });
  });
});
