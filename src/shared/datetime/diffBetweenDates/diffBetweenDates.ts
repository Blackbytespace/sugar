import { DateTime } from 'luxon';
import parseDate from './parseDate.js';

/**
 * @name                                diffBetweenDates
 * @namespace                           shared.datetime
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * This function allows you to get the difference between two date strings.
 * It will returns you an object with the difference represented with these properties (years, months, days, hours, minutes, seconds).
 * Under the hood, it make uses of the wonderful [Luxon](https://moment.github.io/luxon) library.
 *
 * @param           {String}                            date                    The date string to parse
 * @param           {TDiffBetweenDatesSettings}         [settings={}]           Some settings to configure your parsing
 * @return          {Date}                                                      The `Date` instance representing your date string
 *
 * @setting         {String}        [format='']                                 If you know the format of your date string, you can pass it here. This will make the parsing faster and more reliable. See [Luxon documentation](https://moment.github.io/luxon/#/parsing?id=table-of-tokens) for the list of supported tokens.
 *
 * @snippet         diffBetweenDates($1, $2, $3)
 *
 * @example           js
 * import { diffBetweenDates } from '@blackbyte/sugar/datetime';
 * diffBetweenDates('1945-10-12', '2025-10-15');
 *
 * @see             https://moment.github.io/luxon
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TDiffBetweenDatesSettings = {
  format: string;
};

export default function diffBetweenDates(
  date1: string | Date,
  date2: string | Date,
  settings?: Partial<TDiffBetweenDatesSettings>,
): {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
} | null {
  const finalSettings: TDiffBetweenDatesSettings = {
    format: '',
    ...(settings ?? {}),
  };

  // prse the passed date
  const jsDate1 = parseDate(date1, finalSettings);
  const jsDate2 = parseDate(date2, finalSettings);

  if (!jsDate1 || !jsDate2) {
    return null;
  }

  const luxonDate1 = DateTime.fromJSDate(jsDate1);
  const luxonDate2 = DateTime.fromJSDate(jsDate2);

  const diff = luxonDate2
    .diff(luxonDate1, [
      'years',
      'months',
      'days',
      'hours',
      'minutes',
      'seconds',
    ])
    .toObject();

  return diff;
}
