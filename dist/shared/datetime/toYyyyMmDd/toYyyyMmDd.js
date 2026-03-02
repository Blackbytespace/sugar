import parseDate from './parseDate.js';
export default function toYyyyMmDd(date, settings) {
    const finalSettings = Object.assign({ format: '', separator: '-' }, (settings !== null && settings !== void 0 ? settings : {}));
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // already in the correct format
        return date;
    }
    // prse the passed date
    const jsDate = parseDate(date, finalSettings);
    if (!jsDate) {
        return null;
    }
    const dateStr = jsDate
        .toISOString()
        .split('T')[0]
        .replace('-', finalSettings.separator);
    return dateStr;
}
//# sourceMappingURL=toYyyyMmDd.js.map