import { describe, expect, it } from 'vitest';
import getKeyframesDeclarations from './getKeyframesDeclarations.js';

function getSheetRules(css: string): CSSRule[] {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const rules = Array.from(style.sheet!.cssRules);
  document.head.removeChild(style);
  return rules;
}

describe('getKeyframesDeclarations', () => {
  it('returns keyframe rules for named animation', () => {
    const rules = getSheetRules(
      '@keyframes myAnim { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getKeyframesDeclarations('myAnim', rules as any);
    expect(result.length).toBe(2);
  });

  it('returns empty array when animation not found', () => {
    const rules = getSheetRules(
      '@keyframes otherAnim { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getKeyframesDeclarations('missing', rules as any);
    expect(result).toEqual([]);
  });

  it('returns correct keyframe stops', () => {
    const rules = getSheetRules(
      '@keyframes threeStep { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }',
    );
    const result = getKeyframesDeclarations('threeStep', rules as any);
    expect(result.length).toBe(3);
  });

  it('returns empty array for empty rules', () => {
    const result = getKeyframesDeclarations('anyAnim', [] as any);
    expect(result).toEqual([]);
  });

  it('deduplicates animations with same name', () => {
    // Two @keyframes with same name — only first should be returned
    const rules = getSheetRules(
      '@keyframes dup { from { opacity: 0; } to { opacity: 1; } } @keyframes dup { from { color: red; } to { color: blue; } }',
    );
    const result = getKeyframesDeclarations('dup', rules as any);
    // Should only contain stops from first
    expect(result.length).toBe(2);
  });

  it('returns keyframes for second named animation when both present', () => {
    const rules = getSheetRules(
      '@keyframes first { from { opacity: 0; } to { opacity: 1; } } @keyframes second { from { color: red; } to { color: blue; } }',
    );
    const result = getKeyframesDeclarations('second', rules as any);
    expect(result.length).toBe(2);
  });
});
