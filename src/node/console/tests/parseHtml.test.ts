import hasAnsi from 'has-ansi';
import { describe, expect, it } from 'vitest';
import parseHtml from '../parseHtml';
import tagsMap from '../tagsMap.js';

// Test cases for parseHtml

describe('parseHtml', () => {
  Object.entries(tagsMap).forEach(([key, value]) => {
    // @ts-ignore
    // @TODO        add "single" tag tests
    if (value.tagType === 'single') {
      return;
      //   it(`should format correctly the "${key}" tag`, () => {
      //     const message = `This is a <${key}/>`;
      //     const result = parseHtml(message);
      //     expect(result).toEqual('This is a \u001b[1mbold\u001b[22m message');
      //   });
    }

    it(`should format correctly the "${key}" tag`, () => {
      const message = `<${key}>This is ${key} message</${key}>`;
      const result = parseHtml(message);
      expect(hasAnsi(result)).toBe(true);
    });
  });
});
