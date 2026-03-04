// @ts-nocheck
import parseDate from '../parseDate/parseDate.js';

describe('shared.datetime.parseDate', () => {
  test('Parse some standard ISO date strings', () => {
    const samples = [
      // Basic Date
      '2025-10-15',
      '20251015',

      // Date and Time (Local)
      '2025-10-15T14:30',
      '2025-10-15T14:30:59',
      '20251015T143059',

      // Date and Time with UTC
      '2025-10-15T14:30Z',
      '2025-10-15T14:30:59Z',
      '20251015T143059Z',

      // Date and Time with Time Zone Offset
      '2025-10-15T14:30:00+02:00',
      '2025-10-15T14:30:00-05:00',
      '20251015T143000+0200',

      // Week Dates
      '2025-W42',
      '2025-W42-3',
      '2025W423',

      // Ordinal Dates
      '2025-288',
      '2025288',

      // Extended Precision / Fractional Seconds
      '2025-10-15T14:30:00.123Z',
      '2025-10-15T14:30:00.123456+00:00',
    ];

    samples.forEach((sample) => {
      const date = parseDate(sample);
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date.getTime())).toBe(false); // Ensures it's a valid date
    });
  });

  test('Parse some standard RFC2822 date strings', () => {
    const rfc2822Samples: string[] = [
      // Basic RFC 2822
      'Wed, 15 Oct 2025 10:30:00 +0000',
      'Wed, 15 Oct 2025 10:30:00 GMT',
      'Wed, 15 Oct 2025 10:30:00 -0500',
      'Wed, 15 Oct 2025 10:30:00 +0200',
      'Wed, 15 Oct 2025 10:30:00 -0800',

      // Different Days and Months
      'Mon, 01 Jan 2024 00:00:00 +0000',
      'Fri, 29 Feb 2008 12:00:00 +0000', // Leap year
      'Sat, 31 Dec 2022 23:59:59 +0000',
      'Tue, 04 Jul 2023 08:15:30 -0400',
      'Sun, 25 Dec 2022 06:45:00 +0530',

      // Named Time Zones
      'Wed, 15 Oct 2025 10:30:00 PST',
      'Wed, 15 Oct 2025 10:30:00 EST',

      // Without Seconds
      'Wed, 15 Oct 2025 10:30 +0000',
      'Wed, 15 Oct 2025 10:30 GMT',
      'Wed, 15 Oct 2025 10:30 -0500',

      // Edge Cases
      'Thu, 29 Feb 2024 23:59:59 +1400', // max positive offset
      'Wed, 15 Oct 2025 00:00:00 -1200', // max negative offset
      'Wed, 15 Oct 2025 23:59:59 +0000',
      'Wed, 15 Oct 2025 23:59:59 +0130',
      'Wed, 15 Oct 2025 23:59:59 -0330', // half-hour offset
    ];

    rfc2822Samples.forEach((sample) => {
      const date = parseDate(sample);
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date.getTime())).toBe(false); // Ensures it's a valid date
    });
  });

  test('Parse some standard RFC2822 date strings', () => {
    const httpDateSamples: string[] = [
      // Current / future dates
      'Wed, 15 Oct 2025 10:30:00 GMT',
      'Tue, 14 Oct 2025 22:00:00 GMT',
      'Thu, 16 Oct 2025 00:00:00 GMT',
      'Fri, 31 Dec 2027 23:59:59 GMT',
      'Mon, 01 Jan 2024 00:00:00 GMT',

      // Classic / retro
      'Sun, 06 Nov 1994 08:49:37 GMT',
      'Sat, 01 Jan 2000 00:00:00 GMT',
      'Wed, 29 Feb 2012 12:00:00 GMT', // leap year
      'Fri, 13 Jun 1997 13:13:13 GMT',
      'Thu, 25 Dec 1986 18:30:00 GMT',

      // Edge cases
      'Thu, 29 Feb 2024 23:59:59 GMT',
      'Sun, 28 Feb 2100 12:00:00 GMT', // century year (not leap)
      'Sat, 01 Jan 2050 00:00:00 GMT',
      'Tue, 19 Jan 2038 03:14:07 GMT', // Unix 32-bit overflow date
    ];
    httpDateSamples.forEach((sample) => {
      const date = parseDate(sample);
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date.getTime())).toBe(false); // Ensures it's a valid date
    });
  });
});
