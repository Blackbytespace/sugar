import { describe, expect, it } from 'vitest';
import getCssRulesFromStylesheet from './getCssRulesFromStylesheet.js';

function injectStylesheet(css: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

describe('getCssRulesFromStylesheet', () => {
  it('returns an array', () => {
    const style = injectStylesheet('.foo { color: red; }');
    const rules = getCssRulesFromStylesheet(style.sheet!);
    document.head.removeChild(style);
    expect(Array.isArray(rules)).toBe(true);
  });

  it('returns rules for a simple stylesheet', () => {
    const style = injectStylesheet('.bar { font-size: 14px; }');
    const rules = getCssRulesFromStylesheet(style.sheet!);
    document.head.removeChild(style);
    expect(rules.length).toBeGreaterThan(0);
  });

  it('returns multiple rules', () => {
    const style = injectStylesheet('.a { color: red; } .b { color: blue; }');
    const rules = getCssRulesFromStylesheet(style.sheet!);
    document.head.removeChild(style);
    expect(rules.length).toBe(2);
  });

  it('returns keyframes rules', () => {
    const style = injectStylesheet(
      '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
    );
    const rules = getCssRulesFromStylesheet(style.sheet!);
    document.head.removeChild(style);
    expect(rules.length).toBe(1);
  });

  it('returns empty array for empty stylesheet', () => {
    const style = injectStylesheet('');
    const rules = getCssRulesFromStylesheet(style.sheet!);
    document.head.removeChild(style);
    expect(rules).toEqual([]);
  });

  it('returns empty array on error', () => {
    const rules = getCssRulesFromStylesheet({} as StyleSheet);
    expect(Array.isArray(rules)).toBe(true);
  });
});
