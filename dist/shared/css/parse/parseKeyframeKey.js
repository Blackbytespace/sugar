/**
 * @name            parseKeyframeKey
 * @namespace       js.css.parse
 * @type            Function
 * @platform        js
 * @platform        nonde
 * @status          beta
 * @private
 *
 * Parses KeyFrameRule.keyText to an array of integers holding keyframe percentages
 *
 * @param 		 {string}		 keyText			 KeyFrameRule.keyText to parse
 * @return 			{array}          					Array of percentages for this KeyFrameRule
 *
 * @todo      tests
 *
 * @snippet         parseKeyframeKey($1)
 *
 * @example  	js
 * import { parseKeyframeKey } from '@blackbyte/sugar/css';
 * parseKeyframeKey('from');
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/get-css-rules.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function parseKeyframeKey(keyText) {
    // Split multivalue key,
    return (keyText
        .split(',')
        // Trim any remaining whitespace
        .map((key) => key.trim())
        // "Understand" CSS keyText keywords
        .map((key) => key.replace('from', '0').replace('to', '100'))
        // Remove any math symbols
        .map((key) => key.replace('%', ''))
        // Parse to integer
        .map((key) => parseInt(key, 10)));
}
//# sourceMappingURL=parseKeyframeKey.js.map