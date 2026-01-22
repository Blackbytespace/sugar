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
export default function drawVideoToCanvas(
  $video: HTMLVideoElement,
  $canvas?: HTMLCanvasElement,
): HTMLCanvasElement {
  if (!$canvas) {
    $canvas = document.createElement('canvas');
  }

  // srt the canvas size
  $canvas.style.width = `${$video.videoWidth}px`;
  $canvas.style.aspectRatio = `${$video.offsetWidth}/${$video.offsetHeight}`;
  $canvas.style.maxWidth = '100%';

  // get the context 2d
  const ctx = $canvas.getContext('2d');

  // draw the video into canvas
  ctx?.drawImage(
    $video,
    0,
    0,
    $video.videoWidth,
    $video.videoHeight,
    0,
    0,
    $canvas.width,
    $canvas.height,
  );

  return $canvas;
}
