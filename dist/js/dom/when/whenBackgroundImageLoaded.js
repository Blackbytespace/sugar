import unquote from '../../../shared/string/unquote.js';
import getStyleProperty from '../style/getStyleProperty.js';
import whenImageLoaded from './whenImageLoaded.js';
/**
 * @name            whenBackgroundImageLoaded
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @snippet         whenBackgroundImageLoaded($1)
 * whenBackgroundImageLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenBackgroundImageLoaded } from '@blackbyte/sugar/dom'
 *
 * // using promise
 * await whenBackgroundImageLoaded($elm);
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenBackgroundImageLoaded($elm) {
    let isCancelled = false, $img;
    const promise = new Promise((resolve, reject) => {
        // get the background-image property from computed style
        const backgroundImage = getStyleProperty($elm, 'background-image');
        const matches = backgroundImage.match(/.*url\((.*)\).*/);
        if (!matches || !matches[1]) {
            reject('No background image url found...');
            return;
        }
        // process url
        const url = unquote(matches[1]);
        // make a new image with the image set
        $img = new Image();
        $img.src = url;
        // return the promise of image loaded
        whenImageLoaded($img).then(() => {
            if (!isCancelled) {
                resolve($elm);
            }
        });
    });
    promise.finally(() => {
        isCancelled = true;
    });
    return promise;
}
//# sourceMappingURL=whenBackgroundImageLoaded.js.map