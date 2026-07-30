import { describe, it, expect } from 'vitest';
import sanitizeSvg from './sanitizeSvg.js';

describe('sanitizeSvg', () => {
  it('removes script elements', () => {
    expect(sanitizeSvg('<svg><script>alert(1)</script></svg>')).toBe('<svg></svg>');
    expect(sanitizeSvg('<svg><script src="x.js"/></svg>')).toBe('<svg></svg>');
  });

  it('removes inline event handler attributes', () => {
    expect(sanitizeSvg('<svg onload="alert(1)"></svg>')).toBe('<svg></svg>');
    expect(sanitizeSvg("<circle ONCLICK='x()' r=\"5\"></circle>")).toBe('<circle r="5"></circle>');
  });

  it('removes javascript: urls', () => {
    expect(sanitizeSvg('<a href="javascript:alert(1)"></a>')).toBe('<a></a>');
    expect(sanitizeSvg('<a xlink:href="javascript:alert(1)"></a>')).toBe('<a></a>');
  });

  it('keeps safe markup untouched', () => {
    const svg = '<svg viewBox="0 0 10 10"><path d="M0 0h10v10H0z"/></svg>';
    expect(sanitizeSvg(svg)).toBe(svg);
  });

  it('handles empty string', () => {
    expect(sanitizeSvg('')).toBe('');
  });
});
