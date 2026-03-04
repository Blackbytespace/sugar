import { test, expect } from 'vitest'
import isCjs from './isCjs'

test('isCjs', () => {
  expect(typeof isCjs()).toBe('boolean')
})