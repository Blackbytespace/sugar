import { describe, expect, it } from 'vitest';
import transformKeyframeDeclaration from './transformKeyframesDeclarations.js';

function getKeyframesRule(css: string, name: string): CSSKeyframesRule | null {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const rules = Array.from(style.sheet!.cssRules);
  document.head.removeChild(style);
  return (rules.find((r: any) => r.name === name) as CSSKeyframesRule) ?? null;
}

describe('transformKeyframesDeclarations', () => {
  it('returns an array for a from/to keyframe', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }',
      'fade',
    );
    expect(kfRule).not.toBeNull();
    const keyframeRule = kfRule!.cssRules[0] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(keyframeRule);
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns item with percentage and offset properties', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade2 { from { opacity: 0; } to { opacity: 1; } }',
      'fade2',
    );
    const keyframeRule = kfRule!.cssRules[0] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(keyframeRule);
    expect(result[0]).toHaveProperty('percentage');
    expect(result[0]).toHaveProperty('offset');
    expect(result[0]).toHaveProperty('rules');
  });

  it('offset equals percentage / 100', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade3 { 50% { opacity: 0.5; } }',
      'fade3',
    );
    const keyframeRule = kfRule!.cssRules[0] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(keyframeRule);
    expect(result[0].percentage).toBe(50);
    expect(result[0].offset).toBeCloseTo(0.5, 5);
  });

  it('rules contains camelCase style properties', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade4 { from { background-color: red; } to { background-color: blue; } }',
      'fade4',
    );
    const keyframeRule = kfRule!.cssRules[0] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(keyframeRule);
    // backgroundColor should be camelCase
    expect(result[0].rules).toHaveProperty('backgroundColor');
  });

  it('from keyword maps to percentage 0', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade5 { from { opacity: 0; } to { opacity: 1; } }',
      'fade5',
    );
    const fromRule = kfRule!.cssRules[0] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(fromRule);
    expect(result[0].offset).toBe(0);
  });

  it('to keyword maps to percentage 100', () => {
    const kfRule = getKeyframesRule(
      '@keyframes fade6 { from { opacity: 0; } to { opacity: 1; } }',
      'fade6',
    );
    // last rule is "to"
    const toRule = kfRule!.cssRules[kfRule!.cssRules.length - 1] as CSSKeyframeRule;
    const result = transformKeyframeDeclaration(toRule);
    expect(result[0].offset).toBe(1);
  });
});
