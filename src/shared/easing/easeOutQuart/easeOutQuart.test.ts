import easeOutQuart from './easeOutQuart';

describe('easeOutQuart', () => {
  it('should return boundary values correctly', () => {
    expect(easeOutQuart(0)).toBe(0);
    expect(easeOutQuart(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeOutQuart(0.3)).toBeLessThan(easeOutQuart(0.7));
  });

  it('should ease out faster than linear', () => {
    expect(easeOutQuart(0.5)).toBeGreaterThan(0.5);
  });
});