import { uniqid } from '@blackbyte/sugar/string';
let _escapeQueue = [];
const _escapeQueueMap = new WeakMap();
let _isEscaping = false;
class CancelablePromise extends Promise {
    cancel() { }
}
export function escapeQueueLength() {
    return _escapeQueue.length;
}
export default function escapeQueue(callback, settings) {
    // create the queue item before the Promise constructor so cancel() can
    // reference it synchronously
    const finalSettings = Object.assign({ ctx: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // @ts-ignore
    const roots = Array.isArray(finalSettings.ctx)
        ? finalSettings.ctx
        : [finalSettings.ctx];
    roots.forEach(($root) => {
        // make sure we only register 1 listener per ctx
        if (_escapeQueueMap.has($root))
            return;
        _escapeQueueMap.set($root, true);
        $root.addEventListener('keydown', (e) => {
            var _a;
            if (e.key !== 'Escape' || !_escapeQueue.length || _isEscaping) {
                return;
            }
            // make sure to not escape multiple times at once
            _isEscaping = true;
            setTimeout(() => {
                _isEscaping = false;
            });
            const queueItem = _escapeQueue.pop();
            (_a = queueItem.callback) === null || _a === void 0 ? void 0 : _a.call(queueItem);
            queueItem.resolve();
        });
    });
    let queueItem;
    const pro = new CancelablePromise((resolve) => {
        var _a;
        // create the queue item to register
        queueItem = {
            id: (_a = finalSettings.id) !== null && _a !== void 0 ? _a : uniqid(),
            callback,
            resolve,
        };
        if (finalSettings.id) {
            const existing = (_escapeQueue.find((i) => i.id === finalSettings.id));
            if (existing) {
                existing.callback = callback;
                existing.resolve = resolve;
            }
            else {
                _escapeQueue.push(queueItem);
            }
        }
        else {
            // add to the queue
            _escapeQueue.push(queueItem);
        }
    });
    // assign cancel() synchronously — no setTimeout needed
    pro.cancel = () => {
        _escapeQueue = _escapeQueue.filter((i) => i.id !== queueItem.id);
    };
    return pro;
}
//# sourceMappingURL=escapeQueue.js.map