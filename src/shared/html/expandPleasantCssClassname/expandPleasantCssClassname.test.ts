import { describe, it, expect } from 'vitest';
import expandPleasantCssClassname from './expandPleasantCssClassname.js';

describe('expandPleasantCssClassname', () => {
  it('expands colon classnames', () => {
    expect(expandPleasantCssClassname('s-typo:h1')).toBe('s-typo s-typo-h1');
    expect(expandPleasantCssClassname('s-font:20')).toBe('s-font s-font-20');
  });

  it('handles media queries', () => {
    expect(expandPleasantCssClassname('@desktop s-typo:h1')).toBe('s-typo_desktop s-typo-h1_desktop');
  });

  it('handles regular classnames', () => {
    expect(expandPleasantCssClassname('regular-class')).toBe('regular-class');
  });

  it('handles multiple classnames', () => {
    expect(expandPleasantCssClassname('class1 s-typo:p class2')).toBe('class1 s-typo s-typo-p class2');
  });

  it('handles empty string', () => {
    expect(expandPleasantCssClassname('')).toBe('');
  });
});