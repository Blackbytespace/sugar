import __aggregation from 'aggregation/es5.js';
/**
 * @name                multipleExtends
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              alpha
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @todo      tests
 *
 * @snippet         multipleExtends($1, $2)
 *
 * @example         js
 * import { multipleExtends } from '@blackbyte/sugar/class';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function (...classes) {
    return __aggregation(...classes);
}
//# sourceMappingURL=multipleExtends.js.map