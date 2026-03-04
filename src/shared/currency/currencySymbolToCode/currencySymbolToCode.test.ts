import currencySymbolToCode from './currencySymbolToCode';

describe('currencySymbolToCode', () => {
  it('should convert $ to ARS (first alphabetical match)', () => {
    expect(currencySymbolToCode('$')).toBe('ARS');
  });

  it('should convert € to EUR', () => {
    expect(currencySymbolToCode('€')).toBe('EUR');
  });

  it('should convert £ to EGP (first alphabetical match)', () => {
    expect(currencySymbolToCode('£')).toBe('EGP');
  });

  it('should handle whitespace', () => {
    expect(currencySymbolToCode('  $  ')).toBe('ARS');
  });

  it('should return empty string for invalid symbols', () => {
    expect(currencySymbolToCode('INVALID')).toBe('');
  });

  it('should return empty string for empty input', () => {
    expect(currencySymbolToCode('')).toBe('');
  });
});