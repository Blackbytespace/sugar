/**
 * @name             onSwipe
 * @namespace        js.dom.detect
 * @type             Function
 * @platform         js
 * @status           stable
 * @async
 *
 * Detect swipes gestures on touch devices.
 *
 * @feature     Multi directional swipe detection (left, up, right, down)
 * @feature     Threshold setting
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to detect the swipe
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Partial<TOnSwipeSettings>}     [settings={}]           Some settings to configure your swipe detection
 *
 * @setting       {Number}              [threshold=100]       The swipe threshold
 *
 * @snippet         onSwipe($1, $2)
 * onSwipe($1, swipe => {
 *      $2
 * });
 *
 * @todo        enhance the typing of the callback
 * @todo      tests
 *
 * @example 	js
 * import { onSwipe } from '@blackbyte/sugar/dom'
 * onSwipe(myCoolElm, (swipe) => {
 * 	// check the swipe direction
 * 	if (swipe.left) {
 * 		// do something...
 * 	}
 * 	// support : left, right, up, down
 * 	// etc...
 * }, {
 * 	threshold : 50
 * });
 *
 * @see 		https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TOnSwipeSettings = {
    threshold: number;
};
export type TOnSwipeResult = {
    distanceX: number;
    distanceY: number;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
};
export default function onSwipe(elm: HTMLElement, cb: Function, settings?: Partial<TOnSwipeSettings>): void;
