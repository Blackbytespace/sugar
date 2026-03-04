import { describe, expect, it } from 'vitest';
import getKeyframesFromStylesheets from './getKeyframesFromStylesheets.js';

function injectStylesheet(css: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

describe('getKeyframesFromStylesheets', () => {
  it('returns an array', () => {
    const style = injectStylesheet(
      '@keyframes ks1 { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getKeyframesFromStylesheets('ks1', document.styleSheets);
    document.head.removeChild(style);
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns keyframe items with offset property', () => {
    const style = injectStylesheet(
      '@keyframes ks2 { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getKeyframesFromStylesheets('ks2', document.styleSheets);
    document.head.removeChild(style);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('offset');
  });

  it('returns 2 entries for from/to animation', () => {
    const style = injectStylesheet(
      '@keyframes ks3 { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getKeyframesFromStylesheets('ks3', document.styleSheets);
    document.head.removeChild(style);
    expect(result.length).toBe(2);
  });

  it('returns 3 entries for 0/50/100 animation', () => {
    const style = injectStylesheet(
      '@keyframes ks4 { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }',
    );
    const result = getKeyframesFromStylesheets('ks4', document.styleSheets);
    document.head.removeChild(style);
    expect(result.length).toBe(3);
  });

  it('returns empty array for unknown animation name', () => {
    const result = getKeyframesFromStylesheets(
      'nonExistentAnim',
      document.styleSheets,
    );
    expect(result).toEqual([]);
  });

  it('returns empty array for empty stylesheets list', () => {
    const result = getKeyframesFromStylesheets('anything', [] as any);
    expect(result).toEqual([]);
  });
});
