import easeInOutQuart from './easeInOutQuart';

describe('easeInOutQuart', () => {
  it('should return boundary values correctly', () => {
    expect(easeInOutQuart(0)).toBe(0);
    expect(easeInOutQuart(0.5)).toBe(0.5);
    expect(easeInOutQuart(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInOutQuart(0.3)).toBeLessThan(easeInOutQuart(0.7));
  });

  it('should be symmetric around 0.5', () => {
    const val1 = easeInOutQuart(0.25);
    const val2 = easeInOutQuart(0.75);
    expect(val1 + val2).toBeCloseTo(1, 5);
  });
});