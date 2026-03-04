import easeInOutQuint from './easeInOutQuint';

describe('easeInOutQuint', () => {
  it('should return boundary values correctly', () => {
    expect(easeInOutQuint(0)).toBe(0);
    expect(easeInOutQuint(0.5)).toBe(0.5);
    expect(easeInOutQuint(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInOutQuint(0.3)).toBeLessThan(easeInOutQuint(0.7));
  });

  it('should be symmetric around 0.5', () => {
    const val1 = easeInOutQuint(0.25);
    const val2 = easeInOutQuint(0.75);
    expect(val1 + val2).toBeCloseTo(1, 5);
  });
});