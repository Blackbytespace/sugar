import escape from 'escape-html';

/**
 * @name            escapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to escape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         escapeHtml($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { escapeHtml } from '@blackbyte/sugar/html';
 * escapeHtml('<s-code-example>'); // => &lt;s-code-example&gt;
 *
 * @see             https://www.npmjs.com/package/escape-html
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function escapeHtml(html: string): string {
  // @ts-ignore
  return escape(html);
}
