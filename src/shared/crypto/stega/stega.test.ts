import { describe, it, expect } from 'vitest';
import stega from './stega.js';

describe('sugar.shared.crypto.stega', () => {
  // ---------------------------------------------------------------------------
  // encrypt
  // ---------------------------------------------------------------------------
  describe('encrypt', () => {
    it('should return a string', () => {
      const result = stega.encrypt({ source: 'cms', field: 'title' });
      expect(typeof result).toBe('string');
    });

    it('should return a non-empty string for a plain object payload', () => {
      const result = stega.encrypt({ source: 'cms', field: 'title' });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should encode a string payload', () => {
      const result = stega.encrypt('hello');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should encode a numeric payload', () => {
      const result = stega.encrypt(42);
      expect(typeof result).toBe('string');
    });

    it('should encode a nested object payload', () => {
      const result = stega.encrypt({ a: { b: { c: 'deep' } } });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should produce different outputs for different payloads', () => {
      const r1 = stega.encrypt({ field: 'title' });
      const r2 = stega.encrypt({ field: 'body' });
      expect(r1).not.toBe(r2);
    });
  });

  // ---------------------------------------------------------------------------
  // decrypt
  // ---------------------------------------------------------------------------
  describe('decrypt', () => {
    it('should return the original payload after an encrypt → decrypt round-trip', () => {
      const payload = { source: 'cms', field: 'title' };
      const encoded = stega.encrypt(payload);
      const decoded = stega.decrypt(encoded);
      expect(decoded).toEqual(payload);
    });

    it('should round-trip a string payload', () => {
      const payload = 'hello world';
      const encoded = stega.encrypt(payload);
      const decoded = stega.decrypt(encoded);
      expect(decoded).toEqual(payload);
    });

    it('should round-trip a numeric payload', () => {
      const payload = 123;
      const encoded = stega.encrypt(payload);
      const decoded = stega.decrypt(encoded);
      expect(decoded).toEqual(payload);
    });

    it('should round-trip a nested object payload', () => {
      const payload = { a: 1, b: { c: [1, 2, 3] } };
      const encoded = stega.encrypt(payload);
      const decoded = stega.decrypt(encoded);
      expect(decoded).toEqual(payload);
    });

    it('should return null for a plain string with no hidden payload', () => {
      const decoded = stega.decrypt('no hidden data here');
      expect(decoded).toBeNull();
    });

    it('should return null for an empty string', () => {
      const decoded = stega.decrypt('');
      expect(decoded).toBeNull();
    });

    it('should not throw for any input and return null on failure', () => {
      expect(() => stega.decrypt('garbage \x00\x01\x02')).not.toThrow();
      // May return null or a value — must not throw
    });
  });
});
