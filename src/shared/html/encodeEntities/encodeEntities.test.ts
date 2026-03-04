import { describe, it, expect } from 'vitest';
import encodeEntities from './encodeEntities.js';

describe('encodeEntities', () => {
  it('encodes HTML entities extensively', () => {
    expect(encodeEntities('<div>test</div>')).toBe('&lt;div&gt;test&lt;&sol;div&gt;');
    expect(encodeEntities('&')).toBe('&amp;');
    expect(encodeEntities('"')).toBe('&quot;');
  });

  it('handles empty string', () => {
    expect(encodeEntities('')).toBe('');
  });

  it('handles string without special characters', () => {
    expect(encodeEntities('hello world')).toBe('hello world');
  });
});