import { describe, expect, it } from 'vitest';
import uniqid from './uniqid.js';

describe('uniqid', () => {
  it('returns a string', () => {
    const id = uniqid();
    expect(typeof id).toBe('string');
  });

  it('returns a non-empty string', () => {
    const id = uniqid();
    expect(id.length).toBeGreaterThan(0);
  });

  it('returns a valid UUID v4 format', () => {
    const id = uniqid();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(id).toMatch(uuidV4Regex);
  });

  it('returns a unique id each time', () => {
    const id1 = uniqid();
    const id2 = uniqid();
    expect(id1).not.toBe(id2);
  });

  it('generates many unique ids without collision', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(uniqid());
    }
    expect(ids.size).toBe(1000);
  });

  it('is synchronous (returns a plain string, not a Promise)', () => {
    const result: unknown = uniqid();
    expect(result instanceof Promise).toBe(false);
    expect(typeof result).toBe('string');
  });
});
