import { describe, expect, test } from 'vitest';
import mapToObject from './mapToObject.js';

describe('mapToObject', () => {
  test('converts entries', () => {
    const m = new Map([['a', 1], ['b', 2]]);
    expect(mapToObject(m)).toEqual({ a: 1, b: 2 });
  });
  test('empty map', () => expect(mapToObject(new Map())).toEqual({}));
  test('nested values', () => {
    const m = new Map([['x', { y: true }]]);
    expect(mapToObject(m)).toEqual({ x: { y: true } });
  });
});
