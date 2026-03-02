/**
 * @name                    toJson
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Convert class instances to plain JSON object
 *
 * @param       {Any}           object      The object to convert
 * @return      {Any}                       The converted object
 *
 * @snippet         toJson($1)
 *
 * @example         js
 * import { toJson } from '@blackbyte/sugar/object';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function toJson(object: any): any;
