import { test, expect, vi } from 'vitest';
import speedIndex from './speedIndex';

// Mock the loopsCount function for predictable testing
vi.mock('../loopsCount/loopsCount.js', () => ({
  default: vi.fn(),
}));

import loopsCount from '../loopsCount/loopsCount.js';

test('speedIndex', () => {
  const mockLoopsCount = loopsCount as any;

  // Test with default parameters (slow=100000, fast=1500000)
  mockLoopsCount.mockReturnValue(800000); // Mock a mid-range performance
  const defaultResult = speedIndex();

  expect(typeof defaultResult).toBe('number');
  expect(Number.isInteger(defaultResult)).toBe(true); // Should be rounded

  // Calculate expected result: (100 / (1500000 - 100000)) * 800000
  // = (100 / 1400000) * 800000 = 57.14... -> rounds to 57
  expect(defaultResult).toBe(57);

  // Test with slow computer performance
  mockLoopsCount.mockReturnValue(100000); // At the "slow" threshold
  const slowResult = speedIndex();

  // Expected: (100 / 1400000) * 100000 = 7.14... -> rounds to 7
  expect(slowResult).toBe(7);
  expect(slowResult).toBeLessThan(defaultResult);

  // Test with fast computer performance
  mockLoopsCount.mockReturnValue(1500000); // At the "fast" threshold
  const fastResult = speedIndex();

  // Expected: (100 / 1400000) * 1500000 = 107.14... -> rounds to 107
  expect(fastResult).toBe(107);
  expect(fastResult).toBeGreaterThan(defaultResult);

  // Test with very slow computer (below slow threshold)
  mockLoopsCount.mockReturnValue(50000);
  const verySlowResult = speedIndex();

  // Expected: (100 / 1400000) * 50000 = 3.57... -> rounds to 4
  expect(verySlowResult).toBe(4);
  expect(verySlowResult).toBeGreaterThanOrEqual(0);

  // Test with very fast computer (above fast threshold)
  mockLoopsCount.mockReturnValue(2000000);
  const veryFastResult = speedIndex();

  // Expected: (100 / 1400000) * 2000000 = 142.85... -> rounds to 143
  expect(veryFastResult).toBe(143);
  expect(veryFastResult).toBeGreaterThan(100);

  // Test with custom slow and fast parameters
  mockLoopsCount.mockReturnValue(500000);
  const customResult = speedIndex(200000, 1000000); // Custom range

  // Expected: (100 / (1000000 - 200000)) * 500000 = (100 / 800000) * 500000 = 62.5 -> rounds to 63
  expect(customResult).toBe(63);

  // Test with very narrow range
  mockLoopsCount.mockReturnValue(150000);
  const narrowRangeResult = speedIndex(100000, 200000); // Narrow range

  // Expected: (100 / (200000 - 100000)) * 150000 = (100 / 100000) * 150000 = 150
  expect(narrowRangeResult).toBe(150);

  // Test with identical slow and fast values (edge case)
  mockLoopsCount.mockReturnValue(100000);
  const identicalResult = speedIndex(100000, 100000);

  // Division by zero case: (100 / (100000 - 100000)) * 100000 = Infinity
  // Should handle gracefully
  expect(identicalResult).toBe(Infinity);

  // Test with inverted slow/fast values (fast < slow)
  mockLoopsCount.mockReturnValue(100000);
  const invertedResult = speedIndex(200000, 100000); // fast < slow

  // Expected: (100 / (100000 - 200000)) * 100000 = (100 / -100000) * 100000 = -100
  expect(invertedResult).toBe(-100);

  // Test zero performance
  mockLoopsCount.mockReturnValue(0);
  const zeroResult = speedIndex();

  expect(zeroResult).toBe(0);

  // Test rounding behavior with decimal results
  mockLoopsCount.mockReturnValue(850000);
  const roundingResult = speedIndex();

  // Expected: (100 / 1400000) * 850000 = 60.714... -> rounds to 61
  expect(roundingResult).toBe(61);

  // Test with floating point parameters
  mockLoopsCount.mockReturnValue(750000);
  const floatResult = speedIndex(100000.5, 1500000.7);

  expect(typeof floatResult).toBe('number');
  expect(Number.isInteger(floatResult)).toBe(true);

  // Verify loopsCount is called with correct timeframe (100ms)
  mockLoopsCount.mockClear();
  speedIndex();
  expect(mockLoopsCount).toHaveBeenCalledWith(100);
  expect(mockLoopsCount).toHaveBeenCalledTimes(1);

  // Test multiple calls should call loopsCount each time
  speedIndex();
  speedIndex();
  expect(mockLoopsCount).toHaveBeenCalledTimes(3);

  // Test with extreme values
  mockLoopsCount.mockReturnValue(10000000); // Very high performance
  const extremeResult = speedIndex();

  expect(typeof extremeResult).toBe('number');
  expect(extremeResult).toBeGreaterThan(500); // Should be very high index

  // Test with negative loops count (shouldn't normally happen, but test edge case)
  mockLoopsCount.mockReturnValue(-1000);
  const negativeLoopsResult = speedIndex();

  expect(typeof negativeLoopsResult).toBe('number');
  // Should handle negative input gracefully - very small negative numbers round to 0
  expect(negativeLoopsResult).toBeLessThanOrEqual(0);

  // Reset mock for any following tests
  mockLoopsCount.mockReset();
});
