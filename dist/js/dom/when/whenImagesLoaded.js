import whenImageLoaded from './whenImageLoaded.js';
/**
 * @name            whenImagesLoaded
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect when some images are loaded. This function take advantage of the SPromise class
 * and trigger an event called "img.loaded" that will be triggered on each loaded images and another called "loaded" once all the images are loaded.
 * See in the example bellow.
 *
 * @feature       Promise based API
 *
 * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
 * @return    {Promise}    A promise resolved when all images are loaded properly
 *
 * @snippet         whenImagesLoaded($1)
 * whenImagesLoaded($1).then(imgs => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenImagesLoaded } from '@blackbyte/sugar/dom'
 * whenImagesLoaded([
 * 	$img1, $img2, $img3
 * ]).on('loaded', $img => {
 *    // do something with the loaded image
 * }).then(imgs => {
 *   // do something here
 * })
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenImagesLoaded($imgs) {
    return new Promise((resolve, reject) => {
        const promises = [], loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            const pro = whenImageLoaded($img);
            pro
                .then((_$img) => {
                loadedImages.push(_$img);
                if (loadedImages.length === $imgs.length) {
                    resolve(loadedImages);
                }
            })
                .catch((error) => {
                reject(error);
            }),
                promises.push(pro);
        });
    });
}
//# sourceMappingURL=whenImagesLoaded.js.map