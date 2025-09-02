/**
 * @name        isCrawler
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if request is from a crawler (google bot, etc...) or not
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a crawler, false if not
 *
 * @todo      tests
 *
 * @snippet         isCrawler()
 *
 * @example 	js
 * import { isCrawler } from '@blackbyte/sugar/is'
 * if (isCrawler()) {
 *   // do something cool
 * }
 *
 * @see            https://www.npmjs.com/package/isbot
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCrawler(ua?: string): boolean;
