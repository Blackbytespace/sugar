import unique from './unique.js';
/**
 * @name            keysFirst
 * @namespace       shared.array
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @snippet         keysFirst($1, $2)
 *
 * @example    js
 * import { keysFirst } from '@blackbyte/sugar/array'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function keysFirst(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    const empty = [];
    let res = empty.concat(keys).concat(array);
    // remove double items
    res = unique(res);
    // return the result
    return res;
}
//# sourceMappingURL=keysFirst.js.map