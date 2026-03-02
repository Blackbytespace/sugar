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
export default function isTestEnv(): boolean {
  // @ts-ignore
  return process?.env?.NODE_ENV?.toLowerCase() === 'test';
}
