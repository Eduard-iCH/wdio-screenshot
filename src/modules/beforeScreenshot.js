import debug from 'debug';

import scroll from '../scripts/scroll';
import scrollbars from '../scripts/scrollbars';
import modifyElements from '../scripts/modifyElements';
import triggerResize from '../scripts/triggerResize';

const log = debug('wdio-screenshot:beforeScreenshot');

export default async function beforeScreenshot(browser, options = {}) {
  // hide scrollbars
  log('hide scrollbars');
  await browser.execute(scrollbars, false, options.scrollbarsHideForElem);

  log('trigger resize event to allow js components to resize properly');
  await browser.execute(triggerResize);

  // hide elements (occupies space, you don't see it but you can not click on elements behind it)
  if (Array.isArray(options.hide) && options.hide.length) {
    log('hide the following elements: %s', options.hide.join(', '));
    await browser.selectorExecute(options.hide, modifyElements, 'opacity', '0');
  }

  // remove elements (occupies no space, ignored while rendering (acts like if element is not there at all))
  if (Array.isArray(options.remove) && options.remove.length) {
    log('remove the following elements: %s', options.remove.join(', '));
    await browser.selectorExecute(options.remove, modifyElements, 'display', 'none');
  }

  // remove elements from visibles (occupies space and you can click on element behind it)
  if (Array.isArray(options.invis) && options.invis.length) {
    log('remove the following elements: %s', options.invis.join(', '));
    await browser.selectorExecute(options.invis, modifyElements, 'visibility', 'hidden');
  }

  // scroll back to start
  const x  = 0;
  const y = 0;
  log('scroll back to start x: %s, y: %s', x, y);
  await browser.execute(scroll, x, y);

  // wait a bit for browser render
  const pause = 200;
  log('wait %s ms for browser render', pause);
  await browser.pause(pause);
}
