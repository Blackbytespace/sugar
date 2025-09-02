/**
 * @name                isUrl
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid url
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         isUrl($1)
 *
 * @example 	js
 * import { isUrl } from '@blackbyte/sugar/is';
 * isUrl('http://google.com') => true
 * isUrl('ftp://web.coco.com:2222') => false
 * isUrl('hello') => false
 *
 * @see             https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isUrl(data) {
    try {
        return Boolean(new URL(data));
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=isUrl.js.map