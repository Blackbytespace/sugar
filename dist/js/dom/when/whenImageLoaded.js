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
export default function whenImageLoaded($img) {
    let imgLoadedHandler, imgErrorHandler;
    const pro = new Promise((resolve, reject) => {
        // check if image is already loaded
        if ($img.hasAttribute('src') && $img.complete) {
            // resolve promise
            resolve($img);
        }
        else {
            // wait until loaded
            imgLoadedHandler = (e) => {
                // resolve the promise
                resolve($img);
            };
            $img.addEventListener('load', imgLoadedHandler);
            // listen for error
            imgErrorHandler = (e) => {
                // reject
                reject(e);
            };
            $img.addEventListener('error', imgErrorHandler);
        }
    });
    pro.finally(() => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
//# sourceMappingURL=whenImageLoaded.js.map