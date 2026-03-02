import sameItems from './sameItems.js';
/**
 * @name            intersection
 * @namespace       shared.array
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function take two arrays and return all the items that are the same.
 * You can specify if you want only comparing by reference for object, etc... or if
 * you want to transform items in hashes and compare that instead.
 *
 * @param       {Array}         ...arrays           The arrays you want to compare
 * @param       {Object}        [settings={}]           Some settings to refine your comparaison process
 * @return      {Array}                              An array containing all the items that are present in all the passed arrays
 *
 * @setting         {Boolean}          [references=true]        Specify if you want to use the references comparaison or not
 * @setting         {Boolean}           [hash=true]             Specify if you want to allows transforming object etc in to hashes and compare this instead
 *
 * @snippet         intersection($1, $2)
 *
 * @example         js
 * import { intersection } from '@blackbyte/sugar/array';
 * intersection([1,2,3,4], [1,3,5]); // => [1,3]
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default sameItems;
//# sourceMappingURL=intersection.js.map