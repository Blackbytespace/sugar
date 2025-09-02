export type TDeepProxyActionObj = {
    object: any;
    target: string;
    key: string;
    path: string;
    action: 'set' | 'get' | 'delete';
    fullAction: string;
    oldValue: any;
    value: any;
};
export type TDeepProxySettings = {
    deep: boolean;
    handleSet: boolean;
    handleGet: boolean;
    handleDelete: boolean;
    domElements: boolean;
};
export default function deepProxy(object: any, handlerFn: any, settings?: Partial<TDeepProxySettings>): any;
