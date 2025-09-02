import uncamelize from '../../../shared/string/uncamelize.js';

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
export default function styleObjectToString(styleObj: any): string {
  // process the style object
  const propertiesArray: string[] = [];
  for (const key in styleObj) {
    const value = styleObj[key];
    // if the value is ''
    // mean that we need to get rid of
    if (value === undefined || value === '') {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${uncamelize(key)}:${value};`);
    }
  }
  // return the css text
  return propertiesArray.join(' ');
}
