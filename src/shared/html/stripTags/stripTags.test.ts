import { describe, it, expect } from 'vitest';
import stripTags from './stripTags.js';

describe('stripTags', () => {
  it('strips all tags by default', () => {
    expect(stripTags('<div><span>Hello</span> world</div>')).toBe('Hello world');
    expect(stripTags('<p>Test</p>')).toBe('Test');
  });

  it('preserves allowed tags', () => {
    expect(stripTags('<div><span>Hello</span> world</div>', ['span'])).toBe('<span>Hello</span> world');
    expect(stripTags('<p><a>Link</a></p>', ['p'])).toBe('<p>Link</p>');
  });

  it('handles tag replacement', () => {
    expect(stripTags('<div>test</div>', [], ' ')).toBe(' test ');
  });

  it('handles empty string', () => {
    expect(stripTags('')).toBe('');
  });
});