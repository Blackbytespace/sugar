import { __parseHtml } from '@blackbyte/sugar/console';
let _isOverrided = false, nativeConsoleFn;
class SugarConsole {
    static set default(sugarConsole) {
        SugarConsole._defaultInstance = sugarConsole;
    }
    static get default() {
        if (!SugarConsole._defaultInstance) {
            throw new Error('Default SugarConsole is not initialized. To do so, make sure to call SugarConsole.extendsNativeConsole()');
        }
        return this._defaultInstance;
    }
    static extendsNativeConsole(settings) {
        if (_isOverrided) {
            return;
        }
        _isOverrided = true;
        nativeConsoleFn = {
            log: console.log,
            warn: console.warn,
            info: console.info,
            error: console.error,
            trace: console.trace,
            debug: console.debug,
        };
        const sugarConsole = new SugarConsole(Object.assign({ logger(logs, type) {
                // Put your extension code here
                nativeConsoleFn[type].apply(console, logs);
            } }, (settings !== null && settings !== void 0 ? settings : {})));
        console.log = sugarConsole.log.bind(sugarConsole);
        console.warn = sugarConsole.warn.bind(sugarConsole);
        console.info = sugarConsole.info.bind(sugarConsole);
        // console.error = sugarConsole.error.bind(sugarConsole)
        console.trace = sugarConsole.trace.bind(sugarConsole);
        console.debug = sugarConsole.debug.bind(sugarConsole);
        // expose sugarConsole globally
        SugarConsole._defaultInstance = sugarConsole;
    }
    constructor(settings) {
        this.settings = Object.assign({ colors: {
                log: undefined,
                warn: 'yellow',
                info: 'cyan',
                error: 'red',
                trace: undefined,
                debug: 'blue',
            }, types: SugarConsole.types }, (settings !== null && settings !== void 0 ? settings : {}));
        if (typeof this.settings.types === 'string') {
            // @ts-ignore
            this.settings.types = this.settings.types.split(',').map((t) => t.trim());
        }
        else if (this.settings.types === undefined) {
            this.settings.types = SugarConsole.types;
        }
        // make sure the passed compression are supported
        for (let [i, type] of this.settings.types.entries()) {
            if (type === 'all' || type === 'none') {
                continue;
            }
            if (!SugarConsole.types.includes(type)) {
                nativeConsoleFn.error(__parseHtml(`Unsupported console type: <magenta>${type}</magenta>. Available types: <green>${SugarConsole.types.join(',')}</green>`));
            }
        }
    }
    isEnabled(type) {
        if (type === undefined) {
            return (this.settings.types.length > 0 && !this.settings.types.includes('none'));
        }
        if (type === 'none') {
            return false;
        }
        if (type === 'all') {
            return true;
        }
        const enabledTypes = this.getEnabledTypes();
        return enabledTypes.includes(type);
    }
    getEnabledTypes() {
        if (this.settings.types.includes('all')) {
            return SugarConsole.types;
        }
        else if (this.settings.types.includes('none')) {
            return [];
        }
        else if (typeof this.settings.types === 'string') {
            return (this.settings.types
                // @ts-ignore
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t !== 'all' && t !== 'none'));
        }
        return this.settings.types;
    }
    _processLogs(logs) {
        var _a, _b, _c, _d, _e;
        const method = logs.shift();
        if (!this.settings.types.includes('all') &&
            !this.settings.types.includes(method)) {
            return [];
        }
        const finalLogs = [];
        for (let [i, log] of logs.entries()) {
            // string display
            if (typeof log === 'string') {
                if (!log.trim()) {
                    continue;
                }
                if (method === 'log' || i > 0) {
                    finalLogs.push(__parseHtml(`${i === 0 ? '▊' : ''} ${log}`));
                    continue;
                }
                if ((_a = this.settings.colors) === null || _a === void 0 ? void 0 : _a[method]) {
                    finalLogs.push(__parseHtml(`<${(_c = (_b = this.settings) === null || _b === void 0 ? void 0 : _b.colors) === null || _c === void 0 ? void 0 : _c[method]}>${i === 0 ? '▊' : ''}</${(_e = (_d = this.settings) === null || _d === void 0 ? void 0 : _d.colors) === null || _e === void 0 ? void 0 : _e[method]}> ${log}`));
                }
                else {
                    finalLogs.push(__parseHtml(`${i === 0 ? '▊' : ''} ${log}`));
                }
                continue;
            }
            // other
            finalLogs.push(log);
        }
        return finalLogs;
    }
    log() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['log', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'log');
    }
    warn() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['warn', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'warn');
    }
    info() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['info', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'info');
    }
    error() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['error', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'error');
    }
    trace() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['trace', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'trace');
    }
    debug() {
        var _a, _b;
        const args = Array.prototype.slice.call(arguments);
        const finalArgs = ['debug', ...args];
        const finalLogs = this._processLogs(finalArgs);
        (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, finalLogs, 'debug');
    }
}
SugarConsole.types = [
    'log',
    'warn',
    'info',
    'error',
    'trace',
    'debug',
];
export default SugarConsole;
//# sourceMappingURL=SugarConsole.js.map