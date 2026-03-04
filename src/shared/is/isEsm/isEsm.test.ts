import { expect, test } from 'vitest';
import isEsm from './isEsm';

test('isEsm', () => {
  expect(typeof isEsm()).toBe('boolean');
});
