/**
 * @name            autoResize.browser.test.ts
 * @namespace       js.dom.input
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for autoResize
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import autoResize from './autoResize.js';

describe('autoResize (browser)', () => {
  let $textarea: HTMLTextAreaElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $textarea = document.createElement('textarea');
    $textarea.style.width = '200px';
    document.body.appendChild($textarea);
  });

  describe('return type', () => {
    it('should return undefined', () => {
      expect(autoResize($textarea)).toBeUndefined();
    });

    it('should not throw', () => {
      expect(() => autoResize($textarea)).not.toThrow();
    });
  });

  describe('initial setup', () => {
    it('should set box-sizing to border-box', () => {
      autoResize($textarea);
      expect($textarea.style.boxSizing).toBe('border-box');
    });
  });

  describe('input event handling', () => {
    it('should resize height on input event', () => {
      autoResize($textarea);
      $textarea.value = 'line1\nline2\nline3\nline4\nline5';
      $textarea.dispatchEvent(new Event('input'));
      // After input event, height should be set to scrollHeight + offset
      expect($textarea.style.height).not.toBe('');
    });

    it('should set height to auto first, then scrollHeight on input', () => {
      autoResize($textarea);
      $textarea.value = 'some text';
      $textarea.dispatchEvent(new Event('input'));
      // Height should be a px value (scrollHeight + offset)
      expect($textarea.style.height).toMatch(/\d+px/);
    });

    it('should grow when more text is added', () => {
      autoResize($textarea);
      $textarea.value = 'line1';
      $textarea.dispatchEvent(new Event('input'));
      const heightSmall = parseInt($textarea.style.height);

      $textarea.value =
        'line1\nline2\nline3\nline4\nline5\nline6\nline7\nline8';
      $textarea.dispatchEvent(new Event('input'));
      const heightLarge = parseInt($textarea.style.height);

      expect(heightLarge).toBeGreaterThanOrEqual(heightSmall);
    });
  });

  describe('multiple calls', () => {
    it('should handle multiple autoResize calls on the same element', () => {
      autoResize($textarea);
      autoResize($textarea);
      // Should still be box-sizing border-box and not throw
      expect($textarea.style.boxSizing).toBe('border-box');
    });
  });
});
