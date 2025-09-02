import unique from './unique.js';
/**
 * @name                keysLast
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Make sure the passed array ends with the passed keys
 *
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @snippet         keysLast($1, $2)
 *
 * @example    js
 * import { keysLast } from '@blackbyte/sugar/array'
 * keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function keysLast(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    let res = [].concat(array).concat(keys);
    // reverse the array
    res = res.reverse();
    // remove double items
    res = unique(res);
    // reverse back the array
    res = res.reverse();
    // return the result
    return res;
}
//# sourceMappingURL=keysLast.js.map