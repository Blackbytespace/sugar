/**
 * @name            nextElement.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for nextElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import nextElement from './nextElement.js';

describe('nextElement (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an HTMLElement or undefined', () => {
      document.body.innerHTML = `<div id="a"></div><div id="b" class="target"></div>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, '.target');
      expect(result === undefined || result instanceof HTMLElement).toBe(true);
    });
  });

  describe('finding next sibling', () => {
    it('should find the next sibling matching a selector', () => {
      document.body.innerHTML = `
        <div id="a"></div>
        <div id="b" class="target"></div>
        <div id="c"></div>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, '.target');
      expect(result?.id).toBe('b');
    });

    it('should skip non-matching siblings', () => {
      document.body.innerHTML = `
        <div id="a"></div>
        <div id="skip1"></div>
        <div id="skip2"></div>
        <div id="target" class="match"></div>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, '.match');
      expect(result?.id).toBe('target');
    });

    it('should return undefined if no next sibling matches', () => {
      document.body.innerHTML = `
        <div id="a"></div>
        <div id="b"></div>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, '.nonexistent');
      expect(result).toBeUndefined();
    });

    it('should return undefined if element has no next siblings', () => {
      document.body.innerHTML = `<div id="a"></div>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, 'div');
      expect(result).toBeUndefined();
    });

    it('should match by tag name', () => {
      document.body.innerHTML = `
        <div id="a"></div>
        <span id="span"></span>`;
      const $a = document.getElementById('a')!;
      const result = nextElement($a, 'span');
      expect(result?.id).toBe('span');
    });
  });
});
