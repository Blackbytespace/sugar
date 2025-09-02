/**
 * @name                isDdmmyyyyDate
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if is a valid dd.mm.yyyy date
 * This will match : dd.mm.yyyy | dd/mm/yyyy | dd-mm-yyyy | dd mm yyyy
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @todo      tests
 *
 * @snippet         isDdmmyyyyDate($1)
 *
 * @example    js
 * import { isDdmmyyyyDate } from '@blackbyte/sugar/is'
 * if (isDdmmyyyyDate('20.12.2018')) {
 *     // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isDdmmyyyyDate(date: string): boolean;
