/**
 * @name            injectStyle.browser.test.ts
 * @namespace       js.dom.inject
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for injectStyle
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import injectStyle from './injectStyle.js';

describe('injectStyle (browser)', () => {
  beforeEach(() => {
    // Remove all injected style tags before each test
    document.querySelectorAll('style[id^="injected-style-"]').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('style[id^="test-style-"]').forEach((el) => {
      el.remove();
    });
  });

  describe('return type', () => {
    it('should return an HTMLStyleElement', () => {
      const $style = injectStyle('body { color: red; }');
      expect($style).toBeInstanceOf(HTMLStyleElement);
      $style?.remove();
    });

    it('should not throw', () => {
      expect(() => injectStyle('body { margin: 0; }')).not.toThrow();
    });
  });

  describe('DOM injection', () => {
    it('should append a style tag to the document head', () => {
      const $style = injectStyle('body { padding: 0; }');
      expect(document.head.contains($style!)).toBe(true);
      $style?.remove();
    });

    it('should set the correct innerHTML', () => {
      const css = '.my-class { font-size: 16px; }';
      const $style = injectStyle(css);
      expect($style?.innerHTML).toBe(css);
      $style?.remove();
    });

    it('should set type to text/css', () => {
      const $style = injectStyle('a { color: blue; }');
      expect($style?.type).toBe('text/css');
      $style?.remove();
    });

    it('should assign an auto-generated id', () => {
      const $style = injectStyle('h1 { color: green; }');
      expect($style?.id).toMatch(/^injected-style-/);
      $style?.remove();
    });
  });

  describe('custom id setting', () => {
    it('should use the provided id', () => {
      const $style = injectStyle('h2 { color: blue; }', {
        id: 'test-style-custom',
      });
      expect($style?.id).toBe('test-style-custom');
      $style?.remove();
    });

    it('should return undefined on second call with same id (deduplication)', () => {
      const id = 'test-style-dedup';
      const $first = injectStyle('p { color: red; }', { id });
      expect($first).toBeInstanceOf(HTMLStyleElement);
      const $second = injectStyle('p { color: blue; }', { id });
      expect($second).toBeUndefined();
      $first?.remove();
    });

    it('should not inject duplicate style when id already exists in DOM', () => {
      const id = 'test-style-nodup';
      injectStyle('span { color: red; }', { id });
      injectStyle('span { color: blue; }', { id });
      const all = document.querySelectorAll(`#${id}`);
      expect(all.length).toBe(1);
      all[0].remove();
    });
  });

  describe('custom rootNode setting', () => {
    it('should inject into a custom rootNode', () => {
      const $shadow = document.createElement('div');
      document.body.appendChild($shadow);
      const $style = injectStyle('p { margin: 0; }', { rootNode: $shadow });
      expect($shadow.contains($style!)).toBe(true);
      $shadow.remove();
    });

    it('should not inject into head when rootNode is given', () => {
      const $root = document.createElement('div');
      document.body.appendChild($root);
      const id = 'test-style-rootnode';
      injectStyle('em { font-style: normal; }', { id, rootNode: $root });
      expect(document.head.querySelector(`#${id}`)).toBeNull();
      $root.remove();
    });
  });

  describe('style application', () => {
    it('should apply injected styles to the DOM', () => {
      const id = 'test-style-apply';
      const $el = document.createElement('div');
      $el.className = 'inject-style-test-target';
      document.body.appendChild($el);
      const $style = injectStyle(
        '.inject-style-test-target { display: inline-block; }',
        { id },
      );
      const computed = window.getComputedStyle($el).display;
      expect(computed).toBe('inline-block');
      $style?.remove();
      $el.remove();
    });
  });
});
