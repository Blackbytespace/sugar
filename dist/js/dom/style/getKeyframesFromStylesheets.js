import __getCssRulesFromStylesheet from './getCssRulesFromStylesheet.js';
import __getKeyframesDeclarations from './getKeyframesDeclarations.js';
import __transformKeyframeDeclaration from './transformKeyframesDeclarations.js';
export default function getKeyframesFromStylesheets(animationName, styleSheets) {
    // Collect CSSRules present in the document
    const CSSRules = [].slice
        .call(styleSheets)
        .reduce((results, styleSheet) => [
        ...results,
        ...__getCssRulesFromStylesheet(styleSheet),
    ], []);
    // Filter CSSRules for KeyFrameRules
    // @ts-ignore
    return (__getKeyframesDeclarations(animationName, CSSRules)
        // Transform KeyFrameRules to web animation compatible format
        .map(__transformKeyframeDeclaration)
        // Flatten mulitdimensional array of transformed keyframes
        .reduce((results, declaration) => {
        const amend = Array.isArray(declaration) ? declaration : [declaration];
        return [...results, ...amend];
    }, []));
}
//# sourceMappingURL=getKeyframesFromStylesheets.js.map