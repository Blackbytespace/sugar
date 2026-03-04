import { describe, expect, test } from 'vitest';
import alphaToHex from './alphaToHex.js';

describe('alphaToHex', () => {
  test('1 → ff', () => expect(alphaToHex(1)).toBe('ff'));
  test('0 → ff (defaults to 1 due to `|| 1`)', () => expect(alphaToHex(0)).toBe('ff'));
  test('0.5 → 80', () => expect(alphaToHex(0.5)).toBe('80'));
});
