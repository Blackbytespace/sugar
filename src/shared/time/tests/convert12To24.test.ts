import convert12To24 from '../convert12To24.js';

describe('shared.time.convert12To24', () => {
  test('Passing a number', () => {
    expect(() => convert12To24(12)).toThrowError();
  });
  test('Passing a string like "11pm"', () => {
    const res = convert12To24('11:30pm');
    expect(res).toBe('23:30');
  });
  test('Passing a string like "4pm"', () => {
    const res = convert12To24('4pm');
    expect(res).toBe('16:00');
  });
  test('Passing a string like "2am"', () => {
    const res = convert12To24('2am');
    expect(res).toBe('02:00');
  });
});
