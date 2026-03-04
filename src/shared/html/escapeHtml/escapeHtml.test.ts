import { describe, it, expect } from 'vitest';
import escapeHtml from './escapeHtml.js';

describe('escapeHtml', () => {
  it('escapes HTML characters', () => {
    expect(escapeHtml('<div>test</div>')).toBe('&lt;div&gt;test&lt;/div&gt;');
    expect(escapeHtml('&')).toBe('&amp;');
    expect(escapeHtml('"')).toBe('&quot;');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('handles string without special characters', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});