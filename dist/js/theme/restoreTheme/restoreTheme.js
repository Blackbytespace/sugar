import getTheme from '../getTheme/getTheme.js';
import setTheme from '../setTheme/setTheme.js';
export default function restoreTheme(defaultTheme, settings) {
    const finalSettings = Object.assign({ cookieName: 'theme' }, (settings !== null && settings !== void 0 ? settings : {}));
    const theme = getTheme(defaultTheme, finalSettings);
    setTheme(theme);
}
//# sourceMappingURL=restoreTheme.js.map