import easeOutCubic from './easeOutCubic';

describe('easeOutCubic', () => {
  it('should return ease out cubic values', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeOutCubic(0.3)).toBeLessThan(easeOutCubic(0.7));
  });

  it('should ease out faster than linear', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});