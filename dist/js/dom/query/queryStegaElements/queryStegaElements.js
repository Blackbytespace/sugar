import { stega } from '@blackbyte/sugar/crypto';
const STEGA_REGEX = /[\u200B\u200C]+/g;
function extractStega(value) {
    const matches = value.match(STEGA_REGEX);
    return matches ? matches.join('') : null;
}
export default function queryStegaElements($root = document, settings) {
    const finalSettings = Object.assign({ attributes: true }, settings);
    const results = [];
    const allElements = Array.from($root.querySelectorAll('*'));
    for (const $elm of allElements) {
        // Check text nodes for stega-encoded content
        for (const node of Array.from($elm.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                const raw = extractStega(node.textContent);
                if (raw) {
                    results.push({
                        $elm,
                        stega: raw,
                        decode: () => stega.decrypt(raw),
                    });
                }
            }
        }
        // Check attributes for stega-encoded content
        if (finalSettings.attributes !== false) {
            for (const attr of Array.from($elm.attributes)) {
                // If attrs is an array, only check the listed attribute names
                if (Array.isArray(finalSettings.attributes) &&
                    !finalSettings.attributes.includes(attr.name)) {
                    continue;
                }
                const raw = extractStega(attr.value);
                if (raw) {
                    results.push({
                        $elm,
                        attr: attr.name,
                        stega: raw,
                        decode: () => stega.decrypt(raw),
                    });
                }
            }
        }
    }
    return results;
}
//# sourceMappingURL=queryStegaElements.js.map