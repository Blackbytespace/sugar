/**
 * @name            whenEventListener
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Promisify the `addEventListener` method of an element to resolve a promise
 * once the event has been triggered.
 *
 * @param    {string}        event    The event to listen for (e.g. 'click', 'animationend', etc.)
 * @param    {HTMLElement}   $elm     The element to listen on
 * @return   {Promise<Event>}         A promise that will be resolved once the event has been triggered
 *
 * @snippet         whenEventListener($1, $2)
 * whenEventListener($1, $2).then(e: Event => {
 *      $3
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenEventListener } from '@blackbyte/sugar/dom'
 * whenEventListener('click', myCoolElm).then((e: Event) => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenEventListener(event, $elm) {
    return new Promise((resolve) => {
        $elm.addEventListener(event, (e) => {
            resolve(e);
        }, {
            once: true,
        });
    });
}
//# sourceMappingURL=whenEventListener.js.map