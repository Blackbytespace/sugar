/**
 * @name                camelCaseProps
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply take an object as argument and return the same one but with properties in camel case.
 *
 * @param           {Object}            object          An object on which to apply the camel case treatment
 * @param           {IApplyScopeSettings}           [settings={}]           Some settings to configure your scope application process
 *
 * @setting         {Boolean}           [deep=true]             Specify if you want to apply the treatment deep in the object or just in the first level
 *
 * @todo        tests
 *
 * @snippet         camelCaseProps($1)
 *
 * @example         js
 * import { camelCaseProps } from '@blackbyte/sugar/object';
 * camelCaseProps({
 *    'hello-world': true
 * });
 * // {
 * //   helloWorld: true
 * // }
 *
 * @since           1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TCamelCasePropsSettings = {
    deep: boolean;
};
export default function camelCaseProps(object: any, settings?: Partial<TCamelCasePropsSettings>): any;
