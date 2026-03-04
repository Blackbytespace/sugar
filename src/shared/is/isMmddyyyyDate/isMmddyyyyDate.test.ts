import { expect, test } from 'vitest';
import isMmddyyyyDate from './isMmddyyyyDate';

test('isMmddyyyyDate', () => {
  expect(isMmddyyyyDate('12/31/2023')).toBe(true);
  expect(isMmddyyyyDate('2023-12-31')).toBe(false);
});
