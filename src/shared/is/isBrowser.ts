/**
 * @name                isBrowser
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the script is running inside a browser or not
 *
 * @return   {Boolean}   true if it's in a browser, false if not
 *
 * @todo      tests
 *
 * @snippet         isBrowser()
 *
 * @example    js
 * import { isBrowser } from '@blackbyte/sugar/is'
 * if (isBrowser() {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
