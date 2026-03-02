import isPlainObject from '../is/isPlainObject.js';
import unquote from '../string/unquote.js';
import get from './get.js';
export default function set(obj, path, value, settings) {
    const finalSettings = Object.assign({ preferAssign: false }, (settings !== null && settings !== void 0 ? settings : {}));
    let o = obj, a;
    if (Array.isArray(path) && path.length === 1) {
        path = path[0];
    }
    if (typeof path === 'string') {
        if (!path || path === '' || path === '.') {
            Object.assign(obj, value);
            return;
        }
        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        a = unquote(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map((p) => unquote(p));
    }
    else if (Array.isArray(path)) {
        a = [...path];
    }
    while (a.length - 1) {
        const n = a.shift();
        if (!(n in o)) {
            if (typeof a[0] === 'string') {
                if (a[0].match(/^\[[0-9]+\]$/))
                    o[n] = [];
                else
                    o[n] = {};
            }
            else {
                o[n] = {};
            }
        }
        if (!o[n]) {
            o[n] = {};
        }
        o = o[n];
    }
    if (typeof a[0] === 'string' && a[0].match(/^\[[0-9]+\]$/)) {
        if (!Array.isArray(o)) {
            o = [];
        }
        o.push(value);
    }
    else {
        if (isPlainObject(o[a[0]]) &&
            isPlainObject(value) &&
            finalSettings.preferAssign) {
            // empty the current obj
            for (const key in o[a[0]]) {
                delete o[a[0]][key];
            }
            // assigning the new value
            Object.assign(o[a[0]], value);
        }
        else {
            o[a[0]] = value;
        }
    }
    return get(obj, path);
}
//# sourceMappingURL=set.js.map