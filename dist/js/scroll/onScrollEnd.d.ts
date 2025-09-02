/**
 * @name            onScrollEnd
 * @namespace       js.dom.scroll
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function simply listen for scroll on the passed element and call the passed callback
 * when reaching the end of it.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {Function}              callback        The function to call when scroll end is detected
 * @param       {TOnScrollEndSettings}      [settings={}]       Some settings like offset, etc...
 *
 * @setting         {Number}        [offset=20]             An offset to detect earlier the end of the scroll
 * @setting         {boolean}       [once=false]            true if you want to detect the scroll end just once
 * @setting         {number}        [times=-1]              Specify a number of times to detect the scroll end
 *
 * @todo      tests
 *
 * @snippet         __onScrollEnd($1, $2)
 * __onScrollEnd($1, () => {
 *      $2
 * });
 *
 * @example         js
 * import { __onScrollEnd } from '@blackbyte/sugar/scroll';
 * __onScrollEnd($elm, () => {
 *      // do something
 * }, {
 *    offset: 50
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TOnScrollEndSettings = {
    offset: number;
    once: boolean;
    times: number;
};
export default function __onScrollEnd($elm: any, callback: Function, settings?: TOnScrollEndSettings): void;
