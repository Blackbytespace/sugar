import { __parseHtml } from '@blackbyte/sugar/console';

let _isOverrided = false,
  nativeConsoleFn: any;

export type TSugarConsoleTypes =
  | 'log'
  | 'warn'
  | 'info'
  | 'error'
  | 'trace'
  | 'debug'
  | 'all'
  | 'none';

export type TSugarConsoleSettings = {
  logger?: (logs: any[], type: TSugarConsoleTypes) => void;
  colors: Record<string, string | undefined>;
  types: TSugarConsoleTypes[];
};

export default class SugarConsole {
  static types: TSugarConsoleTypes[] = [
    'log',
    'warn',
    'info',
    'error',
    'trace',
    'debug',
  ];

  static _defaultInstance: SugarConsole;
  static set default(sugarConsole: SugarConsole) {
    SugarConsole._defaultInstance = sugarConsole;
  }
  static get default(): SugarConsole {
    if (!SugarConsole._defaultInstance) {
      throw new Error(
        'Default SugarConsole is not initialized. To do so, make sure to call SugarConsole.extendsNativeConsole()',
      );
    }
    return this._defaultInstance;
  }

  static extendsNativeConsole(settings?: Partial<TSugarConsoleSettings>) {
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

    const sugarConsole = new SugarConsole({
      logger(logs, type) {
        // Put your extension code here
        nativeConsoleFn[type].apply(console, logs);
      },
      ...(settings ?? {}),
    });
    console.log = sugarConsole.log.bind(sugarConsole);
    console.warn = sugarConsole.warn.bind(sugarConsole);
    console.info = sugarConsole.info.bind(sugarConsole);
    // console.error = sugarConsole.error.bind(sugarConsole)
    console.trace = sugarConsole.trace.bind(sugarConsole);
    console.debug = sugarConsole.debug.bind(sugarConsole);

    // expose sugarConsole globally
    SugarConsole._defaultInstance = sugarConsole;
  }

  settings: TSugarConsoleSettings;

  constructor(settings?: Partial<TSugarConsoleSettings>) {
    this.settings = {
      colors: {
        log: undefined,
        warn: 'yellow',
        info: 'cyan',
        error: 'red',
        trace: undefined,
        debug: 'blue',
      },
      types: SugarConsole.types,
      ...(settings ?? {}),
    };
    if (typeof this.settings.types === 'string') {
      // @ts-ignore
      this.settings.types = this.settings.types.split(',').map((t) => t.trim());
    } else if (this.settings.types === undefined) {
      this.settings.types = SugarConsole.types;
    }

    // make sure the passed compression are supported
    for (let [i, type] of this.settings.types.entries()) {
      if (type === 'all' || type === 'none') {
        continue;
      }
      if (!SugarConsole.types.includes(type)) {
        nativeConsoleFn.error(
          __parseHtml(
            `Unsupported console type: <magenta>${type}</magenta>. Available types: <green>${SugarConsole.types.join(
              ',',
            )}</green>`,
          ),
        );
      }
    }
  }

  public isEnabled(type?: TSugarConsoleTypes): boolean {
    if (type === undefined) {
      return (
        this.settings.types.length > 0 && !this.settings.types.includes('none')
      );
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

  public getEnabledTypes(): TSugarConsoleTypes[] {
    if (this.settings.types.includes('all')) {
      return SugarConsole.types;
    } else if (this.settings.types.includes('none')) {
      return [];
    } else if (typeof this.settings.types === 'string') {
      return (
        this.settings.types
          // @ts-ignore
          .split(',')
          .map((t: string) => t.trim())
          .filter((t: string) => t !== 'all' && t !== 'none')
      );
    }
    return this.settings.types;
  }

  private _processLogs(logs: any[]): any[] {
    const method = logs.shift();

    if (
      !this.settings.types.includes('all') &&
      !this.settings.types.includes(method)
    ) {
      return [];
    }

    const finalLogs: any[] = [];

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

        if (this.settings.colors?.[method]) {
          finalLogs.push(
            __parseHtml(
              `<${this.settings?.colors?.[method]}>${i === 0 ? '▊' : ''}</${
                this.settings?.colors?.[method]
              }> ${log}`,
            ),
          );
        } else {
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
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['log', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'log');
  }

  warn() {
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['warn', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'warn');
  }

  info() {
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['info', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'info');
  }

  error() {
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['error', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'error');
  }

  trace() {
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['trace', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'trace');
  }

  debug() {
    const args = Array.prototype.slice.call(arguments);
    const finalArgs = ['debug', ...args];
    const finalLogs = this._processLogs(finalArgs);
    this.settings?.logger?.(finalLogs, 'debug');
  }
}
