/**
 * @name                    remToPx
 * @namespace               js.convert
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      tests
 *
 * @snippet         remToPx($1)
 *
 * @example         js
 * import { remToPx } from '@blackbyte/sugar/convert';
 * remToPx(2);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function remToPx(rem: number): number {
  return (
    rem *
    parseFloat(getComputedStyle(document.documentElement).fontSize || '16px')
  );
}
