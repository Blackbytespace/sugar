/**
 * @name            wait
 * @namespace       shared.datetime
 * @type            Function
 * @platform        js
 * @platform        node
 * @async
 * @status          stable
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to wait in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @todo      tests
 *
 * @snippet         wait($1)
 * await wait($1)
 *
 * @example       js
 * import { wait } from '@blackbyte/sugar/datetime';
 * await wait(2000);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function wait(timeout: number = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
