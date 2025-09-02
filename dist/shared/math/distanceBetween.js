/**
 * @name 		            distanceBetween
 * @namespace           shared.math
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Get the distance between two points
 *
 * @param    {Point}    point1    The point 1, x and y value
 * @param    {Point}    point2    The point 2, x and y value
 * @return    {Number}    The distance between the two points
 *
 * @todo      tests
 *
 * @snippet         distanceBetween($1, $2)
 * distanceBetween({
 *      x: $1, y: $2
 * }, {
 *      x: $3, y: $4
 * })
 *
 * @example    js
 * import { distanceBetween } from '@blackbyte/sugar/geom'
 * distanceBetween({
 * 	x: 10, y: 20
 * }, {
 * 	x: 10, y: 30
 * }) // 10
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function distanceBetween(point1, point2) {
    let xs = 0;
    let ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
}
//# sourceMappingURL=distanceBetween.js.map