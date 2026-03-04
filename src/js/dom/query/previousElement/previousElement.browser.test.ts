/**
 * @name            previousElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for previousElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import previousElement from './previousElement.js';

describe('previousElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an HTMLElement or undefined', () => {
      document.body.innerHTML = `<div id="a" class="target"></div><div id="b"></div>`;
      const $b = document.getElementById('b')!;
      const result = previousElement($b, '.target');
      expect(result === undefined || result instanceof HTMLElement).toBe(true);
    });
  });

  describe('finding previous sibling', () => {
    it('should find the previous sibling matching a selector', () => {
      document.body.innerHTML = `
        <div id="a" class="target"></div>
        <div id="b"></div>`;
      const $b = document.getElementById('b')!;
      const result = previousElement($b, '.target');
      expect(result?.id).toBe('a');
    });

    it('should skip non-matching siblings', () => {
      document.body.innerHTML = `
        <div id="target" class="match"></div>
        <div id="skip1"></div>
        <div id="skip2"></div>
        <div id="current"></div>`;
      const $current = document.getElementById('current')!;
      const result = previousElement($current, '.match');
      expect(result?.id).toBe('target');
    });

    it('should return undefined if no previous sibling matches', () => {
      document.body.innerHTML = `
        <div id="a"></div>
        <div id="b"></div>`;
      const $b = document.getElementById('b')!;
      const result = previousElement($b, '.nonexistent');
      expect(result).toBeUndefined();
    });

    it('should return undefined if element has no previous siblings', () => {
      document.body.innerHTML = `<div id="a"></div>`;
      const $a = document.getElementById('a')!;
      const result = previousElement($a, 'div');
      expect(result).toBeUndefined();
    });

    it('should match by tag name', () => {
      document.body.innerHTML = `
        <span id="span"></span>
        <div id="b"></div>`;
      const $b = document.getElementById('b')!;
      const result = previousElement($b, 'span');
      expect(result?.id).toBe('span');
    });
  });
});
