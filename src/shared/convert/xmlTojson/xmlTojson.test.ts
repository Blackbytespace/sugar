import { describe, expect, test } from 'vitest';
import xmlToJson from './xmlTojson.js';

describe('xmlToJson', () => {
  test('simple element', () => {
    expect(xmlToJson('<root><name>hello</name></root>')).toEqual({ root: { name: 'hello' } });
  });
  test('number value', () => {
    expect(xmlToJson('<root><count>42</count></root>')).toEqual({ root: { count: 42 } });
  });
  test('nested elements', () => {
    const result = xmlToJson('<a><b><c>1</c></b></a>');
    expect(result).toEqual({ a: { b: { c: 1 } } });
  });
});
