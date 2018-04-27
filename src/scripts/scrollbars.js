export default function scrollbars(enabled, targetElem) {
  let html = (targetElem != null ? document.querySelector(targetElem) : document.documentElement);

  if (enabled) {
    html.style.overflow = '';
  } else {
    html.style.overflow = 'hidden';
  }
}
