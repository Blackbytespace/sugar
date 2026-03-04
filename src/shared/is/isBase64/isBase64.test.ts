import { test, expect } from 'vitest'
import isBase64 from './isBase64'

test('isBase64', () => {
  expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true)
  expect(isBase64('aGVsbG8=')).toBe(true)
  expect(isBase64('hello')).toBe(false)
  expect(isBase64('')).toBe(false)
  expect(isBase64(123)).toBe(false)
})