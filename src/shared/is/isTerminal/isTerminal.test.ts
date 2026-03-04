import { expect, test } from 'vitest';
import isTerminal from './isTerminal';

test('isTerminal', () => {
  expect(typeof isTerminal()).toBe('boolean');
});
