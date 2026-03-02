/**
 * @name                formatDuration
 * @namespace           shared.datetime
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function let you pass a duration in ms and get back a formatted estimation like "2.4m", "30s", etc...
 *
 * @param         {Number}        duration          The duration in ms to format
 * @return        {String}                          The formatted estimation duration
 *
 * @todo      tests
 *
 * @snippet         formatDuration($1)
 *
 * @example       js
 * import { formatDuration } from '@blackbyte/sugar/datetime';
 * formatDuration(2000); // => 2s
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function formatDuration(duration: number): string {
  if (duration === Infinity) {
    return '...';
  }
  if (duration < 1000) {
    return `${duration}ms`;
  }
  if (duration < 1000 * 60) {
    const s = duration / 1000;
    return `${s.toFixed(2)}s`;
  }
  if (duration < 1000 * 60 * 60) {
    const m = Math.floor(duration / 1000 / 60);
    const s = Math.round((duration - m * 1000 * 60) / 1000);
    return `${m}m${s > 0 ? `${s}s` : ''}`;
  }

  const h = Math.floor(duration / 1000 / 60 / 60);
  const m = Math.floor((duration - h * 1000 * 60 * 60) / 1000 / 60);
  return `${h}h${m > 0 ? `${m}m` : ''}`;
}
