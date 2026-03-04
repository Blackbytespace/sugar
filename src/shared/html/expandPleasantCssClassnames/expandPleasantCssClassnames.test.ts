import { describe, it, expect } from 'vitest';
import expandPleasantCssClassnames from './expandPleasantCssClassnames.js';

describe('expandPleasantCssClassnames', () => {
  it('expands pleasant classnames in HTML', () => {
    const html = '<div class="s-typo:h1">Test</div>';
    const result = expandPleasantCssClassnames(html);
    expect(result).toMatch('expanded');
    expect(result).toMatch('s-typo s-typo-h1');
  });

  it('handles multiple class attributes', () => {
    const html = '<div class="s-font:20"><span class="s-color:red">Test</span></div>';
    const result = expandPleasantCssClassnames(html);
    expect(result).toMatch('s-font s-font-20');
    expect(result).toMatch('s-color s-color-red');
  });

  it('handles plain classname strings', () => {
    const result = expandPleasantCssClassnames('s-typo:p test-class');
    expect(result).toMatch('expanded');
    expect(result).toMatch('s-typo s-typo-p test-class');
  });

  it('returns original HTML when no matches', () => {
    const html = '<div>No classes here</div>';
    const result = expandPleasantCssClassnames(html);
    expect(result).toBe('<div>No classes here</div>');
  });
});