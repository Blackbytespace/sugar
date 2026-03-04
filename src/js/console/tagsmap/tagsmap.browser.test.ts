/**
 * @name            tagsmap.browser.test.ts
 * @namespace       js.console
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for tagsMap — the tag->function map used by parseHtml.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect } from 'vitest';
import tagsMap from './tagsmap.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true when the string contains at least one ANSI escape sequence. */
function hasAnsi(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /\x1b\[[\d;]*m/.test(str);
}

describe('tagsMap (browser)', () => {
  // -------------------------------------------------------------------------
  // Foreground colour tags
  // -------------------------------------------------------------------------

  describe('foreground colour tags', () => {
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
    ] as const;

    colourTags.forEach((tag) => {
      it(`<${tag}> should wrap content with ANSI escape codes`, () => {
        const result = tagsMap[tag](tag, 'hello');
        expect(typeof result).toBe('string');
        expect(hasAnsi(result)).toBe(true);
        expect(result).toContain('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Background colour tags
  // -------------------------------------------------------------------------

  describe('background colour tags', () => {
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
    ] as const;

    bgTags.forEach((tag) => {
      it(`<${tag}> should wrap content with ANSI escape codes`, () => {
        const result = tagsMap[tag](tag, 'hello');
        expect(typeof result).toBe('string');
        expect(hasAnsi(result)).toBe(true);
        expect(result).toContain('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Style tags — pass-through in browser (no ANSI codes)
  // -------------------------------------------------------------------------

  describe('style tags (pass-through in browser)', () => {
    const styleTags = ['bold', 'dim', 'italic', 'underline', 'strike'] as const;

    styleTags.forEach((tag) => {
      it(`<${tag}> should return inner content unchanged`, () => {
        const result = tagsMap[tag](tag, 'hello');
        expect(result).toBe('hello');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Date / time tags
  // -------------------------------------------------------------------------

  describe('date/time tags', () => {
    it('<date> should produce a DD-MM-YYYY formatted string', () => {
      const result = tagsMap.date('date', '');
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it('<date> day component should be in range 1–31', () => {
      const result = tagsMap.date('date', '');
      const day = parseInt(result.split('-')[0], 10);
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(31);
    });

    it('<date> month component should be 1-based (1–12)', () => {
      const result = tagsMap.date('date', '');
      const month = parseInt(result.split('-')[1], 10);
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);
    });

    it('<date> year component should be the current 4-digit year', () => {
      const result = tagsMap.date('date', '');
      const year = parseInt(result.split('-')[2], 10);
      expect(year).toBe(new Date().getFullYear());
    });

    it('<time> should produce a HH:MM:SS formatted string', () => {
      const result = tagsMap.time('time', '');
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('<time> all three fields should be two-digit numbers', () => {
      const result = tagsMap.time('time', '');
      const parts = result.split(':');
      expect(parts).toHaveLength(3);
      parts.forEach((p) => expect(p).toMatch(/^\d{2}$/));
    });

    it('<time> hours field should be in range 0–23', () => {
      const h = parseInt(tagsMap.time('time', '').split(':')[0], 10);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(23);
    });

    it('<time> minutes field should be in range 0–59', () => {
      const m = parseInt(tagsMap.time('time', '').split(':')[1], 10);
      expect(m).toBeGreaterThanOrEqual(0);
      expect(m).toBeLessThanOrEqual(59);
    });

    it('<time> seconds field should be in range 0–59 (regression: was showing minutes twice)', () => {
      const s = parseInt(tagsMap.time('time', '').split(':')[2], 10);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(59);
    });

    it('<day> should equal <days>', () => {
      expect(tagsMap.day('day', '')).toBe(tagsMap.days('days', ''));
    });

    it('<day> should produce a two-digit day in range 1–31', () => {
      const result = tagsMap.day('day', '');
      expect(result).toMatch(/^\d{2}$/);
      const d = parseInt(result, 10);
      expect(d).toBeGreaterThanOrEqual(1);
      expect(d).toBeLessThanOrEqual(31);
    });

    it('<month> should produce a 1-based two-digit month', () => {
      const result = tagsMap.month('month', '');
      expect(result).toMatch(/^\d{2}$/);
      const m = parseInt(result, 10);
      expect(m).toBeGreaterThanOrEqual(1);
      expect(m).toBeLessThanOrEqual(12);
    });

    it('<month> should equal <months>', () => {
      expect(tagsMap.month('month', '')).toBe(tagsMap.months('months', ''));
    });

    it('<year> should equal <years> and be the current 4-digit year', () => {
      const y = tagsMap.year('year', '');
      expect(y).toBe(tagsMap.years('years', ''));
      expect(y).toMatch(/^\d{4}$/);
      expect(parseInt(y, 10)).toBe(new Date().getFullYear());
    });

    it('<hour> should equal <hours> and be in range 0–23', () => {
      const h = tagsMap.hour('hour', '');
      expect(h).toBe(tagsMap.hours('hours', ''));
      expect(parseInt(h, 10)).toBeGreaterThanOrEqual(0);
      expect(parseInt(h, 10)).toBeLessThanOrEqual(23);
    });

    it('<minute> should equal <minutes> and be in range 0–59', () => {
      const m = tagsMap.minute('minute', '');
      expect(m).toBe(tagsMap.minutes('minutes', ''));
      expect(parseInt(m, 10)).toBeGreaterThanOrEqual(0);
      expect(parseInt(m, 10)).toBeLessThanOrEqual(59);
    });

    it('<second> should equal <seconds> and be in range 0–59', () => {
      const s = tagsMap.second('second', '');
      expect(s).toBe(tagsMap.seconds('seconds', ''));
      expect(parseInt(s, 10)).toBeGreaterThanOrEqual(0);
      expect(parseInt(s, 10)).toBeLessThanOrEqual(59);
    });
  });

  // -------------------------------------------------------------------------
  // Special / utility tags
  // -------------------------------------------------------------------------

  describe('special tags', () => {
    it('<hr/> should produce exactly 20 dashes', () => {
      const result = tagsMap.hr('hr', '');
      expect(result).toBe('-'.repeat(20));
    });

    it('<br/> should produce a newline character', () => {
      const result = tagsMap.br('br', '');
      expect(result).toBe('\n');
    });
  });

  // -------------------------------------------------------------------------
  // ANSI structure sanity checks
  // -------------------------------------------------------------------------

  describe('ANSI structure', () => {
    it('colour tags should start with an ANSI escape and end with a reset code', () => {
      const result = tagsMap.red('red', 'test');
      expect(result.startsWith('\x1b[')).toBe(true);
      expect(result.endsWith('\x1b[0m')).toBe(true);
    });

    it('background tags should start with \\u001b[ and end with a reset', () => {
      const result = tagsMap.bgRed('bgRed', 'test');
      expect(result.startsWith('\u001b[')).toBe(true);
      expect(result.endsWith('\u001b[0m')).toBe(true);
    });

    it('content should be preserved between ANSI codes', () => {
      const content = 'important message';
      ['red', 'green', 'blue', 'bgRed', 'bgGreen'].forEach((tag) => {
        const result = tagsMap[tag](tag, content);
        expect(result).toContain(content);
      });
    });
  });
});
