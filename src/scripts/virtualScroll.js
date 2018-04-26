
export default function virtualScroll(x, y, remove, options) {
  const w = x === 0 ? 0 : -1 * x;
  const h = y === 0 ? 0 : -1 * y;

  const translate = remove ? 'none' : `translate(${w}px,${h}px)`;

  /*
   * value `options.scrollTarget` indicates that `wdio-screenshot` should move
   * an element inside DOM up instead of default `<html />`
   */
  let html = options && options.scrollTarget
    ? document.querySelector(options.scrollTarget)
    : document.documentElement;

  html.style.webkitTransform = translate;
  html.style.mozTransform = translate;
  html.style.msTransform = translate;
  html.style.oTransform = translate;
  html.style.transform = translate;
}
