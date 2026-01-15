/**
 * @name                getVimeoVideoIdFromUrl
 * @namespace           shared.url
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Return a Vimeo video ID extracted from the given URL
 *
 * @param           {String}            url               The Vimeo video URL
 * @return          {String|null}                      The extracted video ID or null if not found
 *
 * @todo            tests
 *
 * @snippet         getVimeoVideoIdFromUrl($1)
 *
 * @example       js
 * import { getVimeoVideoIdFromUrl } from '@blackbyte/sugar/url';
 * getVimeoVideoIdFromUrl('https://vimeo.com/123456789'); // 123456789
 *
 * @see             https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getVimeoVideoIdFromUrl(url: string): string | null {
  const regex =
    /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
  const match = url.match(regex);
  if (!match?.[0]) {
    return null;
  }
  return match[5] as string;
}
