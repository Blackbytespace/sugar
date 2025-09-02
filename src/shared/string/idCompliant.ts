import simplifySpecialChars from './simplifySpecialChars.js';

/**
 * @name            idCompliant
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function take a string and return a version of it that you can safely use
 * in html id for example. It replace spaces with '-' as well as all the special characters
 * with their simple version like "à" will be replaces by "a"
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         idCompliant($1)
 *
 * @todo      tests
 *
 * @example         php
 * import { idCompliant } from '@blackbyte/sugar/string';
 * idCompliant('Hello world'); // => hello-world
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIdCompliantSettings = {
  exclude: string[];
};

export default function idCompliant(
  str: string,
  settings?: TIdCompliantSettings,
): string {
  settings = {
    exclude: [],
    ...(settings ?? {}),
  };

  // spaces
  str = str.replace(/\s/gm, '-');
  // special characters
  str = simplifySpecialChars(str);
  // replace characters like /, etc...
  const dict = {
    '/': '-',
    '@': '',
    '.': '-',
    ',': '-',
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
    '°': '-',
    $: '-',
    '<': '-',
    '>': '-',
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
  str = str.replace(/[^a-zA-Z0-9]{1,999}$/, '');
  str = str.replace(/^[^a-zA-Z0-9]{1,999}/, '');
  // lowercase
  str = str.toLowerCase();

  return str;
}
