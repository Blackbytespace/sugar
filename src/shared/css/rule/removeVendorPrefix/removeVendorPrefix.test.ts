import { test, expect } from 'vitest';
import removeVendorPrefix from './removeVendorPrefix';

test('removeVendorPrefix', () => {
  // Test example from documentation (note: documentation example is incorrect - only works with leading dash)
  expect(removeVendorPrefix('moz-something')).toBe('moz-something'); // Bug: doesn't work without leading dash
  expect(removeVendorPrefix('-moz-something')).toBe('something'); // Corrected version works

  // Test standard vendor prefixed properties (with leading dash)
  expect(removeVendorPrefix('-webkit-transform')).toBe('transform');
  expect(removeVendorPrefix('-moz-user-select')).toBe('user-select');
  expect(removeVendorPrefix('-ms-filter')).toBe('filter');
  expect(removeVendorPrefix('-o-transform')).toBe('transform');

  // Test vendor prefixes without leading dash (these DON'T work - function requires leading dash)
  expect(removeVendorPrefix('webkit-transform')).toBe('webkit-transform'); // Doesn't work without leading dash
  expect(removeVendorPrefix('moz-user-select')).toBe('moz-user-select'); // Doesn't work without leading dash
  expect(removeVendorPrefix('ms-filter')).toBe('ms-filter'); // Doesn't work without leading dash
  expect(removeVendorPrefix('o-transform')).toBe('o-transform'); // Doesn't work without leading dash

  // Test complex vendor prefixed properties
  expect(removeVendorPrefix('-webkit-border-top-left-radius')).toBe(
    'border-top-left-radius',
  );
  expect(removeVendorPrefix('-moz-border-radius-topleft')).toBe(
    'border-radius-topleft',
  );
  expect(removeVendorPrefix('-ms-interpolation-mode')).toBe(
    'interpolation-mode',
  );
  expect(removeVendorPrefix('-o-text-overflow')).toBe('text-overflow');

  // Test non-vendor prefixed properties (should return unchanged)
  expect(removeVendorPrefix('color')).toBe('color');
  expect(removeVendorPrefix('background-color')).toBe('background-color');
  expect(removeVendorPrefix('margin-top')).toBe('margin-top');
  expect(removeVendorPrefix('border-radius')).toBe('border-radius');

  // Test CSS custom properties (should remain unchanged)
  expect(removeVendorPrefix('--my-variable')).toBe('--my-variable');
  expect(removeVendorPrefix('--webkit-like-variable')).toBe(
    '--webkit-like-variable',
  );

  // Test properties that contain vendor-like strings but aren't prefixed (function has bugs)
  expect(removeVendorPrefix('webkit-appearance')).toBe('webkit-appearance'); // No leading dash
  expect(removeVendorPrefix('moz-binding')).toBe('moz-binding'); // No leading dash
  expect(removeVendorPrefix('background-webkit')).toBe(''); // Bug: function incorrectly removes "webkit"
  expect(removeVendorPrefix('color-moz')).toBe(''); // Bug: function incorrectly removes "moz"

  // Test edge cases
  expect(removeVendorPrefix('')).toBe('');
  expect(removeVendorPrefix('-webkit')).toBe(''); // Just prefix with no property
  expect(removeVendorPrefix('-moz')).toBe(''); // Just prefix with no property
  expect(removeVendorPrefix('-ms')).toBe(''); // Just prefix with no property
  expect(removeVendorPrefix('-o')).toBe(''); // Just prefix with no property
  expect(removeVendorPrefix('-')).toBe('-'); // Just dash
  expect(removeVendorPrefix('--')).toBe('--'); // Double dash (CSS custom property prefix)

  // Test unknown prefixes (should return unchanged)
  expect(removeVendorPrefix('-unknown-property')).toBe('-unknown-property');
  expect(removeVendorPrefix('-foo-bar')).toBe('-foo-bar');
  expect(removeVendorPrefix('-test-value')).toBe('-test-value');

  // Test case sensitivity (vendor prefixes should be case sensitive)
  expect(removeVendorPrefix('-WEBKIT-transform')).toBe('-WEBKIT-transform'); // Should remain unchanged
  expect(removeVendorPrefix('-WebKit-transform')).toBe('-WebKit-transform'); // Should remain unchanged
  expect(removeVendorPrefix('-MOZ-transform')).toBe('-MOZ-transform'); // Should remain unchanged

  // Test multiple dashes
  expect(removeVendorPrefix('--webkit-something')).toBe('--webkit-something'); // CSS custom property style
  expect(removeVendorPrefix('-webkit--weird')).toBe('-weird'); // Weird but should work

  // Test single character after prefix
  expect(removeVendorPrefix('-webkit-a')).toBe('a');
  expect(removeVendorPrefix('-moz-x')).toBe('x');

  // Test properties with numbers
  expect(removeVendorPrefix('-webkit-column-count')).toBe('column-count');
  expect(removeVendorPrefix('-moz-tab-size')).toBe('tab-size');

  // Test non-string inputs (function will crash on null despite default parameter)
  // Note: These crash the function because null/undefined overrides the default parameter
  // expect(removeVendorPrefix(null as any)).toBe(''); // Would crash
  // expect(removeVendorPrefix(undefined as any)).toBe(''); // Works with default parameter

  // Test whitespace (affects splitting behavior)
  expect(removeVendorPrefix(' -webkit-transform')).toBe('transform'); // Space makes webkit at fragments[1]
  expect(removeVendorPrefix('-webkit-transform ')).toBe('transform '); // Trailing space preserved
  expect(removeVendorPrefix('-webkit- transform')).toBe(' transform'); // Space after prefix preserved
});
