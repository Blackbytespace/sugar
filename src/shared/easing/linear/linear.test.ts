import linear from './linear';

describe('linear', () => {
  it('should return input unchanged', () => {
    expect(linear(0)).toBe(0);
    expect(linear(0.5)).toBe(0.5);
    expect(linear(1)).toBe(1);
  });

  it('should handle edge values', () => {
    expect(linear(-1)).toBe(-1);
    expect(linear(2)).toBe(2);
  });
});