import { setCookie } from '@blackbyte/sugar/cookie';
export default function setTheme(theme, settings) {
    const finalSettings = Object.assign({ cookieName: 'theme' }, (settings !== null && settings !== void 0 ? settings : {}));
    document.body.classList.forEach((cls) => {
        if (cls.match(/^theme-/)) {
            document.body.classList.remove(cls);
        }
    });
    document.body.classList.add(`theme-${theme}`);
    setCookie(finalSettings.cookieName, theme);
}
//# sourceMappingURL=setTheme.js.map