/**
 * @name                stylesheetToString
 * @namespace           js.css
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @todo        tests
 *
 * @param       {StyleSheet|StyleSheetList}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @snippet         stylesheetToString($1)
 *
 * @example         js
 * import { stylesheetToString } from '@blackbyte/sugar/dom';
 * stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function stylesheetToString(stylesheet: StyleSheet | StyleSheetList): string;
