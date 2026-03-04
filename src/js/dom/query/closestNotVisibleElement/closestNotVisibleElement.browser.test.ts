/**
 * @name            closestNotVisibleElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for closestNotVisibleElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import closestNotVisibleElement from './closestNotVisibleElement.js';

describe('closestNotVisibleElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('no hidden ancestor', () => {
    it('should return undefined when all ancestors are visible', () => {
      document.body.innerHTML = `<div><span id="child">text</span></div>`;
      const $child = document.getElementById('child')!;
      const result = closestNotVisibleElement($child);
      expect(result).toBeUndefined();
    });
  });

  describe('hidden ancestor via display:none', () => {
    it('should find the hidden parent with display:none', () => {
      document.body.innerHTML = `
        <div id="hidden" style="display:none">
          <span id="child">text</span>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = closestNotVisibleElement($child);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('hidden');
    });
  });

  describe('hidden ancestor via visibility:hidden', () => {
    it('should find the hidden parent with visibility:hidden', () => {
      document.body.innerHTML = `
        <div id="hidden" style="visibility:hidden">
          <span id="child">text</span>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = closestNotVisibleElement($child);
      expect(result).not.toBeNull();
    });
  });

  describe('deeply nested hidden ancestor', () => {
    it('should find the closest hidden ancestor', () => {
      document.body.innerHTML = `
        <div>
          <div id="hidden" style="display:none">
            <div id="middle">
              <span id="child">text</span>
            </div>
          </div>
        </div>`;
      const $child = document.getElementById('child')!;
      const result = closestNotVisibleElement($child);
      expect(result).not.toBeNull();
    });
  });
});
