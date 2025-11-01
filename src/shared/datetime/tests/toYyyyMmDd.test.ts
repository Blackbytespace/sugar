// @ts-nocheck
import toYyyyMmDd from '../toYyyyMmDd.js';

describe('shared.datetime.toYyyyMmDd', () => {
  test('Convert simple ISO date to YYYY-MM-DD', () => {
    const diff = toYyyyMmDd('2025-10-15T14:30:00+02:00');
    expect(diff).toBeDefined();
    expect(diff).toBe('2025-10-15');
  });
  test('Convert YYYY-MM-DD date to YYYY-MM-DD', () => {
    const diff = toYyyyMmDd('2025-10-16');
    expect(diff).toBeDefined();
    expect(diff).toBe('2025-10-15');
  });
});
