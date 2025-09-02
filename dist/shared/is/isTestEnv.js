/**
 * @name                testEnv
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
 *
 * @todo      tests
 *
 * @snippet         isTestEnv()
 *
 * @example       js
 * import { isTestEnv } from '@blackbyte/sugar/is';
 * isTestEnv(); // => true
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isTestEnv() {
    var _a, _b;
    // @ts-ignore
    return ((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'test';
}
//# sourceMappingURL=isTestEnv.js.map