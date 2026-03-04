/**
 * @name            stylesheetToString.browser.test.ts
 * @namespace       js.dom.css
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for stylesheetToString
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import stylesheetToString from './stylesheetToString.js';

/** Injects a <style> tag and returns both the element and its CSSStyleSheet. */
function createStylesheet(css: string): {
  $style: HTMLStyleElement;
  sheet: CSSStyleSheet;
} {
  const $style = document.createElement('style');
  $style.textContent = css;
  document.head.appendChild($style);
  return { $style, sheet: $style.sheet as CSSStyleSheet };
}

describe('stylesheetToString (browser)', () => {
  const addedStyles: HTMLStyleElement[] = [];

  afterEach(() => {
    addedStyles.forEach(($s) => $s.remove());
    addedStyles.length = 0;
  });

  function addStyle(css: string): {
    $style: HTMLStyleElement;
    sheet: CSSStyleSheet;
  } {
    const result = createStylesheet(css);
    addedStyles.push(result.$style);
    return result;
  }

  describe('return type', () => {
    it('should return a string', () => {
      const { sheet } = addStyle('body { color: red; }');
      expect(typeof stylesheetToString(sheet)).toBe('string');
    });
  });

  describe('single StyleSheet', () => {
    it('should include CSS rules from a single stylesheet', () => {
      const { sheet } = addStyle('body { color: red; }');
      const result = stylesheetToString(sheet);
      expect(result).toContain('color');
    });

    it('should return an empty string for an empty stylesheet', () => {
      const { sheet } = addStyle('');
      const result = stylesheetToString(sheet);
      expect(result.trim()).toBe('');
    });

    it('should include multiple rules from one stylesheet', () => {
      const { sheet } = addStyle(
        'h1 { font-size: 2em; } p { line-height: 1.5; }',
      );
      const result = stylesheetToString(sheet);
      expect(result).toContain('font-size');
      expect(result).toContain('line-height');
    });

    it('rules should be separated by newlines', () => {
      const { sheet } = addStyle('h1 { color: blue; } h2 { color: green; }');
      const result = stylesheetToString(sheet);
      // Two rules → at least one newline separator
      expect(result.split('\n').length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('StyleSheetList', () => {
    beforeEach(() => {
      // Remove all stylesheets to get a clean StyleSheetList
      document
        .querySelectorAll('style,link[rel="stylesheet"]')
        .forEach((el) => el.remove());
    });

    it('should concatenate rules from multiple stylesheets', () => {
      addStyle('.foo { color: red; }');
      addStyle('.bar { color: blue; }');
      const result = stylesheetToString(document.styleSheets);
      expect(result).toContain('color: red');
      expect(result).toContain('color: blue');
    });

    it('should return a string when passed a StyleSheetList', () => {
      addStyle('div { margin: 0; }');
      const result = stylesheetToString(document.styleSheets);
      expect(typeof result).toBe('string');
    });

    it('should return empty string for empty StyleSheetList', () => {
      // All styles removed in beforeEach
      const result = stylesheetToString(document.styleSheets);
      expect(result.trim()).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle @media rules', () => {
      const { sheet } = addStyle(
        '@media (max-width: 600px) { body { font-size: 14px; } }',
      );
      const result = stylesheetToString(sheet);
      expect(result).toContain('max-width');
    });

    it('should handle @keyframes rules', () => {
      const { sheet } = addStyle(
        '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }',
      );
      const result = stylesheetToString(sheet);
      expect(result).toContain('fade');
    });
  });
});
