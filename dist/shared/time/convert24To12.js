import { pad } from '@blackbyte/sugar/number';
export default function convert24To12(time, settings) {
    const finalSettings = Object.assign({ keepZeroMinute: false, keepLeadingZero: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (typeof time !== 'string' || !time.match(/^[012][0-9]\:[012345][0-9]$/)) {
        throw new Error('[convert24To12] Invalid time format. Must be a string like "23:00"');
    }
    let [hours, minutes] = time.split(':');
    let finalHours = parseInt(hours, 10);
    let finalMinutes = parseInt(minutes, 10);
    let suffix = finalHours > 12 || finalHours === 0 ? 'pm' : 'am';
    let finalHoursStr = pad(finalHours > 12 ? finalHours - 12 : finalHours === 0 ? 12 : finalHours, finalSettings.keepLeadingZero ? 2 : 1);
    let finalMinutesStr = finalMinutes === 0 && !finalSettings.keepZeroMinute
        ? ''
        : `:${pad(finalMinutes, 2)}`;
    return `${finalHoursStr}${finalMinutesStr}${suffix}`;
}
//# sourceMappingURL=convert24To12.js.map