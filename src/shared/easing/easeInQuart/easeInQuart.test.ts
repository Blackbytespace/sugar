import easeInQuart from './easeInQuart';

describe('easeInQuart', () => {
  it('should return quartic curve values', () => {
    expect(easeInQuart(0)).toBe(0);
    expect(easeInQuart(0.5)).toBe(0.0625);
    expect(easeInQuart(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInQuart(0.3)).toBeLessThan(easeInQuart(0.7));
  });
});