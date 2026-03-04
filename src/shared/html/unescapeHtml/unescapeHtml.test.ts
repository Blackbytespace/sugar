import { describe, it, expect } from 'vitest';
import unescapeHtml from './unescapeHtml.js';

describe('unescapeHtml', () => {
  it('unescapes HTML entities', () => {
    expect(unescapeHtml('&lt;div&gt;test&lt;/div&gt;')).toBe('<div>test</div>');
    expect(unescapeHtml('&amp;')).toBe('&');
    expect(unescapeHtml('&quot;')).toBe('"');
  });

  it('handles empty string', () => {
    expect(unescapeHtml('')).toBe('');
  });

  it('handles string without entities', () => {
    expect(unescapeHtml('hello world')).toBe('hello world');
  });
});