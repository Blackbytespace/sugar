/**
 * @name            styleString2Object
 * @namespace       js.css.transform
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Transform a style string to an object representation
 *
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @todo      tests
 *
 * @snippet         styleStringToObject($1)
 *
 * @example 	js
 * import { styleStringToObject } from '@blackbyte/sugar/css'
 * const styleString =  styleStringToObject('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function styleStringToObject(style: string): any;
