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
export default function isYyyymmddDate(date) {
    return /^\d{4}[\-\/\s\.]?((((0[13578])|(1[02]))[\-\/\s\.]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s\.]?(([0-2][0-9])|(30)))|(02[\-\/\s\.]?[0-2][0-9]))$/.test(date);
}
//# sourceMappingURL=isYyyymmddDate.js.map