export default function setCookie(name, value, settings = {}) {
    settings = Object.assign({ path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 1000).toUTCString(), secure: document.location.protocol === 'https:' }, settings);
    try {
        value = JSON.stringify(value);
    }
    catch (e) { }
    // @ts-ignore
    if (settings.expires instanceof Date) {
        settings.expires = settings.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in settings) {
        let optionValue = settings[optionKey];
        if (optionValue === false) {
            continue;
        }
        updatedCookie += '; ' + optionKey;
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
//# sourceMappingURL=setCookie.js.map