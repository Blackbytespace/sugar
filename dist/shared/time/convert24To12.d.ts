/**
 * @name                 convert24To12
 * @namespace            shared.time
 * @type                 Function
 * @platform             js
 * @platform             node
 * @status               stable
 *
 * Convert a 24 hours time to a 12 hours time format
 *
 * @param       {String}                    time              The 24 hours time like "23:00"
 * @return    {String}                                      The 12 hours time like "11:00pm"
 *
 * @todo      tests
 *
 * @snippet         convert24To12($1)
 *
 * @example    js
 * import { convert24To12 } from '@blackbyte/sugar/time'
 * convert24To12('23:12') // => '11:12pm'
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TConvert24To12Settings = {
    keepLeadingZero?: boolean;
    keepZeroMinute?: boolean;
};
export default function convert24To12(time: string, settings?: TConvert24To12Settings): string;
