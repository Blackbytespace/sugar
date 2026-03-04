import { test, expect } from 'vitest';
import parseKeyframeKey from './parseKeyframeKey';

test('parseKeyframeKey', () => {
  // Test basic keywords
  expect(parseKeyframeKey('from')).toEqual([0]);
  expect(parseKeyframeKey('to')).toEqual([100]);

  // Test percentage values
  expect(parseKeyframeKey('0%')).toEqual([0]);
  expect(parseKeyframeKey('50%')).toEqual([50]);
  expect(parseKeyframeKey('100%')).toEqual([100]);

  // Test multiple values
  expect(parseKeyframeKey('0%, 50%, 100%')).toEqual([0, 50, 100]);
  expect(parseKeyframeKey('from, 25%, 50%, 75%, to')).toEqual([
    0, 25, 50, 75, 100,
  ]);

  // Test with whitespace
  expect(parseKeyframeKey(' from ')).toEqual([0]);
  expect(parseKeyframeKey('0% , 50% , 100%')).toEqual([0, 50, 100]);
  expect(parseKeyframeKey(' 25% , 50% ')).toEqual([25, 50]);

  // Test mixed keywords and percentages
  expect(parseKeyframeKey('from, 50%, to')).toEqual([0, 50, 100]);

  // Test edge cases
  expect(parseKeyframeKey('0')).toEqual([0]);
  expect(parseKeyframeKey('100')).toEqual([100]);

  // Test malformed input (function will still try to parse)
  expect(parseKeyframeKey('invalid')).toEqual([NaN]);
  expect(parseKeyframeKey('')).toEqual([NaN]);
});
