import disableTitleTooltips from '../disableTitleTooltips/disableTitleTooltips.js';
import scrollClasses from '../scrollClasses/scrollClasses.js';
import sectionClasses from '../sectionClasses/sectionClasses.js';
export default function features(features) {
    if (features === 'all' || features.disableTitleTooltips) {
        disableTitleTooltips();
    }
    if (features === 'all' || features.scrollClasses) {
        scrollClasses(features === 'all'
            ? undefined
            : features.scrollClasses);
    }
    if (features === 'all' || features.sectionClasses) {
        sectionClasses(features === 'all'
            ? undefined
            : features.sectionClasses);
    }
}
//# sourceMappingURL=features.js.map