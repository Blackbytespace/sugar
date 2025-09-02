/**
 * @name                fromQuantifier
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function allows you to generate an array from a certain passed quantifier like "2", "&lt;10", "&gt;10", "9-12", etc...
 * This is useful to create arrays that are depending on user-friendly quantifier and it's used for example in the
 * s-postcss-sugar-plugin for the `@s.lod(&gt;2)` mixin.
 *
 * @param       {String|Number}     quantifier          The quantifier to generate
 * @param       {TFromQuantifierSettings}       [settings={}]           Some settings to configure your array generation
 * @return    {Array}                                   The generated array
 *
 * @setting         {Number}        max             The maximum wanted when using > and >= quantifiers
 * @setting         {Function}      value           A function that take the current index and that MUST return the value wanted in the generated array
 *
 * @snippet         fromQuantifier($1)
 *
 * @example    js
 * import { fromQuantifier } from '@blackbyte/sugar/array'
 * fromQuantifier(3); // => [0,1,2]
 * fromQuantifier('3-5'); // => [3,4,5]
 * fromQuantifier('3-6', {
 *    value(i) => `c-${i}`
 * }); // => ['c-3','c-4','c-5','c-6']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFromQuantifierSettings = {
    max?: number;
    value?: Function;
    action: '>' | '<' | '>=' | '<=' | '=';
};
export default function fromQuantifier(quantifier: string | number, settings?: Partial<TFromQuantifierSettings>): any[];
