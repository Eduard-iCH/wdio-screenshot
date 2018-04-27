

export default function getBoundingRect(elems) {
  return elems.map((elem) => {
    const boundingRect = elem.getBoundingClientRect();
    return {
      top: boundingRect.top,
      right: boundingRect.right,
      bottom: boundingRect.bottom,
      left: boundingRect.left,
      height: boundingRect.height,
      width: boundingRect.width,
      scrollHeight: elem.scrollHeight,
      scrollWidth: elem.scrollWidth,
    };
  });
}
