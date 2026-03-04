import convertTime from './convertTime';

describe('convertTime', () => {
  it('should convert seconds to milliseconds', () => {
    expect(convertTime('10s', 'ms')).toBe(10000);
  });

  it('should convert minutes to seconds', () => {
    expect(convertTime('2m', 's')).toBe(120);
  });

  it('should convert hours to minutes', () => {
    expect(convertTime('1h', 'm')).toBe(60);
  });

  it('should convert days to hours', () => {
    expect(convertTime('1d', 'h')).toBe(24);
  });

  it('should handle numeric input', () => {
    expect(convertTime(5000, 's')).toBe(5);
  });

  it('should use default ms output', () => {
    expect(convertTime('1s')).toBe(1000);
  });

  it('should handle long format units', () => {
    expect(convertTime('1second', 'milliseconds')).toBe(1000);
    expect(convertTime('2minutes', 'seconds')).toBe(120);
  });

  it('should throw error for invalid format', () => {
    expect(() => convertTime('10s', 'invalid' as any)).toThrow();
  });

  it('should have static constants', () => {
    expect(convertTime.SECOND).toBe('s');
    expect(convertTime.MINUTE).toBe('m');
    expect(convertTime.HOUR).toBe('h');
  });
});