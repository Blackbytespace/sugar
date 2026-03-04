import { describe, expect, test } from 'vitest';
import aes from './aes.js';

describe('aes', () => {
  test('encrypts string', () => {
    const encrypted = aes.encrypt('hello world');
    expect(encrypted).toBeDefined();
    expect(encrypted.length).toBeGreaterThan(0);
  });
  test('custom key', () => {
    const msg = 'test message';
    const enc1 = aes.encrypt(msg, 'key1');
    const enc2 = aes.encrypt(msg, 'key2');
    expect(enc1).not.toBe(enc2);
  });
  test('non-string', () => expect(aes.encrypt(123)).toBeDefined());
});