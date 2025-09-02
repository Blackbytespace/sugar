/**
 * @name            richText
 * @namespace       shared.faker
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          wip
 *
 * This function simply returns you a rich text content that you can use in your tests for example.
 *
 * @return      {DOMElement}                    The new element
 *
 * @snippet         \Sugar\dom\changeTagName(1,2);
 *
 * @example         php
 * print \Sugar\dom\changeTagName(element, 'a');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TRichTextSettings = {
    p?: boolean;
    ul?: boolean;
    ol?: boolean;
    dl?: boolean;
    strong?: boolean;
    em?: boolean;
    sup?: boolean;
    sub?: boolean;
    small?: boolean;
    code?: boolean;
    a?: boolean;
    blockquote?: boolean;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    h4?: boolean;
    h5?: boolean;
    h6?: boolean;
};
export default function richText(settings?: TRichTextSettings): string;
