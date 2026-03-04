/**
 * @name                cleanDeep
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function takes an object as input and returns a cleaned version of it.
 * You can pass a cleaner function that has to returns true or false. If returns true, the element will be
 * keeped. If false, it will be removed from the output.
 * The default cleaner function remove all that is either null, "" or undefined.
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Object}        [settings={}]     An object of settings to configure your mapDeep process:
 *
 * @setting         {Function}      [cleaner=null]       The cleaner function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @setting         {Boolean}       [array=true]                    Specify if we want to process also arrays or not
 * @setting         {Boolean}       [clone=false]          Specify if you want to clone the object passed before cleaning it
 *
 * @todo      tests
 *
 * @snippet         cleanDeep($1)
 * cleanDeep($1);
 *
 * @example       js
 * import { cleanDeep } from '@blackbyte/sugar/object';
 * cleanDeep({
 *    hello: 'world',
 *    something: null
 * });
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TCleanDeepSettings = {
    array?: boolean;
    clone?: boolean;
    cleaner?(value: any): boolean;
};
export default function cleanDeep(objectOrArray: any, settings?: TCleanDeepSettings): any;
