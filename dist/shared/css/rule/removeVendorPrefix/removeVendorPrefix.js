/**
 * @name            removeVendorPrefix
 * @namespace       js.css.rule
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Remove vendor prefixes from CSSPropertyNames
 *
 * @param           {string}            propertyName             prefixed property name
 * @return          {string}              unprefixed property name
 *
 * @todo      tests
 *
 * @snippet         removeVendorPrefix($1)
 *
 * @example  	js
 * import { removeVendorPrefix } from '@blackbyte/sugar/css';
 * removeVendorPrefix('moz-something'); // 'something'
 *
 * @see            https://github.com/marionebl/jogwheel/blob/main/source/library/remove-vendor-prefix.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
const prefixes = ['ms', 'webkit', 'moz', 'o'];
export default function removeVendorPrefix(propertyName = '') {
    const fragments = propertyName.split('-');
    if (prefixes.indexOf(fragments[1]) > -1) {
        return fragments.slice(2).join('-');
    }
    return propertyName;
}
//# sourceMappingURL=removeVendorPrefix.js.map