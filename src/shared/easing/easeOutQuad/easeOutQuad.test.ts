import easeOutQuad from './easeOutQuad';

describe('easeOutQuad', () => {
  it('should return ease out values', () => {
    expect(easeOutQuad(0)).toBe(0);
    expect(easeOutQuad(0.5)).toBe(0.75);
    expect(easeOutQuad(1)).toBe(1);
  });

  it('should be increasing function', () => {
    expect(easeOutQuad(0.3)).toBeLessThan(easeOutQuad(0.7));
  });
});