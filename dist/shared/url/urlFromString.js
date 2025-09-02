import urlSlug from 'url';
/**
 * @name            urlFromString
 * @namespace       shared.url
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform         ts
 * @status          stable
 *
 * Simple function that take a string as parameter and returns you a valid
 * url ready one
 *
 * @todo            tests
 *
 * @snippet         urlFromString($1)
 *
 * @example             js
 * import { urlFromString } from '@blackbyte/sugar/url';
 * urlFromString('Sir James Paul McCartney MBE is an English singer-songwriter');
 * // sir-james-paul-mc-cartney-mbe-is-an-english-singer-songwriter
 *
 * @see             https://www.npmjs.com/package/url-slug
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function urlFromString(string) {
    return string
        .split('/')
        .map((l) => {
        // @ts-ignore
        return urlSlug(l.trim());
    })
        .join('/');
}
//# sourceMappingURL=urlFromString.js.map