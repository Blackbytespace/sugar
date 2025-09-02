/**
 * @name            deepize
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
 * @snippet         deepize($1)
 *
 * @example       js
 * import { deepize } from '@blackbyte/sugar/object';
 * deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function deepize(object: any): any;
