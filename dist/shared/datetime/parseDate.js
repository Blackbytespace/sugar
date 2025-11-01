import { DateTime } from 'luxon';
export default function parseDate(date, settings) {
    const finalSettings = Object.assign({ format: '' }, (settings !== null && settings !== void 0 ? settings : {}));
    let luxonDate;
    // if it is already a date, we just return it
    if (date instanceof Date) {
        return date;
    }
    // if a format is passed, we check this.
    // if it's invalid, we return null
    if (finalSettings.format) {
        luxonDate = DateTime.fromFormat(date, finalSettings.format);
    }
    if (luxonDate === null || luxonDate === void 0 ? void 0 : luxonDate.invalid) {
        return null;
    }
    // otherwise we try to parse the date string
    // using all the format supported by luxon
    luxonDate = DateTime.fromISO(date);
    if (!(luxonDate === null || luxonDate === void 0 ? void 0 : luxonDate.invalid)) {
        return luxonDate.toJSDate();
    }
    luxonDate = DateTime.fromRFC2822(date);
    if (!(luxonDate === null || luxonDate === void 0 ? void 0 : luxonDate.invalid)) {
        return luxonDate.toJSDate();
    }
    luxonDate = DateTime.fromHTTP(date);
    if (!(luxonDate === null || luxonDate === void 0 ? void 0 : luxonDate.invalid)) {
        return luxonDate.toJSDate();
    }
    // nothing worked...
    return null;
}
//# sourceMappingURL=parseDate.js.map