import { describe, it, expect } from 'vitest';
import replaceTags from './replaceTags.js';

describe('replaceTags', () => {
  it('replaces specified tags with custom content', () => {
    const result = replaceTags('<span>Hello</span> world', {
      span: (tag: string, content: string) => `<div>${content}</div>`
    });
    expect(result).toBe('<div>Hello</div> world');
  });

  it('handles self-closing tags', () => {
    const result = replaceTags('Start <br/> End', {
      br: () => '<hr/>'
    });
    expect(result).toBe('Start<hr/>End');
  });

  it('handles empty content', () => {
    expect(replaceTags('', { span: () => 'test' })).toBe('');
  });

  it('handles multiple same tags', () => {
    const result = replaceTags('<b>One</b> and <b>Two</b>', {
      b: (tag: string, content: string) => `*${content}*`
    });
    expect(result).toBe('*One* and *Two*');
  });
});