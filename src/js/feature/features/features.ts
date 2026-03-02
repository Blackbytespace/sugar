import disableTitleTooltips from './disableTitleTooltips.js';
import scrollClasses, { TScrollClassesSettings } from './scrollClasses.js';
import sectionClasses, { TSectionClassesSettings } from './sectionClasses.js';

/**
 * @name            features
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to activate some features like the `disableTitleTooltip`,`sectionClasses`, etc...
 * Available features are:
 * - `disableTitleTooltip`
 * - `scrollClasses`
 * - `sectionClasses`
 *
 * @param           {'all' | TFeaturesSettings}                 [settings={}]               The features you want to activate with some settings associated if needed
 *
 * @snippet          features($1);
 *
 * @example         js
 * import { features } from '@blackbyte/sugar/features';
 * features('all');
 *
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TFeaturesSettings = {
  disableTitleTooltips?: boolean;
  scrollClasses?: boolean | TScrollClassesSettings;
  sectionClasses?: boolean | TSectionClassesSettings;
};

export default function features(features: 'all' | TFeaturesSettings): void {
  if (features === 'all' || features.disableTitleTooltips) {
    disableTitleTooltips();
  }
  if (features === 'all' || features.scrollClasses) {
    scrollClasses(
      features === 'all'
        ? undefined
        : (features.scrollClasses as TScrollClassesSettings),
    );
  }
  if (features === 'all' || features.sectionClasses) {
    sectionClasses(
      features === 'all'
        ? undefined
        : (features.sectionClasses as TSectionClassesSettings),
    );
  }
}
