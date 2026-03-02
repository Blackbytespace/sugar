export default function ensureScriptExec(
  $script:
    | HTMLScriptElement
    | HTMLScriptElement[]
    | NodeListOf<HTMLScriptElement>,
): void {
  let $scripts: HTMLScriptElement[] = [];
  if ($script instanceof HTMLScriptElement) {
    $scripts = [$script];
  } else if ($script instanceof NodeList) {
    $scripts = Array.from($script).filter(
      (el) => el instanceof HTMLScriptElement,
    ) as HTMLScriptElement[];
  } else if (Array.isArray($script)) {
    $scripts = $script.filter(
      (el) => el instanceof HTMLScriptElement,
    ) as HTMLScriptElement[];
  }

  for (const $s of $scripts) {
    const newScriptEl = document.createElement('script');
    Array.from($s.attributes).forEach((attr) => {
      newScriptEl.setAttribute(attr.name, attr.value);
    });
    const scriptText = document.createTextNode($s.innerHTML);
    newScriptEl.appendChild(scriptText);
    $s.parentNode?.replaceChild(newScriptEl, $s);
  }
}
