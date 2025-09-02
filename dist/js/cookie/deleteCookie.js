import setCookie from './setCookie.js';
/**
 * @name            deleteCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Delete a cookie
 *
 * @param       {String}            name            The cookie name to delete
 * @return      {any}                               The cookie value
 *
 * @snippet         deleteCookie($1)
 *
 * @todo            tests
 *
 * @example         js
 * import { deleteCookie } from '@blackbyte/sugar/cookie';
 * deleteCookie('myCookie');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function deleteCookie(name) {
    setCookie(name, '', {
        'max-age': -1,
    });
}
//# sourceMappingURL=deleteCookie.js.map