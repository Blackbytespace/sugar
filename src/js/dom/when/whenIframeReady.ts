/**
 * @name            whenIframeReady
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Wait until the passed iframe is ready to be used
 *
 * @param       {HTMLIframeElement}         $iframe          The iframe to wait on
 * @return 		{Promise<HTMLIframeElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @snippet         whenIframeReady($1)
 * whenIframeReady($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { whenIframeReady } from '@blackbyte/sugar/dom'
 * whenIframeReady($myCoolIframe).then($iframe => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export default function whenIframeReady(
  $iframe: HTMLIFrameElement,
): Promise<any> {
  return new Promise((resolve) => {
    if ($iframe.contentWindow?.document?.body) {
      return resolve($iframe);
    }
    let int = setInterval(() => {
      if ($iframe.contentWindow?.document?.body) {
        clearInterval(int);
        resolve(null);
      }
    }, 10);
  });
}
