export default function scrollSpy($links, settings) {
    const finalSettings = Object.assign({ offset: window.innerHeight / 2, activeClass: '-active' }, (settings !== null && settings !== void 0 ? settings : {}));
    const reversedLinks = Array.from($links).reverse(), targets = new WeakMap();
    for (let [i, $link] of reversedLinks.entries()) {
        const $elm = document.querySelector($link.getAttribute('href'));
        targets.set($link, $elm);
    }
    function handleScroll() {
        let found = false;
        for (let [i, $link] of reversedLinks.entries()) {
            const $target = targets.get($link), bound = $target.getBoundingClientRect();
            if (found) {
                $link.classList.remove(finalSettings.activeClass);
                continue;
            }
            if (bound.top <= finalSettings.offset) {
                $link.classList.add(finalSettings.activeClass);
                found = true;
            }
            else {
                $link.classList.remove(finalSettings.activeClass);
            }
        }
    }
    document.addEventListener('scroll', () => {
        handleScroll();
    });
}
//# sourceMappingURL=scrollSpy.js.map