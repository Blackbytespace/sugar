import { expect, test } from 'vitest';
import isCreditCard from './isCreditCard';
test('isCreditCard', () => {
  expect(isCreditCard('4111111111111111')).toBe(true);
  expect(isCreditCard('invalid')).toBe(false);
});
