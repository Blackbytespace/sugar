/**
 * @name                parseHsla
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslaString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @todo      tests
 *
 * @snippet         parseHsla($1)
 *
 * @example         js
 * import { parseHsla } from '@blackbyte/sugar/color';
 * parseHsla('hsl(20,20,20)');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TParseHslaResult = {
    h: number;
    s: number;
    l: number;
    a: number;
};
export default function parseHsla(hslaString: string): TParseHslaResult;
