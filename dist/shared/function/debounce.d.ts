/**
 * @name                debounce
 * @namespace           shared.function
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called only once after
 * the delay passed
 *
 * @param       {Number}        delay          A delay in ms to wait between two function calls
 * @param       {Function}      fn              The function to debounce
 *
 * @todo      tests
 *
 * @snippet         debounce($1, $2)
 * debounce($1, () => {
 *      $2
 * })
 *
 * @example 		js
 * import { debounce } from '@blackbyte/sugar/function';
 * const myDebouncedFn = debounce(1000, () => {
 * 		// my function content that will be
 * 		// executed only once after the 1 second delay
 * });
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my debounced function
 * 		myDebouncedFn();
 * });
 *
 * @since           1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function debounce(delay: number, fn: Function): Function;
