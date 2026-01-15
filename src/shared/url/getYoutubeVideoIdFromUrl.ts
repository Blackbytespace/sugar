/**
 * @name                getYoutubeVideoIdFromUrl
 * @namespace           shared.url
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Return a YouTube video ID extracted from the given URL
 *
 * @param           {String}            url               The YouTube video URL
 * @return          {String|null}                      The extracted video ID or null if not found
 *
 * @todo            tests
 *
 * @snippet         getYoutubeVideoIdFromUrl($1)
 *
 * @example       js
 * import { getYoutubeVideoIdFromUrl } from '@blackbyte/sugar/url';
 * getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // dQw4w9WgXcQ
 *
 * @see             https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getYoutubeVideoIdFromUrl(url: string): string | null {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
}
