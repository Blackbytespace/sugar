/**
 * @name                                parseDate
 * @namespace                           shared.datetime
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * This function allows you to parse a date string. It will returns the `Date` instance for this date.
 * Under the hood, it make uses of the wonderful [Luxon](https://moment.github.io/luxon) library.
 * Make sure to use the library if you need more control over your dates.
 * Luxon support these date formats:
 *
 * - ISO 8601
 * - RFC2822
 * - HTTP (header)
 *
 * @param           {String}                    date                    The date string to parse
 * @param           {TParseDateSettings}        [settings={}]           Some settings to configure your parsing
 * @return          {Date}                                              The `Date` instance representing your date string
 *
 * @setting         {String}        [format='']                         If you know the format of your date string, you can pass it here. This will make the parsing faster and more reliable. See [Luxon documentation](https://moment.github.io/luxon/#/parsing?id=table-of-tokens) for the list of supported tokens.
 *
 * @snippet         parseDate($1, $2)
 *
 * @example           js
 * import { parseDate } from '@blackbyte/sugar/datetime';
 * parseDate('2025-10-12');
 * parseDate('2024-10-15T10:30:00Z');
 *
 * @see             https://moment.github.io/luxon
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TParseDateSettings = {
    format: string;
};
export default function parseDate(date: string | Date, settings?: Partial<TParseDateSettings>): Date | null;
