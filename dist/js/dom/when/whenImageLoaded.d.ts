/**
 * @name            whenImageLoaded
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Wait until the passed image is fully loaded
 *
 * @feature         Promise based API
 *
 * @param 		{HTMLImageElement} 			$img  		The image to check the loading state
 * @return 		{SPromise} 								The promise that will be resolved when all the images are correctly loaded
 *
 * @snippet         whenImageLoaded($1)
 * whenImageLoaded($1).then(\$img => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { whenImageLoaded } from '@blackbyte/sugar/dom'
 *  whenImageLoaded(myCoolHTMLImageElement).then(($img) => {
 * 		// do something when the image is loaded
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenImageLoaded($img: HTMLImageElement): Promise<HTMLImageElement>;
