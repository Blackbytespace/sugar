import easeInQuint from './easeInQuint';

describe('easeInQuint', () => {
  it('should return quintic curve values', () => {
    expect(easeInQuint(0)).toBe(0);
    expect(easeInQuint(0.5)).toBe(0.03125);
    expect(easeInQuint(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInQuint(0.3)).toBeLessThan(easeInQuint(0.7));
  });
});