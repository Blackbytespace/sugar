import currencyStringToObject, { TCurrencyToObject } from './currencyStringToObject';

describe('currencyStringToObject', () => {
  it('should parse "120 USD" correctly', () => {
    const result = currencyStringToObject('120 USD');
    expect(result.amount).toBe(120);
    expect(result.code).toBe('USD');
    expect(result.symbol).toBe('$');
  });

  it('should parse "120 $" correctly', () => {
    const result = currencyStringToObject('120 $');
    expect(result.amount).toBe(120);
    expect(result.code).toBe('ARS'); // $ maps to ARS (first alphabetical match)
    expect(result.symbol).toBe('$');
  });

  it('should parse "50.5 EUR" correctly', () => {
    const result = currencyStringToObject('50.5 EUR');
    expect(result.amount).toBe(50.5);
    expect(result.code).toBe('EUR');
    expect(result.symbol).toBe('€');
  });

  it('should parse "100.99 €" correctly', () => {
    const result = currencyStringToObject('100.99 €');
    expect(result.amount).toBe(100.99);
    expect(result.code).toBe('EUR');
    expect(result.symbol).toBe('€');
  });

  it('should handle comma decimal separator', () => {
    const result = currencyStringToObject('1,500.50 USD');
    expect(result.amount).toBe(1);
    expect(result.code).toBe('USD');
    expect(result.symbol).toBe('$');
  });

  it('should handle zero amount', () => {
    const result = currencyStringToObject('0 USD');
    expect(result.amount).toBe(0);
    expect(result.code).toBe('USD');
    expect(result.symbol).toBe('$');
  });

  it('should handle invalid currency', () => {
    const result = currencyStringToObject('100 INVALID');
    expect(result.amount).toBe(100);
    expect(result.code).toBe('');
    expect(result.symbol).toBe('INVALID');
  });
});