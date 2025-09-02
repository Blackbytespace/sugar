import * as rematrix from 'rematrix';
export default function getTranslateProperties($elm) {
    if (!window.getComputedStyle)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const style = getComputedStyle($elm);
    const transform = style.transform ||
        style.webkitTransform ||
        // @ts-ignore
        style.mozTransform ||
        // @ts-ignore
        style.msTransform;
    if (!transform)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const matrix3d = rematrix.fromString(transform);
    return {
        x: matrix3d[12],
        y: matrix3d[13],
        z: matrix3d[14],
    };
}
//# sourceMappingURL=getTranslateProperties.js.map