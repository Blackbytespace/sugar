import type { TWhenEntersViewportSettings } from '../when/whenEntersViewport.js';
import type { TWhenInteractSettings } from '../when/whenInteract.js';
import type { TWhenInViewportSettings } from '../when/whenInViewport.js';
import type { TWhenNearViewportSettings } from '../when/whenNearViewport.js';
import type { TWhenOutOfViewportSettings } from '../when/whenOutOfViewport.js';
import type { IWhenStyleSheetsReadySettings } from '../when/whenStylesheetsReady.js';
import type { TWhenVisibleSettings } from '../when/whenVisible.js';
/**
 * @name            when
 * @namespace       js.dom.when
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {String|String[]}       trigger     The trigger(s) to listen on
 * @param       {TwhenSettings}      [settings={}]       Some settings like offset, etc...
 * @return      {SPromise<HTMLElement>}                 A promise resolved when all the triggers are fulfilled
 *
 * @setting         {Partial<TWhenInViewportSettings>}          [whenInViewport={}]            Some settings for the whenInViewport function
 * @setting         {Partial<TWhenNearViewportSettings>}        [whenNearViewport={}]           Some settings for the whenNearViewport function
 * @setting         {Partial<IWhenEntersViewportSettubgs>}      [whenEntersViewport={}]         Some settings for the whenEntersViewport function
 * @setting         {Partial<TWhenOutOfViewportSettings>}      [whenOutOfViewport={}]         Some settings for the whenOutOfViewport function
 * @setting         {Partial<TWhenInteractSettings>}      [whenInteract={}]         Some settings for the whenInteract function
 * @setting         {Partial<TWhenVisibleSettings>}      [whenVisible={}]         Some settings for the whenVisible function
 * @setting         {Partial<IWhenStyleSheetsReadySettings>}      [whenStylesheetsReady={}]         Some settings for the whenStylesheetsReady function
 *
 * @snippet         when($1, $2, $3)
 * when($1, $2).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example         js
 * import { when } from '@blackbyte/sugar/dom';
 * when($elm, 'inViewport', {
 *    whenInViewport: {
 *       offset: 50
 *    }
 * }).then(() => {
 *      // do something
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TwhenSettings = {
    whenInViewport?: TWhenInViewportSettings;
    whenNearViewport?: TWhenNearViewportSettings;
    whenEntersViewport?: TWhenEntersViewportSettings;
    whenOutOfViewport?: TWhenOutOfViewportSettings;
    whenInteract?: TWhenInteractSettings;
    whenVisible?: TWhenVisibleSettings;
    whenStylesheetsReady?: IWhenStyleSheetsReadySettings;
};
export type TWhenTrigger<string> = ('direct' | 'directly' | 'inViewport' | 'nearViewport' | 'enterViewport' | 'outOfViewport' | 'interact' | 'visible' | 'domReady' | 'stylesheetsReady' | 'animationEnd')[];
export declare const WhenTriggers: string[];
export default function when($elm: HTMLElement, trigger: TWhenTrigger[], settings?: TwhenSettings): Promise<any>;
