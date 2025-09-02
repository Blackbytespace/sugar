/**
 * @name            setCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Set a cookie
 *
 * @param       {String}            name            The name of the cookie to set
 * @param       {Any}               value           The cookie value to set
 * @param       {Partial<ISetCookieSettings>}        [settings={}]        Some settings to configure your cookie
 *
 * @setting         {String}        [path="/"]            The path of the cookie to store
 * @setting         {String}        [domain=null]           The domain on which to store the cookie
 * @setting         {String}        [expires=null]          The date when the cookie expires. If null, mean never expires
 * @setting         {Number}        [max-age=null]          The number of seconds until the cookie expires
 * @setting         {Boolean}       [secure=null]           Specify if the cookie is available only on HTTPS or not. true if page loaded on https, false if not
 * @setting         {Boolean|'strict'|'lax'}        [samesite=null]         Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks (CSRF)
 * @setting         {Boolean}       [httpOnly=null]         Forbids JavaScript from accessing the cookie, for example, through the Document.cookie property.
 *
 * @snippet         setCookie($1, $2)
 *
 * @todo            tests
 *
 * @example         js
 * import { setCookie } from '@blackbyte/sugar/cookie';
 * setCookie('myCookie', 'hello world');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export interface ISetCookieSettings {
    path: string;
    domain: string;
    expires: string;
    'max-age': number;
    secure: boolean;
    samesite: boolean | 'strict' | 'lax';
    httpOnly: boolean;
}
export default function setCookie(name: string, value: any, settings?: Partial<ISetCookieSettings>): void;
