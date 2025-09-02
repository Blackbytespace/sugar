import convert24To12 from '../convert24To12.js';

describe('shared.time.convert24To12', () => {
  test('Passing a number', () => {
    expect(() => convert24To12(12)).toThrowError();
  });
  test('Passing a malformed string', () => {
    expect(() => convert24To12('12:00:00')).toThrowError();
  });
  test('Passing a valid 23:00 time', () => {
    expect(convert24To12('23:00')).toBe('11pm');
  });
  test('Passing a valid 06:34 time', () => {
    expect(convert24To12('06:34')).toBe('6:34am');
  });
  test('Passing a valid 23:00 time and keep zero leading', () => {
    expect(
      convert24To12('05:00', {
        keepLeadingZero: true,
      }),
    ).toBe('05am');
  });
  test('Passing a valid 06:34 time and keep zero minutes', () => {
    expect(
      convert24To12('06:00', {
        keepZeroMinute: true,
      }),
    ).toBe('6:00am');
  });
  test('Passing a valid 06:34 time and keep zero minutes AND leading zero', () => {
    expect(
      convert24To12('06:00', {
        keepZeroMinute: true,
        keepLeadingZero: true,
      }),
    ).toBe('06:00am');
  });
});
