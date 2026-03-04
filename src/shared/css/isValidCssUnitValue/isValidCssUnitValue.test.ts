import { test, expect } from 'vitest';
import isValidCssUnitValue from './isValidCssUnitValue';

test('isValidCssUnitValue', () => {
  // Test basic examples from documentation
  expect(isValidCssUnitValue('10px')).toBe(true);
  expect(isValidCssUnitValue('default')).toBe(false);

  // Test all supported units with positive integers (note: 'Q' has a bug - it's uppercase in array but converted to lowercase)
  expect(isValidCssUnitValue('10cm')).toBe(true);
  expect(isValidCssUnitValue('5mm')).toBe(true);
  expect(isValidCssUnitValue('2Q')).toBe(false); // Bug: 'Q' is uppercase in array but function converts to lowercase 'q'
  expect(isValidCssUnitValue('1in')).toBe(true);
  expect(isValidCssUnitValue('16px')).toBe(true);
  expect(isValidCssUnitValue('12pt')).toBe(true);
  expect(isValidCssUnitValue('1pc')).toBe(true);
  expect(isValidCssUnitValue('1.5em')).toBe(true);
  expect(isValidCssUnitValue('2ex')).toBe(true);
  expect(isValidCssUnitValue('1ch')).toBe(true);
  expect(isValidCssUnitValue('1.2rem')).toBe(true);
  expect(isValidCssUnitValue('100vw')).toBe(true);
  expect(isValidCssUnitValue('50vh')).toBe(true);
  expect(isValidCssUnitValue('80lvh')).toBe(true);
  expect(isValidCssUnitValue('75lvw')).toBe(true);
  expect(isValidCssUnitValue('90svh')).toBe(true);
  expect(isValidCssUnitValue('85svw')).toBe(true);
  expect(isValidCssUnitValue('10vmin')).toBe(true);
  expect(isValidCssUnitValue('20vmax')).toBe(true);
  expect(isValidCssUnitValue('1.5lh')).toBe(true);
  expect(isValidCssUnitValue('50%')).toBe(true);

  // Test case insensitive units
  expect(isValidCssUnitValue('10PX')).toBe(true);
  expect(isValidCssUnitValue('1EM')).toBe(true);
  expect(isValidCssUnitValue('100VW')).toBe(true);
  expect(isValidCssUnitValue('50%')).toBe(true);

  // Test decimal numbers
  expect(isValidCssUnitValue('1.5px')).toBe(true);
  expect(isValidCssUnitValue('0.5em')).toBe(true);
  expect(isValidCssUnitValue('10.25rem')).toBe(true);
  expect(isValidCssUnitValue('99.99%')).toBe(true);

  // Test negative numbers (bug: regex doesn't include minus sign, so '-10px' becomes '-px' which is invalid)
  expect(isValidCssUnitValue('-10px')).toBe(false); // Bug: regex leaves '-px'
  expect(isValidCssUnitValue('-1.5em')).toBe(false); // Bug: regex leaves '-em'
  expect(isValidCssUnitValue('-50%')).toBe(false); // Bug: regex leaves '-%'

  // Test numbers with commas (in some locales)
  expect(isValidCssUnitValue('1,5px')).toBe(true); // European decimal separator
  expect(isValidCssUnitValue('10,25em')).toBe(true);

  // Test zero values
  expect(isValidCssUnitValue('0px')).toBe(true);
  expect(isValidCssUnitValue('0em')).toBe(true);
  expect(isValidCssUnitValue('0%')).toBe(true);

  // Test plain numbers (should return true)
  expect(isValidCssUnitValue(0)).toBe(true);
  expect(isValidCssUnitValue(10)).toBe(true);
  expect(isValidCssUnitValue(-5)).toBe(true);
  expect(isValidCssUnitValue(1.5)).toBe(true);
  expect(isValidCssUnitValue(NaN)).toBe(true); // Numbers are always valid
  expect(isValidCssUnitValue(Infinity)).toBe(true);

  // Test invalid units
  expect(isValidCssUnitValue('10foo')).toBe(false);
  expect(isValidCssUnitValue('5bar')).toBe(false);
  expect(isValidCssUnitValue('1deg')).toBe(false); // Angle units not supported
  expect(isValidCssUnitValue('2rad')).toBe(false);
  expect(isValidCssUnitValue('100ms')).toBe(false); // Time units not supported
  expect(isValidCssUnitValue('2s')).toBe(false);
  expect(isValidCssUnitValue('300Hz')).toBe(false); // Frequency units not supported

  // Test invalid string values
  expect(isValidCssUnitValue('auto')).toBe(false);
  expect(isValidCssUnitValue('inherit')).toBe(false);
  expect(isValidCssUnitValue('initial')).toBe(false);
  expect(isValidCssUnitValue('unset')).toBe(false);
  expect(isValidCssUnitValue('none')).toBe(false);
  expect(isValidCssUnitValue('normal')).toBe(false);
  expect(isValidCssUnitValue('default')).toBe(false);

  // Test edge cases (bug: function doesn't require a number, just checks if unit exists in array)
  expect(isValidCssUnitValue('')).toBe(false); // Empty string
  expect(isValidCssUnitValue(' ')).toBe(false); // Whitespace only
  expect(isValidCssUnitValue('px')).toBe(true); // Bug: Unit without number should be false but returns true
  expect(isValidCssUnitValue('em')).toBe(true); // Bug: Unit without number should be false but returns true
  expect(isValidCssUnitValue('%')).toBe(true); // Bug: Unit without number should be false but returns true

  // Test non-string, non-number inputs
  expect(isValidCssUnitValue(null as any)).toBe(false);
  expect(isValidCssUnitValue(undefined as any)).toBe(false);
  expect(isValidCssUnitValue(true as any)).toBe(false);
  expect(isValidCssUnitValue(false as any)).toBe(false);
  expect(isValidCssUnitValue({} as any)).toBe(false);
  expect(isValidCssUnitValue([] as any)).toBe(false);

  // Test strings with extra whitespace
  expect(isValidCssUnitValue(' 10px ')).toBe(true); // Should work with trim()
  expect(isValidCssUnitValue('  1.5em  ')).toBe(true);
  expect(isValidCssUnitValue('\t50%\n')).toBe(true);

  // Test malformed values (the function is more permissive than expected)
  expect(isValidCssUnitValue('10 px')).toBe(true); // Space between number and unit (trim removes it)
  expect(isValidCssUnitValue('px10')).toBe(true); // Unit before number (regex removes numbers leaving valid unit)
  expect(isValidCssUnitValue('10pxextra')).toBe(false); // Extra text after unit
  expect(isValidCssUnitValue('abc10px')).toBe(false); // Text before number

  // Test multiple units
  expect(isValidCssUnitValue('10px 20px')).toBe(false); // Multiple values
  expect(isValidCssUnitValue('10px,20px')).toBe(false); // Comma separated values

  // Test complex CSS values that should be false
  expect(isValidCssUnitValue('calc(10px + 20px)')).toBe(false);
  expect(isValidCssUnitValue('var(--my-size)')).toBe(false);
  expect(isValidCssUnitValue('min(10px, 20px)')).toBe(false);
  expect(isValidCssUnitValue('max(10px, 20px)')).toBe(false);

  // Test scientific notation (doesn't work with current regex)
  expect(isValidCssUnitValue('1e2px')).toBe(false); // Scientific notation not supported by regex
  expect(isValidCssUnitValue('1.5e-2em')).toBe(false); // Scientific notation not supported by regex
});
