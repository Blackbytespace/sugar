import easeOutQuad from '../easing/easeOutQuad.js';
import clamp from './clamp.js';

/**
 * @name                easeClamp
 * @namespace           shared.math
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Clamp a number between two values with easing in and out
 *
 * @param       {Number}       num             The number to clamp
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
 * @return      {Number}                The clamped number
 *
 * @todo      tests
 *
 * @example       js
 * import { easeClamp } from '@blackbyte/sugar/math';
 * easeClamp(-20, -10, 0, 100, 110); // => -10
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function easeClamp(
  num: number,
  minEnd: number,
  minStart: number,
  maxStart: number,
  maxEnd: number,
): number {
  const diffStart = Math.abs(minStart - minEnd),
    diffEnd = Math.abs(maxStart - maxEnd);

  let computedNum = num;

  if (num <= minStart) {
    const percent = Math.abs((100 / diffStart) * clamp(num, minEnd, minStart));
    computedNum =
      (diffStart / 100) * (easeOutQuad((1 / 100) * percent) * 100) * -1;
  } else if (num >= maxStart) {
    const percent = Math.abs(
      (100 / diffEnd) * clamp(diffEnd - (maxEnd - num), 0, diffEnd),
    );
    computedNum =
      maxStart + (diffEnd / 100) * (easeOutQuad((1 / 100) * percent) * 100);
  }

  return computedNum;
}
