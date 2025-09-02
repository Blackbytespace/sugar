/**
 * @name            whenInteract
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Wait that an interaction is made with the passed element like "focus", "focusIn", "pointerover", etc...
 *
 * @param 		{HTMLElement} 		elm 	        The html element you want to monitor
 * @param       {Partial<IInteractionSettings>}     [settings={}]           Some settings to configure your interaction detection
 * @return 		{Promise<HTMLElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @setting         {boolean}           [pointerover=true]          Specify if you want to detect the pointerover or not
 * @setting         {boolean}           [pointerout=true]          Specify if you want to detect the pointerout or not
 * @setting         {boolean}           [pointerdown=true]          Specify if you want to detect the pointerdown or not
 * @setting         {boolean}           [touchstart=true]          Specify if you want to detect the touchstart or not
 * @setting         {boolean}           [touchend=true]          Specify if you want to detect the touchend or not
 * @setting         {boolean}           [focus=true]          Specify if you want to detect the focus or not
 *
 * @snippet         whenInteract($1)
 * whenInteract($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { whenInteract } from '@blackbyte/sugar/dom'
 * whenInteract(myCoolElement).then($elm => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TWhenInteractSettings = {
    pointerover: boolean;
    pointerout: boolean;
    pointerdown: boolean;
    touchstart: boolean;
    touchend: boolean;
    focus: boolean;
};
export default function whenInteract(elm: HTMLElement, settings?: Partial<TWhenInteractSettings>): Promise<any>;
