import * as rematrix from 'rematrix';
export default function getScaleProperty($elm) {
    if (!window.getComputedStyle)
        return;
    const style = getComputedStyle($elm);
    const transform = style.transform ||
        style.webkitTransform ||
        // @ts-ignore
        style.mozTransform ||
        // @ts-ignore
        style.msTransform;
    if (!transform || transform === 'none')
        return;
    // fromString returns a Matrix3D (array of 16 numbers)
    // scaleX is at index 0, scaleY is at index 5
    const matrixArray = rematrix.fromString(transform);
    return {
        x: matrixArray[0],
        y: matrixArray[5],
        z: 1,
    };
}
//# sourceMappingURL=getScaleProperty.js.map