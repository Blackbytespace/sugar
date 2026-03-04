import { describe, it, expect } from 'vitest';
import extractCssClassesNames from './extractCssClassesNames.js';

describe('extractCssClassesNames', () => {
  it('extracts class names from HTML', () => {
    const html = '<div class="container header">Test</div>';
    expect(extractCssClassesNames(html)).toEqual(['container', 'header']);
  });

  it('handles pleasant CSS classnames', () => {
    const html = '<div class="s-typo:p">Test</div>';
    const result = extractCssClassesNames(html, { expandPleasantCssClassname: true });
    expect(result).toEqual(['s-typo', 's-typo-p']);
  });

  it('includes IDs when configured', () => {
    const html = '<div id="main" class="test">Content</div>';
    const result = extractCssClassesNames(html, { includeIds: true });
    expect(result).toContain('main');
    expect(result).toContain('test');
  });

  it('handles empty HTML', () => {
    expect(extractCssClassesNames('')).toEqual([]);
  });
});