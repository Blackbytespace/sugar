/**
 * @name                isOsx
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      tests
 *
 * @snippet         isOsx()
 *
 * @example       js
 * import { isOsx } from '@blackbyte/sugar/is';
 * isOsx(); // => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isOsx() {
    var _a;
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    const platform = ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) ||
        (navigator === null || navigator === void 0 ? void 0 : navigator.platform) ||
        'unknown';
    return platform.toUpperCase().indexOf('MAC') >= 0;
}
//# sourceMappingURL=isOsx.js.map