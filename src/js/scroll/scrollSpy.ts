/**
 * @name            scrollSpy
 * @namespace       js.scroll
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to add/remove automatically the `-active` class on
 * some passed links that have a `href` attribute that points to an element on the page.
 *
 * @param           {TScrollSpySettings}          [settings={}]           The settings you want to override
 *
 * @setting        {number}        [offset=window.innerHeight/2]        The offset you want before adding the classes
 * @setting        {string}        [activeClass=-active]        The class name you want to add/remove
 *
 * @snippet          scrollSpy($1);
 *
 * @example         js
 * import { scrollSpy } from '@blackbyte/sugar/scroll';
 * scrollSpy($myLinks);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TScrollSpySettings = {
  offset?: number;
  activeClass?: string;
};

export default function scrollSpy(
  $links: NodeListOf<HTMLAnchorElement>,
  settings?: TScrollSpySettings,
): void {
  const finalSettings = {
    offset: window.innerHeight / 2,
    activeClass: '-active',
    ...(settings ?? {}),
  };

  const reversedLinks = Array.from($links).reverse(),
    targets = new WeakMap();

  for (let [i, $link] of reversedLinks.entries()) {
    const $elm = document.querySelector($link.getAttribute('href') as string);
    targets.set($link, $elm as HTMLElement);
  }

  function handleScroll() {
    let found = false;
    for (let [i, $link] of reversedLinks.entries()) {
      const $target = targets.get($link),
        bound = $target.getBoundingClientRect();

      if (found) {
        $link.classList.remove(finalSettings.activeClass);
        continue;
      }

      if (bound.top <= finalSettings.offset) {
        $link.classList.add(finalSettings.activeClass);
        found = true;
      } else {
        $link.classList.remove(finalSettings.activeClass);
      }
    }
  }

  document.addEventListener('scroll', () => {
    handleScroll();
  });
}
