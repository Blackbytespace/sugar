/**
 * @name                getKeyByValue
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Return the key that correspond to the passed value in the passed object
 *
 * @param         {Object}        object        The object in which to search for the value
 * @param         {Mixed}         value         The value to find in the object
 * @return        {String}                      The key of the wanted value or false if not found
 *
 * @todo      tests
 *
 * @snippet         getKeyByValue($1, $2)
 *
 * @example       js
 * import { getKeyByValue } from '@blackbyte/sugar/object';
 * getKeyByValue({ hello: 'world' }, 'world'); // => hello
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getKeyByValue(object: any, value: any): any {
  return Object.keys(object).find((key) => object[key] === value);
}
