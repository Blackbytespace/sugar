// matches a whole <script> element, including a self closing or unclosed one
const SCRIPT_ELEMENT_RE = /<script\b[\s\S]*?(?:<\/script\s*>|\/>|$)/gi;

// matches an opening or self closing tag, so that attributes are only ever
// rewritten inside a tag and never inside text content
const TAG_RE = /<[a-z][^>]*>/gi;

// matches an inline event handler attribute such as onload="..." or ONCLICK='...'
// every svg attribute starting with "on" is an event handler
const EVENT_ATTRIBUTE_RE = /\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

// matches an href or xlink:href attribute pointing to a javascript: url
const JAVASCRIPT_URL_RE =
  /\s(?:xlink:)?href\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|javascript:[^\s>]*)/gi;

/**
 * @name            sanitizeSvg
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Remove everything executable from an svg markup string.
 *
 * The markup is often injected with `v-html`, which means it ends up inside the
 * server rendered document. Any `<script>` or `on*` handler it carries would
 * then be parsed and executed as a page script without the CSP nonce, and the
 * "strict-dynamic" policy blocks it. Stripping them keeps the svg renderable
 * and stops untrusted markup from running.
 *
 * @param       {String}        svg         The raw svg markup
 * @return      {String}                    The svg markup without executable content
 *
 * @snippet         sanitizeSvg($1)
 *
 * @example         js
 * import { sanitizeSvg } from '@blackbyte/sugar/html';
 * sanitizeSvg('<svg><script>alert(1)</script></svg>'); // => <svg></svg>
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function sanitizeSvg(svg: string): string {
  return svg.replace(SCRIPT_ELEMENT_RE, '').replace(TAG_RE, (tag) => {
    return tag.replace(EVENT_ATTRIBUTE_RE, '').replace(JAVASCRIPT_URL_RE, '');
  });
}
