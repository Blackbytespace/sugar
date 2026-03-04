import { describe, it, expect, vi, beforeEach } from 'vitest';
import richText from './richText.js';

describe('richText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a string', () => {
    const result = richText();
    expect(typeof result).toBe('string');
  });

  it('should generate specific HTML elements when settings are provided', () => {
    const result = richText({ 
      h1: true, 
      h2: true, 
      strong: true,
      em: true,
      code: true,
      small: true,
      sup: true,
      sub: true
    });
    
    expect(result).toContain('<h1>I am an H1 heading</h1>');
    expect(result).toContain('<h2>I am an H2 heading</h2>');
    expect(result).toContain('<strong>strong</strong>');
    expect(result).toContain('<em>emphasized</em>');
    expect(result).toContain('<code>code</code>');
    expect(result).toContain('<small>small</small>');
    expect(result).toContain('<sup>superscript</sup>');
    expect(result).toContain('<sub>subscript</sub>');
  });

  it('should generate heading elements h3-h6', () => {
    const result = richText({ h3: true, h4: true, h5: true, h6: true });
    
    expect(result).toContain('<h3>I am an H3 heading</h3>');
    expect(result).toContain('<h4>I am an H4 heading</h4>');
    expect(result).toContain('<h5>I am an H5 heading</h5>');
    expect(result).toContain('<h6>I am an H6 heading</h6>');
  });

  it('should generate list elements when enabled', () => {
    const result = richText({ ul: true, ol: true, dl: true });
    
    expect(result).toContain('<ul>');
    expect(result).toContain('</ul>');
    expect(result).toContain('<ol>');
    expect(result).toContain('</ol>');
    expect(result).toContain('<dl>');
    expect(result).toContain('</dl>');
  });

  it('should generate paragraph and blockquote when enabled', () => {
    const result = richText({ p: true, blockquote: true });
    
    expect(result).toContain('<p>');
    expect(result).toContain('</p>');
    expect(result).toContain('<blockquote>');
    expect(result).toContain('</blockquote>');
  });

  it('should generate link when enabled', () => {
    const result = richText({ a: true });
    
    expect(result).toContain('<a href=');
    expect(result).toContain('">link</a>');
  });

  it('should work with empty settings', () => {
    const result = richText({});
    expect(typeof result).toBe('string');
  });

  it('should work with all elements disabled', () => {
    const result = richText({
      p: false, ul: false, ol: false, dl: false, strong: false,
      em: false, sup: false, sub: false, small: false, code: false,
      a: false, blockquote: false, h1: false, h2: false, h3: false,
      h4: false, h5: false, h6: false
    });
    
    expect(result).toBe('');
  });
});