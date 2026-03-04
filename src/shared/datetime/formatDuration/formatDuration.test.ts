import formatDuration from './formatDuration';

describe('formatDuration', () => {
  it('should format milliseconds', () => {
    expect(formatDuration(500)).toBe('500ms');
    expect(formatDuration(999)).toBe('999ms');
  });

  it('should format seconds', () => {
    expect(formatDuration(1000)).toBe('1.00s');
    expect(formatDuration(2500)).toBe('2.50s');
    expect(formatDuration(59999)).toBe('60.00s'); // Rounds up
  });

  it('should format minutes and seconds', () => {
    expect(formatDuration(60000)).toBe('1m');
    expect(formatDuration(90000)).toBe('1m30s');
    expect(formatDuration(125000)).toBe('2m5s');
  });

  it('should format hours and minutes', () => {
    expect(formatDuration(3600000)).toBe('1h');
    expect(formatDuration(3660000)).toBe('1h1m');
    expect(formatDuration(7200000)).toBe('2h');
  });

  it('should handle infinity', () => {
    expect(formatDuration(Infinity)).toBe('...');
  });

  it('should handle zero', () => {
    expect(formatDuration(0)).toBe('0ms');
  });
});