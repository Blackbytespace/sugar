/**
 * @name                timeAgo
 * @namespace           shared.datetime
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Simple "time" ago for your Unix timestamps and JavaScript Date objects.
 *
 * @param           {Number}             timestamp                 The timestamp to transform
 * @param           {'short'|'medium'|'long'}       [format='medium']       The format you want back
 * @return          {String}                                          The converted value
 *
 * @todo      tests
 *
 * @snippet         timeAgo($1)
 *
 * @example           js
 * import { timeAgo } from '@blackbyte/sugar/datetime';
 * timeAgo(1611344957); // => 7 secs ago
 *
 * @see         https://www.npmjs.com/package/js-ago
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function timeAgo(timestamp: number | Date, format?: 'short' | 'medium' | 'long'): string;
