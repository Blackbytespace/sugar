import { __querySelectorUp } from '@blackbyte/sugar/dom';
export default function isDarkMode(settings) {
    const finalSettings = Object.assign({ ctx: window }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.rootNode) {
        if (finalSettings.rootNode.classList.contains('-dark')) {
            return true;
        }
        const $dark = __querySelectorUp(finalSettings.rootNode, '.-dark');
        if ($dark) {
            return true;
        }
        return false;
    }
    return (finalSettings.ctx.matchMedia &&
        finalSettings.ctx.matchMedia('(prefers-color-scheme: dark)').matches);
}
//# sourceMappingURL=isDarkMode.js.map