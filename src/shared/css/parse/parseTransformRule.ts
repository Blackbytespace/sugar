import parse from '../../../shared/string/parse.js';

/**
 * @name            parseTransformRule
 * @namespace       js.css.parse
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 * @private
 *
 * Parse the transform rule of an element and returns a simple object with each properties separated.
 *
 * @param 		 {string}		 transformStr	            The transform string to parse
 * @return        {TParseTransformRuleResult}               An object with all the parsed transform properties
 *
 * @todo      tests
 *
 * @example  	js
 * import { parseTransformRule } from '@blackbyte/sugar/css';
 * parseTransformRule('translate(-100px, 200rem));
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/get-css-rules.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TParseTransformRuleResult = {
  scale: string | number;
  scaleX: string | number;
  scaleY: string | number;
  scaleZ: string | number;
  translateX: string | number;
  translateY: string | number;
  translateZ: string | number;
  rotate: string | number;
  rotateX: string | number;
  rotateY: string | number;
  rotateZ: string | number;
  skew: string | number;
  skewX: string | number;
  skewY: string | number;
};

export default function parseTransformRule(
  transformStr: string,
): TParseTransformRuleResult {
  const transforms = transformStr.trim().split(/\) |\)/);

  const result: TParseTransformRuleResult = {
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  };

  transforms.forEach((transStr) => {
    if (!transStr || !transStr.trim()) {
      return;
    }

    const parts = transStr.split('('),
      prop = parts[0].trim(),
      value = parts[1].trim();

    if (prop.match(/(X|Y|Z)$/)) {
      result[prop] = parse(value);
    } else {
      const vals = value.split(',').map((v) => parse(v.trim()));

      if (vals.length === 1 && prop === 'scale') {
        result.scale = parseFloat(value);
      } else {
        ['X', 'Y', 'Z'].forEach((axis, i) => {
          if (!vals[i]) {
            return;
          }
          result[`${prop}${axis}`] = vals[i];
        });
      }
    }
  });

  return result;
}
