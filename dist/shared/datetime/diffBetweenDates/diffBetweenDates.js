import { DateTime } from 'luxon';
import parseDate from '../parseDate/parseDate.js';
export default function diffBetweenDates(date1, date2, settings) {
    const finalSettings = Object.assign({ format: '' }, (settings !== null && settings !== void 0 ? settings : {}));
    // prse the passed date
    const jsDate1 = parseDate(date1, finalSettings);
    const jsDate2 = parseDate(date2, finalSettings);
    if (!jsDate1 || !jsDate2) {
        return null;
    }
    const luxonDate1 = DateTime.fromJSDate(jsDate1);
    const luxonDate2 = DateTime.fromJSDate(jsDate2);
    const diff = luxonDate2
        .diff(luxonDate1, [
        'years',
        'months',
        'days',
        'hours',
        'minutes',
        'seconds',
    ])
        .toObject();
    return diff;
}
//# sourceMappingURL=diffBetweenDates.js.map