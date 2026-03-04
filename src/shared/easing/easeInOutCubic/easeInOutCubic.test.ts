import easeInOutCubic from './easeInOutCubic';

describe('easeInOutCubic', () => {
  it('should return boundary values correctly', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(0.5)).toBe(0.5);
    expect(easeInOutCubic(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInOutCubic(0.3)).toBeLessThan(easeInOutCubic(0.7));
  });

  it('should be symmetric around 0.5', () => {
    const val1 = easeInOutCubic(0.25);
    const val2 = easeInOutCubic(0.75);
    expect(val1 + val2).toBeCloseTo(1, 5);
  });
});