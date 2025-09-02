/**
 * @name                simply
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function take a string with accents, etc and convert it to a more simply
 * version like "éàddö" to "eaddo"
 *
 * @param       {String}        string        The string to simplyfy
 * @param       {Object}        [settings={}]       An object of settings to simplify your string as you want:
 * @return     {String}                        The simplified string
 *
 * @setting    {Boolean}       [specialChars=true]       Specify if you want to get rid of the special chars like é, è, etc...
 * @setting    {Boolean}       [lowerCase=true]          Specify if you want your returned string to be lowercased
 * @setting    {Boolean}       [dashSpace=true]          Specify if you want to replace the "_|-" by a space
 * @setting    {Boolean}       [trim=true}               Specify if you want your string to be trimed or not
 *
 * @todo      tests
 *
 * @snippet         simplify($1)
 *
 * @example       js
 * import { simplify } from '@blackbyte/sugar/string';
 * simplify('éàddö'); // => eaddo
 *
 * @since     1.0.0
 * @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>
 */
export type TSimplifySettings = {
  specialChars?: boolean;
  lowerCase?: boolean;
  dashSpace?: boolean;
  trim?: boolean;
};

export default function simplify(
  string: string,
  settings: TSimplifySettings = {},
): string {
  settings = {
    specialChars: true,
    lowerCase: true,
    dashSpace: true,
    trim: true,
    ...settings,
  };

  if (string == null) return '';
  const map = {
    A: 'À|Á|Ã|Â|Ä',
    a: 'á|à|ã|â|ä',
    E: 'É|È|Ê|Ë',
    e: 'é|è|ê|ë',
    I: 'Í|Ì|Î|Ï',
    i: 'í|ì|î|ï',
    O: 'Ó|Ò|Ô|Õ|Ö',
    o: 'ó|ò|ô|õ|ö',
    U: 'Ú|Ù|Û|Ü|Ü',
    u: 'ú|ù|û|ü|ü',
    C: 'Ç',
    c: 'ç',
    N: 'Ñ',
    n: 'ñ',
  };

  if (settings.dashSpace) {
    map[' '] = '_|-';
  }

  if (settings.lowerCase) {
    string = string.toLowerCase();
  }

  if (settings.specialChars) {
    for (const pattern in map) {
      string = string.replace(new RegExp(map[pattern], 'g'), pattern);
    }
  }

  if (settings.trim) string = string.trim();

  return string;
}
