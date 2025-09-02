/**
 * @name                unique
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply take an array as parameter and return a new one
 * with all the duplicates values removed.
 *
 * @param         {Array}         array               The array to deduplicates
 * @return        {Array}                             The deduplicated array
 *
 * @snippet         unique($1)
 *
 * @example         js
 * import { unique } from '@blackbyte/sugar/array';
 * unique(['hello','world','hello','world']); // => ['hello','world']
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}
//# sourceMappingURL=unique.js.map