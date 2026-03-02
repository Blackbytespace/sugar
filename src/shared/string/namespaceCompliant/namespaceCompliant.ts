import simplifySpecialChars from './simplifySpecialChars.js';

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

export default function namespaceCompliant(
  str: string,
  settings?: TNamespaceCompliantSettings,
): string {
  settings = {
    exclude: [],
    ...(settings ?? {}),
  };

  // spaces
  str = str.replace(/\s{1,9999999999999999}/gm, '-');
  // special characters
  str = simplifySpecialChars(str);
  // replace characters like /, etc...
  const dict = {
    '\\': '-',
    '(': '-',
    ')': '-',
    '{': '-',
    '}': '-',
    '[': '-',
    ']': '-',
    '=': '-',
    '?': '-',
    '!': '-',
    '&': '-',
    '%': '-',
    '*': '-',
    '"': '-',
    "'": '-',
    '`': '-',
    '+': '-',
    '/': '.',
    '°': '-',
    $: '-',
    '<': '-',
    '>': '-',
    ',': '-',
    ':': '-',
    '#': '-',
  };

  settings.exclude.forEach((char) => {
    delete dict[char];
  });

  Object.keys(dict).forEach((char) => {
    str = str.split(char).join(dict[char]);
  });
  // first and last characters + multiple ---
  str = str.replace(/\.{2,999}/gm, '.');
  str = str.replace(/^-{1,999}/gm, '');
  str = str.replace(/-{1,999}$/gm, '');
  str = str.replace(/-{2,999}/gm, '-');
  str = str.replace(/[^a-zA-Z0-9@]{1,999}$/, '');
  str = str.replace(/^[^a-zA-Z0-9@]{1,999}/, '');

  return str;
}
