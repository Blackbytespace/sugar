/**
 * @name                replaceTags
 * @namespace           shared.html
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Replace all the html tags that you specify by something else that you can fully choose
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @return              {String}                                                The new text
 *
 * @todo      tests
 *
 * @snippet         replaceTags($1m $2)
 *
 * @example             js
 * import { replaceTags } from '@blackbyte/sugar/html';
 *  replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function replaceTags(text: string, tags: Record<string, Function>): string;
