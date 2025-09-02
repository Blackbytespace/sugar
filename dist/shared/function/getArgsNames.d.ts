/**
 * @name                getArgsNames
 * @namespace           shared.function
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              beta
 *
 * Get the arguments names of the passed function. Return an array of the arguments names
 *
 * @param             {Function}              func                  The function reference of which get the arguments names
 * @return            {Array}                                       An array of arguments names
 *
 * @todo        tests
 *
 * @snippet         getArgsNames($1)
 *
 * @example         js
 * import { getArgsNames } from '@blackbyte/sugar/function';
 * function hello(world, coco, plop) { }
 * getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getArgsNames(func: Function): string[];
