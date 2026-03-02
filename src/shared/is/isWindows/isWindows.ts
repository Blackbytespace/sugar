// @ts-nocheck

/**
 * @name                    isWindows
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      tests
 *
 * @snippet         isWindows()
 *
 * @example       js
 * import { isWindows } from '@blackbyte/sugar/is';
 * isWindows(); // => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isWindows(): boolean {
  if (process && process.platform) {
    return process.platform === 'win32';
  }
  const platform =
    (<any>navigator)?.userAgentData?.platform ||
    navigator?.platform ||
    'unknown';
  return platform.toUpperCase().indexOf('WIN') > -1;
}
