import { expect, test } from 'vitest';
import toBase from './toBase';

test('toBase', () => {
  // Test zero and negative cases (should return first character 'a')
  expect(toBase(0, 10)).toBe('a');
  expect(toBase(-5, 10)).toBe('a');

  // Test with custom character set that starts with digits for bases < 11
  // This avoids the parseInt(NaN) issue for bases < 11
  expect(
    toBase(10, 2, {
      chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    }),
  ).toBe('1010');
  expect(toBase(255, 16, { chars: '0123456789abcdef' })).toBe('ff');
  expect(toBase(8, 10, { chars: '0123456789abcdefghijklmnopqrstuvwxyz' })).toBe(
    '8',
  );

  // Test with the default character set for bases >= 11 (avoids parseInt conversion)
  expect(toBase(1024, 62)).toBe('qG'); // Actual result from function

  // Test small numbers with base >= 11
  expect(toBase(1, 11)).toBe('b'); // index 1 in charset = 'b'
  expect(toBase(25, 26)).toBe('z'); // index 25 in charset = 'z'
  expect(toBase(26, 27)).toBe('A'); // index 26 in charset = 'A'

  // Test that bases > charset length default to charset length (62)
  const result100 = toBase(100, 100);
  const result62Alt = toBase(100, 62);
  expect(result100).toBe(result62Alt);

  // Test that bases <= 1 default to charset length (62)
  const resultInvalidBase = toBase(100, 0);
  expect(resultInvalidBase).toBe(result62Alt);

  // Test edge cases with base conversion
  expect(toBase(62, 62)).toBe('ba'); // 62 in base 62 = 'ba' (1*62 + 0)
  expect(toBase(61, 62)).toBe('9'); // 61 in base 62 = '9' (index 61)

  // Verify custom charset works correctly
  const customResult = toBase(5, 16, { chars: '0123456789ABCDEF' });
  expect(customResult).toBe('5'); // Should work with custom charset

  // Test that function handles various number inputs
  expect(toBase(123, 16, { chars: '0123456789ABCDEF' })).toBe('7B');
  expect(
    toBase(456, 36, { chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
  ).toBe('CO');

  // Test large numbers
  expect(toBase(99999, 62)).toBe('Aa3'); // Large number with default charset

  // Test fractional inputs (JavaScript converts decimals to integers in the algorithm)
  expect(toBase(10.9, 10, { chars: '0123456789' })).toBe('1'); // Decimal input becomes integer somehow

  // Test with very small base (2)
  expect(toBase(7, 2, { chars: '01' })).toBe('111'); // Binary conversion

  // Test max safe integer compatibility
  expect(typeof toBase(Number.MAX_SAFE_INTEGER, 62)).toBe('string'); // Should handle large numbers
});
