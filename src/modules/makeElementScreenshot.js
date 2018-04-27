import debug from 'debug';

import makeAreaScreenshot from './makeAreaScreenshot';
import beforeScreenshot from './beforeScreenshot';
import afterScreenshot from './afterScreenshot';

import groupBoundingRect from '../utils/groupBoundingRect';
import getBoundingRects from '../scripts/getBoundingRects';

const log = debug('wdio-screenshot:makeElementScreenshot');


export default async function makeElementScreenshot(browser, elementSelector, options = {}) {
  log('start element screenshot');

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);

  // get bounding rect of elements
  const boundingRects = await browser.selectorExecute(elementSelector, getBoundingRects);
  if (boundingRects == null || boundingRects.reduce == null)
    throw new Error('Cannot find any visible element by a given selector: ' + elementSelector);

  const boundingRect = groupBoundingRect(boundingRects);

  // make screenshot of area
  const exLeft    = (options.shiftAreaBy != null) ? options.shiftAreaBy[0] : 0;
  const exTop     = (options.shiftAreaBy != null) ? options.shiftAreaBy[1] : 0;
  const exRight   = (options.shiftAreaBy != null) ? options.shiftAreaBy[2] : 0;
  const exBottom  = (options.shiftAreaBy != null) ? options.shiftAreaBy[3] : 0;
  const scrollW   = (options.scrollWidth != null) ? options.scrollWidth : boundingRect.scrollWidth;
  const scrollH   = (options.scrollHeight != null) ? options.scrollHeight : boundingRect.scrollHeight;

  const left      = boundingRect.left + exLeft;
  const top       = boundingRect.top + exTop;
  const right     = ((options.scrollTarget == null) ? boundingRect.right : scrollW + boundingRect.left) + exRight;
  const bottom    = ((options.scrollTarget == null) ? boundingRect.bottom : scrollH + boundingRect.top) + exBottom;

  const base64Image = await makeAreaScreenshot(browser, left, top, right, bottom, options);

  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);

  log('end element screenshot');

  return base64Image;
}
