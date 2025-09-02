/**
 * @name                isYyyymmddDate
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if is a valid yyyy.mm.dd date
 * This will match : yyyy.mm.dd | yyyy/mm/dd | yyyy-mm-dd | yyyy mm dd
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @todo      tests
 *
 * @snippet         isYyyymmddDate($1)
 *
 * @example    js
 * import { isYyyymmddDate } from '@blackbyte/sugar/is'
 * if (isYyyymmddDate('2018.12.25')) {
 *     // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isYyyymmddDate(date: string): boolean;
