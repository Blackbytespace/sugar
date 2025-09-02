/**
 * @name            whenScriptLoaded
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect when a script has been fully loaded
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
 * @param       {Function}      [cb=null]     A callback if you prefer
 * @return    {Promise}    The promise that will be resolved when the script is fully loaded
 *
 * @snippet         whenScriptLoaded($1)
 * whenScriptLoaded($1).then(\$script => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenScriptLoaded } from '@blackbyte/sugar/dom'
 * whenScriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenScriptLoaded($script: HTMLScriptElement, cb?: Function): Promise<HTMLScriptElement>;
