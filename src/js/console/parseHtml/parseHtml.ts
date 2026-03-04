import replaceTags from '../../../shared/html/replaceTags/replaceTags.js';
import tagsMap from '../tagsmap/tagsmap.js';

/**
 * @name                      parseHtml
 * @namespace                 js.console
 * @type                      Function
 * @platform                  js
 * @status                    beta
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message           The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @snippet         parseHtml($1)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function parseHtml(
  message: string | string[],
): string | string[] {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = (message as string[]).map((m) => {
    return replaceTags(m, tagsMap);
  });

  if (isArray) return message;
  return message[0];
}
