import { expect, test } from 'vitest';
import isTestEnv from './isTestEnv';

test('isTestEnv', () => {
  expect(isTestEnv()).toBe(true);
});
