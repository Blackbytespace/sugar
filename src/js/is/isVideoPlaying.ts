/**
 * @name            isVideoPlaying
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to know if a video is currently playing or not
 *
 * @param       {HTMLVideoElement}      video       The video element to check
 *
 * @return    {Boolean}    true if the video is playing, false if not
 *
 * @todo      tests
 *
 * @snippet         isVideoPlaying($1)
 *
 * @example 	js
 * import { isVideoPlaying } from '@blackbyte/sugar/is'
 * if (isVideoPlaying($myVideo)) {
 *   // do something cool...
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isVideoPlaying($video: HTMLVideoElement): boolean {
  return !!(
    $video.currentTime > 0 &&
    !$video.paused &&
    !$video.ended &&
    $video.readyState > 2
  );
}
