import unescape from 'unescape';

/**
 * @name            unescapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to unescape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         unescapeHtml($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { unescapeHtml } from '@blackbyte/sugar/html';
 * unescapeHtml('&lt;s-code-example&gt;'); // => <s-code-example>
 *
 * @see             https://www.npmjs.com/package/unescape
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unescapeHtml(html: string): string {
  // @ts-ignore
  return unescape(html);
}
