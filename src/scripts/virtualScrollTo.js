
export default function virtualScrollTo(x, y, remove, options = {}) {
  const w = x === 0 ? 0 : -1 * x;
  const h = remove ? 0 : y;

  const translate = remove ? 'none' : `translateX(${w}px)`;

  /*
   * value `options.scrollTarget` indicates that `wdio-screenshot` should move
   * an element inside DOM up instead of default `<html />`
   */
  let html = (options && options.scrollTarget)
    ? document.querySelector(options.scrollTarget)
    : document.documentElement;

    // Add some blank space after element (experimental)
    if (html.tagName == "HTML") {
      html.style.height = remove ? '' : 'auto';
    }
    html.style.paddingBottom  = remove ? '' : '100vh';

    // Scroll to pos (hybrid)
    // Width
    html.style.webkitTransform = translate;
    html.style.mozTransform = translate;
    html.style.msTransform = translate;
    html.style.oTransform = translate;
    html.style.transform = translate;

    // Height
    html.scrollLeft = 0;
    html.scrollTop = h;
}