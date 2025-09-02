import expandPleasantCssClassname from './expandPleasantCssClassname.js';
export default function extractCssClassesNames(html, settings) {
    const finalSettings = Object.assign({ expandPleasantCssClassname: true, includeIds: false }, (settings !== null && settings !== void 0 ? settings : {}));
    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
    if (finalSettings.includeIds) {
        reg = /(class|id)="[a-zA-Z0-9_\-:@\s]+"/gm;
    }
    const matches = html.match(reg);
    if (!matches)
        return [];
    let classesNames = [];
    // @ts-ignore
    matches.forEach((match) => {
        let classesStr = match
            .trim()
            .replace('class="', '')
            .replace('id="', '')
            .replace('"', '');
        if (settings === null || settings === void 0 ? void 0 : settings.expandPleasantCssClassname) {
            classesStr = expandPleasantCssClassname(classesStr);
        }
        classesNames = [...classesNames, ...classesStr.split(' ')].map((l) => l.trim());
    });
    return classesNames;
}
//# sourceMappingURL=extractCssClassesNames.js.map