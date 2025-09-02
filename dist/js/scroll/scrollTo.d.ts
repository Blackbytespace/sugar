/**
 * @name                scrollTo
 * @namespace           js.dom.scroll
 * @type                Function
 * @platform            js
 * @status              beta
 * @async
 *
 * Function that let you make a smooth page scroll to a specific element in the page
 *
 * @feature       Promise based API
 * @feature       Tweak the scroll behavior like duration, easing, etc...
 *
 * @setting         {HTMLElement} 				[$elm=window] 			The element to scroll
 * @setting 		{Number} 					[duration=1000] 		The animation duration
 * @setting 		{Function} 					[easing=easeInOutQuad] 			An easing Function
 * @setting         {Number}                    [offsetX=0]             An offset to apply on the X axis
 * @setting         {Number}                    [offsetY=0]             An offset to apply on the Y axis
 * @setting 		{String} 					[align='start'] 			The destination align (start, center, end)
 * @setting 		{String} 					[justify='start'] 			The destination justify (start, center, end)
 * @setting 		{Boolean} 					[force=false] 			Force the scroll even if the user is scrolling
 * @setting 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
 *
 * @param 		{HTMLElement} 				target 			The element to scroll to
 * @param       {IScrollToSettings}     [settings={}]       Some settings to tweak the scroll behavior
 * @return      {Promise}           A promise resolved once the scroll has ended
 *
 * @snippet         __scrollTo($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __scrollTop } from '@coffeekraken/sugar/dom'
 * import { easeInOutQuad } from '@coffeekraken/sugar/easing'
 * __scrollTo(myCoolHTMLElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export interface IScrollToSettings {
    $elm: HTMLElement | typeof window | typeof document;
    duration: number;
    easing: Function;
    offsetX: number;
    offsetY: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end';
    force: boolean;
    onFinish?: Function;
}
declare function __scrollTo(target: HTMLElement | 'top' | 'bottom' | 'left' | 'right', settings?: Partial<IScrollToSettings>): Promise<any>;
declare namespace __scrollTo {
    var step: () => void;
}
export default __scrollTo;
