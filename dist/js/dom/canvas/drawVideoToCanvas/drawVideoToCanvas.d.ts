/**
 * @name            drawVideoToCanvas
 * @namespace       js.dom.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Draw the current frame of a video into a canvas.
 *
 * @param    {HTMLVideoElement}               $video                  The video you want to draw into the canvas
 * @param    {HTMLCanvasElement}              [$canvas]               An optional canvas to draw into. If not provided, a new canvas will be created
 *
 * @snippet         drawVideoToCanvas($1)
 *
 * @todo        tests
 *
 * @example         js
 * import { drawVideoToCanvas } from '@blackbyte/sugar/js/dom';
 * const $canvas = drawVideoToCanvas($video);
 *
 * @since       1.0.0-beta.21
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function drawVideoToCanvas($video: HTMLVideoElement, $canvas?: HTMLCanvasElement): HTMLCanvasElement;
