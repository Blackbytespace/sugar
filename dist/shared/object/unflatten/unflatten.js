import { inflate } from 'flattenjs';
/**
 * @name            unflatten
 * @namespace       shared.object
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function simply take an object like this one:
 *
 * ```js
 * {
 *    'something.cool': 'hello'
 * }
 * ```
 *
 * and convert it to something like this:
 *
 * ```js
 * {
 *    something: {
 *      cool: 'hello'
 *    }
 * }
 * ```
 *
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
 *
 * @todo      tests
 *
 * @snippet         unflatten($1)
 *
 * @example       js
 * import { unflatten } from '@blackbyte/sugar/object';
 * unflatten({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @see       https://www.npmjs.com/package/flat
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unflatten(object) {
    return inflate(object);
}
//# sourceMappingURL=unflatten.js.map