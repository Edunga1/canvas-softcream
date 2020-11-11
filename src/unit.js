export default class Unit {
  constructor() {
    this._startAt = new Date();
    this._animationProgress = 0;
    this.animationTime = 2000;
    this.canvasWidth = 0;
    this.canvasHeigh = 0;
    this.x = 0;
    this.y = 0;
  }

  /** 0 to 1. 1 means 100% progress */
  get animationProgress() {
    return this._animationProgress;
  }

  get isAnimationDone() {
    return this._animationProgress === 1;
  }

  update() {
    this.updateAnimationProgress();
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeigh = height;
  }

  updateAnimationProgress() {
    if (this._animationProgress === 1) return;

    const diff = new Date() - this._startAt;
    this._animationProgress = Math.min(diff / this.animationTime, 1);
  }

  /** Set the animation progress to 1 (100%) */
  clearAnimation() {
    this._animationProgress = 1;
  }
}
