/**
 * @name        isTablet
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is a tablet device
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      integrate some kind of media query check
 * @todo      tests
 *
 * @snippet         isTablet()
 *
 * @example 	js
 * import { isTablet } from '@blackbyte/sugar/is'
 * if (isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isTablet(): boolean;
