/**
 * @name            clearSelection.browser.test.ts
 * @namespace       js.dom.selection
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for clearSelection
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import clearSelection from './clearSelection.js';

describe('clearSelection (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Clear any existing selection
    window.getSelection()?.removeAllRanges();
  });

  describe('return type', () => {
    it('should return undefined', () => {
      expect(clearSelection()).toBeUndefined();
    });

    it('should not throw', () => {
      expect(() => clearSelection()).not.toThrow();
    });
  });

  describe('clearing text selection', () => {
    it('should clear an existing selection', () => {
      const $p = document.createElement('p');
      $p.textContent = 'Select this text';
      document.body.appendChild($p);

      // Create a selection
      const range = document.createRange();
      range.selectNodeContents($p);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);

      // Verify selection exists
      expect(window.getSelection()?.toString()).toBe('Select this text');

      clearSelection();

      // After clearing, selection should be empty
      const selAfter = window.getSelection();
      const hasSelection =
        selAfter && selAfter.rangeCount > 0 && selAfter.toString() !== '';
      expect(hasSelection).toBeFalsy();
    });

    it('should not throw when called with no selection', () => {
      window.getSelection()?.removeAllRanges();
      expect(() => clearSelection()).not.toThrow();
    });

    it('should be idempotent when called multiple times', () => {
      const $p = document.createElement('p');
      $p.textContent = 'Some text';
      document.body.appendChild($p);

      const range = document.createRange();
      range.selectNodeContents($p);
      window.getSelection()?.addRange(range);

      clearSelection();
      clearSelection();
      clearSelection();

      const selAfter = window.getSelection();
      const hasSelection =
        selAfter && selAfter.rangeCount > 0 && selAfter.toString() !== '';
      expect(hasSelection).toBeFalsy();
    });
  });
});
