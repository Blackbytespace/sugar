import { describe, expect, it } from 'vitest';
import getCssDeclarations from './getCssDeclarations.js';

function getSheetRules(css: string): CSSRule[] {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const rules = Array.from(style.sheet!.cssRules);
  document.head.removeChild(style);
  return rules;
}

describe('getCssDeclarations', () => {
  it('returns an array', () => {
    const rules = getSheetRules(
      '@keyframes test { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getCssDeclarations('keyframes', rules as any);
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns keyframe declarations for keyframes type', () => {
    const rules = getSheetRules(
      '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }',
    );
    const result = getCssDeclarations('keyframes', rules as any);
    expect(result.length).toBe(2);
  });

  it('returns multiple keyframe stops', () => {
    const rules = getSheetRules(
      '@keyframes multi { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }',
    );
    const result = getCssDeclarations('keyframes', rules as any);
    expect(result.length).toBe(3);
  });

  it('returns empty array when no matching type', () => {
    const rules = getSheetRules('.foo { color: red; }');
    const result = getCssDeclarations('keyframes', rules as any);
    expect(result).toEqual([]);
  });

  it('filters with predecate function', () => {
    const rules = getSheetRules(
      '@keyframes anim1 { from { opacity: 0; } to { opacity: 1; } } @keyframes anim2 { from { color: red; } to { color: blue; } }',
    );
    const result = getCssDeclarations('keyframes', rules as any, (rule: any) => rule.name === 'anim1');
    expect(result.length).toBe(2);
  });

  it('returns empty array for empty rules', () => {
    const result = getCssDeclarations('keyframes', []);
    expect(result).toEqual([]);
  });
});
