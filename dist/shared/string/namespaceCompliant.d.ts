/**
 * @name                namespaceCompliant
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              beta
 *
 * This function take a string and return a version of it that you can safely use
 * as a namespace with just dots and non special characters.
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         namespaceCompliant($1)
 *
 * @todo     tests
 *
 * @example         php
 * import { namespaceCompliant } from '@blackbyte/sugar/string';
 * namespaceCompliant('Hello world'); // => hello-world
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TNamespaceCompliantSettings = {
    exclude: string[];
};
export default function namespaceCompliant(str: string, settings?: TNamespaceCompliantSettings): string;
