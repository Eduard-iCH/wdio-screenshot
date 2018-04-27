

export default function groupBoundingRect(boundingRects) {
  return boundingRects.reduce((groupedBoundingRect, boundingRect ) => {
    if (typeof groupedBoundingRect.top === 'undefined' || groupedBoundingRect.top > boundingRect.top) {
      groupedBoundingRect.top = boundingRect.top;
    }

    if (typeof groupedBoundingRect.right === 'undefined' || groupedBoundingRect.right < boundingRect.right) {
      groupedBoundingRect.right = boundingRect.right;
    }

    if (typeof groupedBoundingRect.bottom === 'undefined' || groupedBoundingRect.bottom < boundingRect.bottom) {
      groupedBoundingRect.bottom = boundingRect.bottom;
    }

    if (typeof groupedBoundingRect.left === 'undefined' || groupedBoundingRect.left > boundingRect.left) {
      groupedBoundingRect.left = boundingRect.left;
    }

    if (typeof groupedBoundingRect.height === 'undefined' || groupedBoundingRect.height > boundingRect.height) {
      groupedBoundingRect.height = boundingRect.height;
    }
   
    if (typeof groupedBoundingRect.width === 'undefined' || groupedBoundingRect.width > boundingRect.width) {
      groupedBoundingRect.width = boundingRect.width;
    }
    
    if (typeof groupedBoundingRect.scrollHeight === 'undefined' || groupedBoundingRect.scrollHeight > boundingRect.scrollHeight) {
      groupedBoundingRect.scrollHeight = boundingRect.scrollHeight;
    }
    
    if (typeof groupedBoundingRect.scrollWidth === 'undefined' || groupedBoundingRect.scrollWidth > boundingRect.scrollWidth) {
      groupedBoundingRect.scrollWidth = boundingRect.scrollWidth;
    } 

    return groupedBoundingRect;
  }, {});
}
