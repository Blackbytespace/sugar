// @ts-nocheck
import diffBetweenDates from '../diffBetweenDates/diffBetweenDates.js';

describe('shared.datetime.diffBetweenDates', () => {
  test('Check for a small diff', () => {
    const diff = diffBetweenDates('2025-10-12', '2025-10-15');
    expect(diff).toBeDefined();
    expect(diff?.days).toBe(3);
  });

  test('Check for a large diff', () => {
    const diff = diffBetweenDates('1945-10-12', '2025-10-15');
    expect(diff).toBeDefined();
    expect(diff?.days).toBe(3);
  });
});
