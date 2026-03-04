import currencyCodeToSymbol from './currencyCodeToSymbol';

describe('currencyCodeToSymbol', () => {
  it('should convert USD to $', () => {
    expect(currencyCodeToSymbol('USD')).toBe('$');
  });

  it('should convert EUR to €', () => {
    expect(currencyCodeToSymbol('EUR')).toBe('€');
  });

  it('should convert GBP to £', () => {
    expect(currencyCodeToSymbol('GBP')).toBe('£');
  });

  it('should handle lowercase input', () => {
    expect(currencyCodeToSymbol('usd')).toBe('$');
  });

  it('should handle whitespace', () => {
    expect(currencyCodeToSymbol('  USD  ')).toBe('$');
  });

  it('should return undefined for invalid codes', () => {
    expect(currencyCodeToSymbol('INVALID')).toBeUndefined();
  });
});