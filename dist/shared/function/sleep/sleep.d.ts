/**
 * @name            sleep
 * @namespace       shared.function
 * @type            Function
 * @platform        js
 * @platform        node
 * @async
 * @status          stable
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to sleep in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @todo      tests
 *
 * @snippet         sleep($1)
 * await sleep($1)
 *
 * @example       js
 * import { sleep } from '@blackbyte/sugar/function';
 * await sleep(2000);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function sleep(timeout?: number): Promise<void>;
