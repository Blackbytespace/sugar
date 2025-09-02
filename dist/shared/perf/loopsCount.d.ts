/**
 * @name                loopsCount
 * @namespace           shared.perf
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function calculate how mane loops are executed in a certain timeframe (ms).
 * This is usefull to estimate the computer speed on which this code is running...
 *
 * @param       {Number}        [timeframe=100]         The timeframe to use for calculation
 * @return      {Number}                                 The count of loops executed in the passed timeframe
 *
 * @todo      tests
 *
 * @snippet         loopsCount($1)
 *
 * @example       js
 * import { loopsCount } from '@blackbyte/sugar/perf';
 * loopsCount(); // 122003
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function loopsCount(timeframe?: number): number;
