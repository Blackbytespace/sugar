/**
 * @name            getExtendsStack
 * @namespace       shared.class
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function take a class as parameter and return an array of all the class names used to extends this one...
 *
 * @param       {Class}         cls         The class to get the stack of
 * @param       {TGetExtendsStackSettings}    [settings={}]       Some settings to configure your process
 * @return      {Object}                     An object of all the parent classes
 *
 * @setting     {Boolean}     [includeBaseClass=false]      Specify if you want to include the base class in the stack or not
 *
 * @todo      tests
 *
 * @snippet         getExtendsStack($1)
 *
 * @example         js
 * import { getExtendsStack } from '@blackbyte/sugar/class';
 * class Coco extends Error {}
 * class Plop extends Coco {}
 * getExtendsStack(Plop); // => {Coco: [class ...], Error: [class ...]};
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TGetExtendsStackSettings = {
    includeBaseClass?: boolean;
};
export type TGetExtendsStackResult = {
    [key: string]: any;
};
export type TGetExtendsStack = {
    (cls: any, settings?: TGetExtendsStackSettings): TGetExtendsStackResult;
};
declare const fn: TGetExtendsStack;
export default fn;
