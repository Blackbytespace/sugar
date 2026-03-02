import { faker } from '@faker-js/faker';

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

export default function richText(settings?: TRichTextSettings): string {
  const str: string[] = [];

  const finalSettings = {
    p: faker.datatype.boolean(),
    ul: faker.datatype.boolean(),
    ol: faker.datatype.boolean(),
    dl: faker.datatype.boolean(),
    strong: faker.datatype.boolean(),
    em: faker.datatype.boolean(),
    sup: faker.datatype.boolean(),
    sub: faker.datatype.boolean(),
    small: faker.datatype.boolean(),
    code: faker.datatype.boolean(),
    a: faker.datatype.boolean(),
    blockquote: faker.datatype.boolean(),
    h1: faker.datatype.boolean(),
    h2: faker.datatype.boolean(),
    h3: faker.datatype.boolean(),
    h4: faker.datatype.boolean(),
    h5: faker.datatype.boolean(),
    h6: faker.datatype.boolean(),
    ...(settings ?? {}),
  };

  if (finalSettings.h1) {
    str.push('<h1>I am an H1 heading</h1>');
  }

  if (finalSettings.h2) {
    str.push('<h2>I am an H2 heading</h2>');
  }

  if (finalSettings.h3) {
    str.push('<h3>I am an H3 heading</h3>');
  }

  if (finalSettings.h4) {
    str.push('<h4>I am an H4 heading</h4>');
  }

  if (finalSettings.h5) {
    str.push('<h5>I am an H5 heading</h5>');
  }

  if (finalSettings.h6) {
    str.push('<h6>I am an H6 heading</h6>');
  }

  if (finalSettings.p) {
    for (let i = 0; i < Math.round(Math.random() * 5); i++) {
      str.push(
        `<p>${faker.lorem.paragraph({
          min: 1,
          max: 3,
        })}</p>`,
      );
    }
  }

  if (finalSettings.ul) {
    function _ul(level = 0) {
      const ul: string[] = [];
      ul.push('<ul>');

      for (let i = 0; i < Math.round(Math.random() * 5); i++) {
        ul.push('<li>');

        ul.push(
          faker.lorem.sentence({
            min: 1,
            max: 3,
          }),
        );

        if (faker.datatype.boolean() && level === 0) {
          ul.push(_ul(level + 1));
        }

        ul.push('</li>');
      }
      ul.push('</ul>');

      return ul.join('\n');
    }
    str.push(_ul());
  }

  if (finalSettings.ol) {
    function _ol(level = 0) {
      const ol: string[] = [];
      ol.push('<ol>');
      for (let i = 0; i < Math.round(Math.random() * 5); i++) {
        ol.push('<li>');

        ol.push(
          faker.lorem.sentence({
            min: 1,
            max: 3,
          }),
        );

        if (faker.datatype.boolean() && level === 0) {
          ol.push(_ol(level + 1));
        }
        ol.push('</li>');
      }
      ol.push('</ol>');
      return ol.join('\n');
    }
    str.push(_ol());
  }

  if (finalSettings.dl) {
    function _dl(level = 0) {
      const dl: string[] = [];
      dl.push('<dl>');
      for (let i = 0; i < Math.round(Math.random() * 5); i++) {
        dl.push('<dt>');

        dl.push(
          faker.lorem.sentence({
            min: 1,
            max: 3,
          }),
        );

        dl.push('</dt>');
        dl.push('<dd>');
        dl.push(
          faker.lorem.sentence({
            min: 1,
            max: 3,
          }),
        );

        if (faker.datatype.boolean() && level === 0) {
          dl.push(_dl(level + 1));
        }

        dl.push('</dd>');
      }
      dl.push('</dl>');
      return dl.join('\n');
    }
    str.push(_dl());
  }

  if (finalSettings.strong) {
    str.push('<p>I am a <strong>strong</strong> example</p>');
  }

  if (finalSettings.em) {
    str.push('<p>I am an <em>emphasized</em> example</p>');
  }

  if (finalSettings.sup) {
    str.push('<p>I am a <sup>superscript</sup> example</p>');
  }

  if (finalSettings.sub) {
    str.push('<p>I am a <sub>subscript</sub> example</p>');
  }

  if (finalSettings.small) {
    str.push('<p>I am a <small>small</small> example</p>');
  }

  if (finalSettings.code) {
    str.push('<p>I am a <code>code</code> example</p>');
  }

  if (finalSettings.a) {
    str.push(`<p>I am a <a href="${faker.lorem.slug}">link</a> example</p>`);
  }

  if (finalSettings.blockquote) {
    str.push(
      `<blockquote>${faker.lorem.sentence({
        min: 1,
        max: 3,
      })}</blockquote>`,
    );
  }

  return str.join('\n');
}
