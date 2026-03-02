import { pad } from '@blackbyte/sugar/number';

/**
 * @name                 convert24To12
 * @namespace            shared.time
 * @type                 Function
 * @platform             js
 * @platform             node
 * @status               stable
 *
 * Convert a 24 hours time to a 12 hours time format
 *
 * @param       {String}                    time              The 24 hours time like "23:00"
 * @return    {String}                                      The 12 hours time like "11:00pm"
 *
 * @todo      tests
 *
 * @snippet         convert24To12($1)
 *
 * @example    js
 * import { convert24To12 } from '@blackbyte/sugar/time'
 * convert24To12('23:12') // => '11:12pm'
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TConvert24To12Settings = {
  keepLeadingZero?: boolean;
  keepZeroMinute?: boolean;
};

export default function convert24To12(
  time: string,
  settings?: TConvert24To12Settings,
): string {
  const finalSettings: TConvert24To12Settings = {
    keepZeroMinute: false,
    keepLeadingZero: false,
    ...(settings ?? {}),
  };

  if (typeof time !== 'string' || !time.match(/^[012][0-9]\:[012345][0-9]$/)) {
    throw new Error(
      '[convert24To12] Invalid time format. Must be a string like "23:00"',
    );
  }

  let [hours, minutes] = time.split(':');
  let finalHours = parseInt(hours, 10);
  let finalMinutes = parseInt(minutes, 10);
  let suffix = finalHours > 12 || finalHours === 0 ? 'pm' : 'am';

  let finalHoursStr = pad(
    finalHours > 12 ? finalHours - 12 : finalHours === 0 ? 12 : finalHours,
    finalSettings.keepLeadingZero ? 2 : 1,
  );
  let finalMinutesStr =
    finalMinutes === 0 && !finalSettings.keepZeroMinute
      ? ''
      : `:${pad(finalMinutes, 2)}`;

  return `${finalHoursStr}${finalMinutesStr}${suffix}`;
}
