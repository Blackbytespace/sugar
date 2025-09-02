import positionFromEvent from '../position/positionFromEvent.js';
export default function onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const { x, y } = positionFromEvent(e);
        const deltaX = x - startPos.x, deltaY = y - startPos.y, time = Date.now() - lastCapturedTime;
        const secondPercentage = (100 / 1000) * time;
        const lastTrackPoint = track[track.length - 1];
        const lastDeltaX = x - lastTrackPoint.x, lastDeltaY = y - lastTrackPoint.y;
        let speedX = lastDeltaX / time || 0, speedY = lastDeltaY / time || 0;
        if (Math.abs(speedX) > finalSettings.maxSpeed) {
            speedX = finalSettings.maxSpeed * (speedX < 0 ? -1 : 1);
        }
        if (Math.abs(speedY) > finalSettings.maxSpeed) {
            speedY = finalSettings.maxSpeed * (speedY < 0 ? -1 : 1);
        }
        const point = {
            x,
            y,
            deltaX,
            deltaY,
            speedX: (lastDeltaX / secondPercentage) * 100,
            speedY: (lastDeltaY / secondPercentage) * 100,
        };
        return point;
    }
    function down(e) {
        if (e.target !== $elm && !$elm.contains(e.target))
            return;
        $target = e.target;
        const { x, y } = positionFromEvent(e);
        // set the start position
        startPos = {
            x,
            y,
        };
        // set the first tracked point
        track = [
            {
                x: startPos.x,
                y: startPos.y,
                deltaX: 0,
                deltaY: 0,
                speedX: 0,
                speedY: 0,
            },
        ];
        lastCapturedTime = Date.now();
        // update status
        isMouseDown = true;
    }
    document.addEventListener('mousedown', down);
    document.addEventListener('touchstart', down);
    function move(e) {
        if (!isMouseDown)
            return;
        // if first point tracked, trigger the "start" event
        if (track.length === 1) {
            cb === null || cb === void 0 ? void 0 : cb({
                type: 'start',
                track: track[0],
            });
        }
        $target.style.pointerEvents = 'none';
        const point = buildTrackPoint(e);
        track.push(point);
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'track' }, point), { track }));
        lastCapturedTime = Date.now();
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    function up(e) {
        if (!isMouseDown)
            return;
        $target.style.pointerEvents = 'unset';
        // update status
        isMouseDown = false;
        // callback if moved
        if (track.length > 1) {
            cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'end' }, track[track.length - 1]), { track }));
        }
    }
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
}
//# sourceMappingURL=onDrag.js.map