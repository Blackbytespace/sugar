import easeInOutQuart from '../easing/easeInOutQuart.js';
export default function easeInterval(duration, cb, settings = {}) {
    let cleared = false, animationFrame;
    const pro = new Promise((resolve) => {
        settings = Object.assign({ interval: 1000 / 25, easing: easeInOutQuart, from: 0, to: 100, onEnd: undefined }, settings);
        const startTime = Date.now();
        function animate() {
            var _a;
            if (cleared)
                return;
            const percent = (100 / duration) * (Date.now() - startTime);
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            cb(easedPercent);
            if (percent < 100) {
                if (cleared)
                    return;
                animationFrame = requestAnimationFrame(animate);
            }
            else {
                (_a = settings.onEnd) === null || _a === void 0 ? void 0 : _a.call(settings);
                resolve(easedPercent);
            }
        }
        animate();
    });
    // @ts-ignore
    pro.cancel = () => {
        cleared = true;
        cancelAnimationFrame(animationFrame);
    };
    return pro;
}
//# sourceMappingURL=easeInterval.js.map