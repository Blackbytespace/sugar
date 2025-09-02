/**
 * @name                isImageUrl
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stabke
 *
 * Check if the passed string path is an image url
 *
 * @param                 {String}        string             The string to check
 * @return              {Boolean}           true if is an image url/path, false if not
 *
 * @todo      tests
 *
 * @snippet         isImageUrl($1)
 *
 * @example               js
 * import { isImageUrl } from '@blackbyte/sugar/is';
 * isImageUrl('something.jpg); // => true
 * isImageUrl('other.pdf); // => false
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function (string: string): boolean;
