export type TSugarConsoleTypes = 'log' | 'warn' | 'info' | 'error' | 'trace' | 'debug' | 'all' | 'none';
export type TSugarConsoleSettings = {
    logger?: (logs: any[], type: TSugarConsoleTypes) => void;
    colors: Record<string, string | undefined>;
    types: TSugarConsoleTypes[];
};
export default class SugarConsole {
    static types: TSugarConsoleTypes[];
    static _defaultInstance: SugarConsole;
    static set default(sugarConsole: SugarConsole);
    static get default(): SugarConsole;
    static extendsNativeConsole(settings?: Partial<TSugarConsoleSettings>): void;
    settings: TSugarConsoleSettings;
    constructor(settings?: Partial<TSugarConsoleSettings>);
    isEnabled(type?: TSugarConsoleTypes): boolean;
    getEnabledTypes(): TSugarConsoleTypes[];
    private _processLogs;
    log(): void;
    warn(): void;
    info(): void;
    error(): void;
    trace(): void;
    debug(): void;
}
