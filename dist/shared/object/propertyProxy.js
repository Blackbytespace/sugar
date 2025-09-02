// @ts-nocheck
export default function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
    // handle property like "something.cool"
    const objPath = property.split('.').slice(0, -1).join('.');
    if (objPath) {
        property = property.split('.').pop();
        obj = __get(obj, objPath);
    }
    // store the current value
    let val = __get(obj, property);
    const currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);
    // custom setter check
    const _set = (value) => {
        if (descriptor.set) {
            value = descriptor.set(value);
        }
        // descriptor
        if (currentDescriptor && currentDescriptor.set) {
            const ret = currentDescriptor.set(value);
            if (ret) {
                val = ret;
            }
            else {
                val = currentDescriptor.get();
            }
        }
        else {
            val = value;
        }
    };
    // apply the setter if needed
    if (applySetterAtStart)
        _set(val);
    // make sure we have the good descriptor
    const d = Object.getOwnPropertyDescriptor(obj, property);
    Object.defineProperty(obj, property, {
        get: () => {
            let _val = val;
            if (descriptor.get) {
                _val = descriptor.get(_val);
            }
            if (currentDescriptor && currentDescriptor.get) {
                _val = currentDescriptor.get();
            }
            return _val;
        },
        set: (v) => {
            // const oldValue = val;
            // internal set to use the good setter
            _set(v);
            // notify of new update
            // this.notify(objPath, val, oldValue);
        },
        configurable: descriptor.configurable !== undefined
            ? descriptor.configurable
            : currentDescriptor && currentDescriptor.configurable !== undefined
                ? currentDescriptor.configurable
                : false,
        enumarable: descriptor.enumarable !== undefined
            ? descriptor.enumarable
            : currentDescriptor && currentDescriptor.enumarable !== undefined
                ? currentDescriptor.enumarable
                : true,
        // writable : currentDescriptor && currentDescriptor.writable !== undefined ? currentDescriptor.writable : true
    });
    // return the value
    return val;
}
//# sourceMappingURL=propertyProxy.js.map