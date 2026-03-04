import easeOutQuint from './easeOutQuint';

describe('easeOutQuint', () => {
  it('should return boundary values correctly', () => {
    expect(easeOutQuint(0)).toBe(0);
    expect(easeOutQuint(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeOutQuint(0.3)).toBeLessThan(easeOutQuint(0.7));
  });

  it('should ease out faster than linear', () => {
    expect(easeOutQuint(0.5)).toBeGreaterThan(0.5);
  });
});