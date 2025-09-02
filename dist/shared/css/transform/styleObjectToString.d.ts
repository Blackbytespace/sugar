/**
 * @name            styleObject2String
 * @namespace       js.css.transform
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Transform a style object to inline string separated by ;
 *
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @todo      tests
 *
 * @snippet         styleObjectToString($1)
 *
 * @example 	js
 * import { styleObjectToString } from '@blackbyte/sugar/css'
 * const styleString =  styleObjectToString({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function styleObjectToString(styleObj: any): string;
