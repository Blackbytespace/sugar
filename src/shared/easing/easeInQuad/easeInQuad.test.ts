import easeInQuad from './easeInQuad';

describe('easeInQuad', () => {
  it('should return quadratic curve values', () => {
    expect(easeInQuad(0)).toBe(0);
    expect(easeInQuad(0.5)).toBe(0.25);
    expect(easeInQuad(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInQuad(0.3)).toBeLessThan(easeInQuad(0.7));
  });
});