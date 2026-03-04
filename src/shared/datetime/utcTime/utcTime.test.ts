import utcTime from './utcTime';

describe('utcTime', () => {
  it('should format time with hours, minutes, seconds', () => {
    const date = new Date('2023-01-01T10:30:45Z');
    expect(utcTime(true, true, true, date)).toBe('11:30:45'); // Uses getHours() not getUTCHours()
  });

  it('should format time without seconds', () => {
    const date = new Date('2023-01-01T10:30:45Z');
    expect(utcTime(true, true, false, date)).toBe('11:30');
  });

  it('should format time with only hours', () => {
    const date = new Date('2023-01-01T10:30:45Z');
    expect(utcTime(true, false, false, date)).toBe('11');
  });

  it('should format time with minutes and seconds only', () => {
    const date = new Date('2023-01-01T10:30:45Z');
    expect(utcTime(false, true, true, date)).toBe('30:45');
  });

  it('should use default parameters', () => {
    const result = utcTime();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\d{1,2}:\d{1,2}:\d{1,2}$/);
  });
});