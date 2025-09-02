/**
 * @name      isInIframe
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the page is loaded inside an iframe
 *
 * @return    {Boolean}    true if in iframe, false if not
 *
 * @snippet         isInIframe($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isInIframe } from '@blackbyte/sugar/dom'
 * if (isInIframe()) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isInIframe(): boolean;
