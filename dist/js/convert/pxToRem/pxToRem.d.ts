/**
 * @name                    pxToRem
 * @namespace               js.convert
 * @type                    Function
 * @platform                js
 * @status                  stable
 *
 * Convert a px value to a rem one
 *
 * @param         {Number}          px            The px value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      tests
 *
 * @snippet         pxToRem($1)
 *
 * @example         js
 * import { pxToRem } from '@blackbyte/sugar/convert';
 * pxToRem(36);
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function pxToRem(px: number): number;
