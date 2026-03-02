/**
 * @name            whenVideoReady
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Wait until the passed video is ready to play.
 * It checks if the video metadata has been loaded, and if not it waits for the `loadedmetadata` event.
 *
 * @feature         Promise based API
 *
 * @param 		{HTMLVideoElement} 			$video  		The video to check the ready state
 * @return 		{Promise} 								    The promise that will be resolved when the video is ready to play
 *
 * @snippet         whenVideoReady($1)
 * whenVideoReady($1).then(\$video => {
 *   $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { whenVideoReady } from '@blackbyte/sugar/dom'
 * whenVideoReady($myCoolHTMLVideoElement).then(($video) => {
 *   // do something when the video is ready to play
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenVideoReady($video: HTMLVideoElement): Promise<HTMLVideoElement>;
