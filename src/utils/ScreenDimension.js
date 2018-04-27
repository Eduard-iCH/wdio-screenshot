export default class ScreenDimensions {

  constructor(options, browser = {}, scrOpts = {}) {
    const { html, body, window } = options;
    const { isIOS } = browser;

    this.isIOS = isIOS;
    this.viewportWidth = window.innerWidth || html.clientWidth || 0;
    this.viewportHeight = window.innerHeight || html.clientHeight || 0;

    this.documentWidth = html.scrollWidth;
    this.documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    const screenMax = Math.max(window.screenWidth, window.screenHeight);
    const screenMin = Math.min(window.screenWidth, window.screenHeight);

    this.screenWidth = this.isLandscape() ? screenMax : screenMin;
    this.screenHeight = this.isLandscape() ? screenMin : screenMax;

    const innerMax = Math.max(window.innerWidth, window.innerHeight);
    const innerMin = Math.min(window.innerWidth, window.innerHeight);

    this.innerWidth = this.isLandscape() ? innerMax : innerMin;
    this.innerHeight = this.isLandscape() ? innerMin : innerMax;

    this.pixelRatio = window.pixelRatio;
    this.orientation = window.orientation;

    this.stepModWidth = (scrOpts.stepModWidth == null ? 1.0 : scrOpts.stepModWidth);
    this.stepModHeight = (scrOpts.stepModHeight == null ? 1.0 : scrOpts.stepModHeight);

    if (this.isIOS && this.isLandscape() && this.getViewportHeight() - 20 === this.getInnerHeight()) {
      // iOS 7 has a 20px bug in landscape mode
      this.viewportHeight = this.getInnerHeight();
    }

    if (this.isIOS && this.isLandscape() && this.getDocumentHeight() - 20 === this.getInnerHeight()) {
      // iOS 7 has a 20px bug in landscape mode
      this.documentHeight = this.getInnerHeight();
    }

  }

  getViewportWidth() {
    return Math.round(this.viewportWidth * this.stepModWidth); // TODO: very hacky way, need to find a better solution
  }

  getViewportHeight() {
    return Math.round(this.viewportHeight * this.stepModHeight); // TODO: very hacky way, need to find a better solution
  }

  isLandscape() {
    return this.getViewportWidth() > this.getViewportHeight();
  }

  getDocumentWidth() {
    return this.documentWidth;
  }

  getDocumentHeight() {
    return this.documentHeight;
  }

  getScreenWidth() {
    return this.screenWidth;
  }

  getScreenHeight() {
    return this.screenHeight;
  }

  getInnerWidth() {
    return this.innerWidth;
  }

  getInnerHeight() {
    return this.innerHeight;
  }

  getPixelRatio() {
    return this.pixelRatio;
  }

  getOrientation() {
    return this.orientation;
  }

  getScale() {
    if (this.isIOS) {
      return this.getScreenWidth() / this.getViewportWidth();
    }
    return 1;
  }

  applyScaleFactor(widthOrHeight) {
    return Math.round(widthOrHeight * this.getScale());
  }
}
