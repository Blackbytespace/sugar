import { expect, test } from 'vitest';
import isDdmmyyyyDate from './isDdmmyyyyDate';

test('isDdmmyyyyDate', () => {
  expect(isDdmmyyyyDate('31/12/2023')).toBe(true);
  expect(isDdmmyyyyDate('2023-12-31')).toBe(false);
});
