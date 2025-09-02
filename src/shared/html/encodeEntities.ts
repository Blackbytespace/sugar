import { encode } from 'html-entities';

/**
 * @name            encodeEntities
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to encode some entities in a string like "<" to "&lt;"
 * It supports all the
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         encodeEntities($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { encodeEntities } from '@blackbyte/sugar/html';
 * encodeEntities('<s-code-example>'); // => &lt;s-code-example&gt;
 *
 * @see             https://www.npmjs.com/package/escape-html
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function _encodeEntities(html: string): string {
  // @ts-ignore
  return encode(html, {
    mode: 'extensive',
  });
}
