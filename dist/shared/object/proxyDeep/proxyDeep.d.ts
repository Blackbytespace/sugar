export type TProxyDeepActionObj = {
    object: any;
    target: string;
    key: string;
    path: string;
    action: 'set' | 'get' | 'delete';
    fullAction: string;
    oldValue: any;
    value: any;
};
export type TProxyDeepSettings = {
    deep: boolean;
    handleSet: boolean;
    handleGet: boolean;
    handleDelete: boolean;
    domElements: boolean;
};
export default function proxyDeep(object: any, handlerFn: any, settings?: Partial<TProxyDeepSettings>): any;
