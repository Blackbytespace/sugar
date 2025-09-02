/**
 * @name                    emToPx
 * @namespace               js.convert
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @todo      tests
 *
 * @snippet         emToPx($1)
 *
 * @example         js
 * import { emToPx } from '@blackbyte/sugar/convert';
 * emToPx(2);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function emToPx(em: number, $elm?: HTMLElement): number;
