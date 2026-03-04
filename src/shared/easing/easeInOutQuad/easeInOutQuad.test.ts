import easeInOutQuad from './easeInOutQuad';

describe('easeInOutQuad', () => {
  it('should return ease in-out values', () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(0.25)).toBe(0.125);
    expect(easeInOutQuad(0.5)).toBe(0.5);
    expect(easeInOutQuad(0.75)).toBe(0.875);
    expect(easeInOutQuad(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeInOutQuad(0.3)).toBeLessThan(easeInOutQuad(0.7));
  });
});