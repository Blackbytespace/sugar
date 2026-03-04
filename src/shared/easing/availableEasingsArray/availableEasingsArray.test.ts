import availableEasingsArray from './availableEasingsArray';

describe('availableEasingsArray', () => {
  it('should return array of easing names', () => {
    const easings = availableEasingsArray();
    expect(Array.isArray(easings)).toBe(true);
    expect(easings.length).toBeGreaterThan(0);
  });

  it('should include common easing functions', () => {
    const easings = availableEasingsArray();
    expect(easings).toContain('easeInQuad');
    expect(easings).toContain('easeOutQuad');
    expect(easings).toContain('easeInOutQuad');
  });
});