/**
 * @name                        parseRgba
 * @namespace                   shared.color
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @todo      tests
 *
 * @snippet         parseRgba($1)
 *
 * @example           js
 * import { parseRgba } from '@blackbyte/sugar/color';
 * parseRgba('rgba(20,10,100,20)');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TParseRgbaResult = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export default function parseRgba(rgbaString: string): TParseRgbaResult;
