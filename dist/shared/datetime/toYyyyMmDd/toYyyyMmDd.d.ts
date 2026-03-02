/**
 * @name                                toYyyyMmDd
 * @namespace                           shared.datetime
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * This function allows you to pass any date string or Date instance and get back this
 * one formatted as `YYYY-MM-DD`.
 * This format is useful when you need to store dates in a database, set a date input value, etc...
 * Under the hood, it make uses of the wonderful [Luxon](https://moment.github.io/luxon) library.
 *
 * @param           {String}                            date                    The date (string) to convert to `YYYY-MM-DD`
 * @param           {TtoYyyyMmDdSettings}               [settings={}]           Some settings to configure your parsing
 * @return          {String}                                                    The date formatted as `YYYY-MM-DD`
 *
 * @setting         {String}        [format='']                                 If you know the format of your date string, you can pass it here. This will make the parsing faster and more reliable. See [Luxon documentation](https://moment.github.io/luxon/#/parsing?id=table-of-tokens) for the list of supported tokens.
 *
 * @snippet         toYyyyMmDd($1, $2, $3)
 *
 * @example           js
 * import { toYyyyMmDd } from '@blackbyte/sugar/datetime';
 * toYyyyMmDd('2025-10-15T14:30:00+02:00'); // '2025-10-15'
 *
 * @see             https://moment.github.io/luxon
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TtoYyyyMmDdSettings = {
    format: string;
    separator: string;
};
export default function toYyyyMmDd(date: string | Date, settings?: Partial<TtoYyyyMmDdSettings>): string | null;
