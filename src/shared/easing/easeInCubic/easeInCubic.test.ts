import easeInCubic from './easeInCubic';

describe('easeInCubic', () => {
  it('should return cubic curve values', () => {
    expect(easeInCubic(0)).toBe(0);
    expect(easeInCubic(0.5)).toBe(0.125);
    expect(easeInCubic(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInCubic(0.3)).toBeLessThan(easeInCubic(0.7));
  });
});