import { expect, test } from 'vitest';
import isCyclic from './isCyclic';
test('isCyclic', () => {
  const a = {};
  a.self = a;
  expect(isCyclic(a)).toBe(true);
  expect(isCyclic({})).toBe(false);
});
