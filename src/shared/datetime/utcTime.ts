/**
 * @name            utcTime
 * @namespace       shared.date
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This method allows you to display easily the time in UTC format like "10:20:32"
 *
 * @param       {Boolean}          [hours=true]             Display the hours or not
 * @param       {Boolean}          [minutes=true]             Display the minutes or not
 * @param       {Boolean}          [seconds=true]             Display the seconds or not
 * @param       {Date}           [date=new Date()]         The date to use to display the time
 * @return      {String}                                    The time string
 *
 * @todo        tests
 *
 * @snippet         utcTime()
 *
 * @example         js
 * import { utcTime } from '@blackbyte/sugar/date';
 * utcTime(); // => 10:20:32
 * utcTime(true, true, false); // => 10:20
 *
 * @since       1.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function utcTime(
  hours = true,
  minutes = true,
  seconds = true,
  date = new Date(),
): string {
  const timeAr: number[] = [];
  if (hours) timeAr.push(date.getHours());
  if (minutes) timeAr.push(date.getMinutes());
  if (seconds) timeAr.push(date.getSeconds());
  return timeAr.join(':');
}
