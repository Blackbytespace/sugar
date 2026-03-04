/**
 * @name            cursorToEnd.browser.test.ts
 * @namespace       js.dom.input
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for cursorToEnd
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import cursorToEnd from './cursorToEnd.js';

describe('cursorToEnd (browser)', () => {
  let $input: HTMLInputElement;
  let $textarea: HTMLTextAreaElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $input = document.createElement('input');
    $input.type = 'text';
    document.body.appendChild($input);

    $textarea = document.createElement('textarea');
    document.body.appendChild($textarea);
  });

  describe('return type', () => {
    it('should return undefined for input', () => {
      expect(cursorToEnd($input)).toBeUndefined();
    });

    it('should return undefined for textarea', () => {
      expect(cursorToEnd($textarea)).toBeUndefined();
    });

    it('should not throw', () => {
      expect(() => cursorToEnd($input)).not.toThrow();
    });
  });

  describe('cursor position on input', () => {
    it('should move the cursor to the end of an input', async () => {
      $input.value = 'hello world';
      $input.setSelectionRange(0, 0);
      cursorToEnd($input);
      // cursorToEnd uses setTimeout internally, so wait a tick
      await new Promise((r) => setTimeout(r, 20));
      expect($input.selectionStart).toBe($input.value.length);
      expect($input.selectionEnd).toBe($input.value.length);
    });

    it('should place cursor at end even when currently in the middle', async () => {
      $input.value = 'abcdef';
      $input.setSelectionRange(2, 4);
      cursorToEnd($input);
      await new Promise((r) => setTimeout(r, 20));
      expect($input.selectionStart).toBe(6);
    });

    it('should work with empty input', async () => {
      $input.value = '';
      cursorToEnd($input);
      await new Promise((r) => setTimeout(r, 20));
      expect($input.selectionStart).toBe(0);
      expect($input.selectionEnd).toBe(0);
    });
  });

  describe('cursor position on textarea', () => {
    it('should move the cursor to the end of a textarea', async () => {
      $textarea.value = 'line1\nline2\nline3';
      $textarea.setSelectionRange(0, 0);
      cursorToEnd($textarea);
      await new Promise((r) => setTimeout(r, 20));
      expect($textarea.selectionStart).toBe($textarea.value.length);
      expect($textarea.selectionEnd).toBe($textarea.value.length);
    });
  });

  describe('focus', () => {
    it('should focus the input element', async () => {
      cursorToEnd($input);
      // Focus is called synchronously before the setTimeout
      expect(document.activeElement).toBe($input);
    });
  });
});
