/**
 * @name            throttle
 * @namespace       shared.function
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @param           {Number}            threshhold          The delay in ms to wait between two function calls
 * @param           {Function}          fn                  The function to throttle
 * @return          {Function}                              The throttled function
 *
 * @todo      tests
 *
 * @snippet         throttle($1, $2)
 * throttle($1, () => {
 *      $2
 * })
 *
 * @example 		js
 * import { throttle } from '@blackbyte/sugar/function';
 * const myThrottledFn = throttle(1000, () => {
 * 		// my function content that will be
 * 		// executed only once each second
 * });
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function throttle(threshhold: number, fn: Function): Function;
