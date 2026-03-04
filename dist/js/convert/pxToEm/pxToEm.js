/**
 * @name                    pxToEm
 * @namespace               js.convert
 * @type                    Function
 * @platform                js
 * @status                  stable
 *
 * Convert a px value to an em one
 *
 * @param         {Number}          px                                      The px value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                                                  The pixel value
 *
 * @todo      tests
 *
 * @snippet         pxToEm($1)
 *
 * @example         js
 * import { pxToEm } from '@blackbyte/sugar/convert';
 * pxToEm(36);
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function pxToEm(px, $elm = document.documentElement) {
    return px / parseFloat(getComputedStyle($elm).fontSize || '16px');
}
//# sourceMappingURL=pxToEm.js.map