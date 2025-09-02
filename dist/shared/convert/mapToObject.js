/**
 * @name              mapToObject
 * @namespace         shared.convert
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            stable
 *
 * This function simply take a Map object and convert it to a plain object
 *
 * @param       {Map}         map       The map object to convert into object
 * @return      {Object}                The plain object
 *
 * @snippet         mapToObject($1)
 *
 * @example       js
 * import { mapToObject } from '@blackbyte/sugar/convert';
 * const myMap = new Map();
 * myMap.set('hello', 'world');
 * mapToObject(myMap);
 * // {
 * //   hello: 'world'
 * // }
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function mapToObject(map) {
    const obj = {};
    for (const [k, v] of map)
        obj[k] = v;
    return obj;
}
//# sourceMappingURL=mapToObject.js.map