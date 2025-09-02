import camelize from '../../string/camelize.js';
import parse from '../../string/parse.js';
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
export default function styleStringToObject(style) {
    if (!style || style === '')
        return {};
    const obj = {};
    const split = style.replace(/\s/g, '').split(';');
    split.forEach((statement) => {
        // split statement by key value pairs
        const spl = statement.split(':'), key = camelize(spl[0]), value = spl[1];
        // add element into object
        obj[key] = parse(value);
    });
    // return the style object
    return obj;
}
//# sourceMappingURL=styleStringToObject.js.map