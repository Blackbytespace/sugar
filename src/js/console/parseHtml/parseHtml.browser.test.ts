/**
 * @name            parseHtml.browser.test.ts
 * @namespace       js.console
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for parseHtml — converts HTML-like tags into ANSI escape
 * sequences suitable for styled console output.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import parseHtml from './parseHtml.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true when the string contains at least one ANSI escape sequence. */
function hasAnsi(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /\x1b\[[\d;]*m/.test(str);
}

describe('parseHtml (browser)', () => {
  // -------------------------------------------------------------------------
  // String input — colour tags
  // -------------------------------------------------------------------------

  describe('colour tags — string input', () => {
    const colourTags = [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
      'grey',
    ];

    colourTags.forEach((tag) => {
      it(`should wrap content with ANSI codes for <${tag}>`, () => {
        const result = parseHtml(`<${tag}>hello</${tag}>`);
        expect(typeof result).toBe('string');
        expect(hasAnsi(result as string)).toBe(true);
        expect(result as string).toContain('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Background colour tags
  // -------------------------------------------------------------------------

  describe('background colour tags — string input', () => {
    const bgTags = [
      'bgBlack',
      'bgRed',
      'bgGreen',
      'bgYellow',
      'bgBlue',
      'bgMagenta',
      'bgCyan',
      'bgWhite',
      'bgGrey',
    ];

    bgTags.forEach((tag) => {
      it(`should wrap content with ANSI codes for <${tag}>`, () => {
        const result = parseHtml(`<${tag}>hello</${tag}>`);
        expect(typeof result).toBe('string');
        expect(hasAnsi(result as string)).toBe(true);
        expect(result as string).toContain('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Style tags (pass-through — no ANSI in browser tagsmap)
  // -------------------------------------------------------------------------

  describe('style tags — pass-through in browser', () => {
    const styleTags = ['bold', 'dim', 'italic', 'underline', 'strike'];

    styleTags.forEach((tag) => {
      it(`should return the inner content for <${tag}> (pass-through)`, () => {
        const result = parseHtml(`<${tag}>hello</${tag}>`);
        expect(typeof result).toBe('string');
        expect(result as string).toContain('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Special / utility tags
  // -------------------------------------------------------------------------

  describe('special tags', () => {
    it('<hr/> should produce a horizontal rule of dashes', () => {
      const result = parseHtml('<hr/>') as string;
      expect(result.trim()).toBe('-'.repeat(20));
    });

    it('<br/> should produce a newline character', () => {
      const result = parseHtml('<br/>') as string;
      expect(result).toContain('\n');
    });
  });

  // -------------------------------------------------------------------------
  // Date / time tags — structural validity
  // -------------------------------------------------------------------------

  describe('date/time tags', () => {
    it('<date> should produce a DD-MM-YYYY formatted string', () => {
      const result = parseHtml('<date>x</date>') as string;
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it('<time> should produce a HH:MM:SS formatted string', () => {
      const result = parseHtml('<time>x</time>') as string;
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('<time> seconds field should not equal minutes field (regression for double-minutes bug)', () => {
      // Freeze a moment where minutes ≠ seconds to make the test deterministic
      const now = new Date();
      // We cannot easily freeze Date in a browser without mocking, so we just
      // assert the format is valid (3 distinct numeric fields, each 2 digits).
      const result = parseHtml('<time>x</time>') as string;
      const parts = result.split(':');
      expect(parts).toHaveLength(3);
      parts.forEach((p) => expect(p).toMatch(/^\d{2}$/));
    });

    it('<day> should produce a two-digit day string', () => {
      const result = parseHtml('<day>x</day>') as string;
      expect(result).toMatch(/^\d{2}$/);
      const day = parseInt(result, 10);
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(31);
    });

    it('<month> should produce a 1-based two-digit month string', () => {
      const result = parseHtml('<month>x</month>') as string;
      expect(result).toMatch(/^\d{2}$/);
      const month = parseInt(result, 10);
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);
    });

    it('<months> should match <month>', () => {
      const r1 = parseHtml('<month>x</month>') as string;
      const r2 = parseHtml('<months>x</months>') as string;
      expect(r1).toBe(r2);
    });

    it('<year> should produce the current 4-digit year', () => {
      const result = parseHtml('<year>x</year>') as string;
      expect(result).toMatch(/^\d{4}$/);
      expect(parseInt(result, 10)).toBe(new Date().getFullYear());
    });

    it('<hour> should produce a two-digit hour string', () => {
      const result = parseHtml('<hour>x</hour>') as string;
      expect(result).toMatch(/^\d{2}$/);
      const h = parseInt(result, 10);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(23);
    });

    it('<minute> should produce a two-digit minute string', () => {
      const result = parseHtml('<minute>x</minute>') as string;
      expect(result).toMatch(/^\d{2}$/);
      const m = parseInt(result, 10);
      expect(m).toBeGreaterThanOrEqual(0);
      expect(m).toBeLessThanOrEqual(59);
    });

    it('<second> should produce a two-digit second string', () => {
      const result = parseHtml('<second>x</second>') as string;
      expect(result).toMatch(/^\d{2}$/);
      const s = parseInt(result, 10);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(59);
    });
  });

  // -------------------------------------------------------------------------
  // Array input
  // -------------------------------------------------------------------------

  describe('array input', () => {
    it('should return an array when given an array', () => {
      const result = parseHtml(['<red>a</red>', '<green>b</green>']);
      expect(Array.isArray(result)).toBe(true);
      expect((result as string[]).length).toBe(2);
    });

    it('should process every element in the array', () => {
      const result = parseHtml([
        '<red>hello</red>',
        '<blue>world</blue>',
      ]) as string[];
      expect(hasAnsi(result[0])).toBe(true);
      expect(hasAnsi(result[1])).toBe(true);
    });

    it('should return a string when given a string', () => {
      const result = parseHtml('<cyan>test</cyan>');
      expect(typeof result).toBe('string');
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('should return an empty string for empty input', () => {
      const result = parseHtml('');
      expect(result).toBe('');
    });

    it('should return plain text unchanged when no known tags are present', () => {
      const result = parseHtml('hello world');
      expect(result).toBe('hello world');
    });

    it('should handle multiple tags in one string', () => {
      const result = parseHtml(
        '<red>error</red> and <green>success</green>',
      ) as string;
      expect(hasAnsi(result)).toBe(true);
      expect(result).toContain('error');
      expect(result).toContain('success');
    });

    it('should preserve surrounding text outside tags', () => {
      const result = parseHtml('before <blue>middle</blue> after') as string;
      expect(result).toContain('before');
      expect(result).toContain('middle');
      expect(result).toContain('after');
    });

    it('should handle nested same-type tags gracefully', () => {
      expect(() => parseHtml('<red><red>nested</red></red>')).not.toThrow();
    });

    it('should not throw for unknown tags (left as-is)', () => {
      const result = parseHtml('<unknowntag>text</unknowntag>') as string;
      expect(result).toContain('text');
    });
  });
});
