/**
 * @name                    deepMerge
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 * - Choose beetween cloning first (default) the object or keeping the first passed object as result
 * Note that by default the resulting object is a clone and do not have the same reference that the first passed object.
 *
 * @param           {any[]}                             objects             Pass all the objects you want to merge
 * @param           {TDeepMergeSettings}                [settings={}]       Some settings to configure your merging process
 * @return          {Object}                                                The merged object result
 *
 * @setting         {Boolean}           [array=false]           Merge or not arrays
 * @setting         {Boolean}           [clone=true]            Specify if you want the result object to be a clone or the same first passed object
 *
 * @feature         Support array merging by passing the last parameter as the { array: true } object
 * @feature         Support merging object with getters. Can access the source object from the second object property getter using the `this.$source` property
 *
 * @todo      tests
 *
 * @snippet         deepMerge($1, $2)
 *
 * @example           js
 * import { deepMerge } from '@blackbyte/sugar/object';
 * deepMerge([{a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}}]);
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TDeepMergeSettings = {
    array?: boolean;
    clone?: boolean;
};
export default function deepMerge(objects: any[], settings?: TDeepMergeSettings): any;
