import Cream from "./cream.js";

export default class Nozzle {
  constructor() {
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.lastCreatedAt = new Date();
    this.creams = [];
    this.creamPeriod = 1000;
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  update() {
    this.createCream();
    this.updateCreams();
    console.log(this.creams.length);
  }

  draw(ctx) {
    this.creams.forEach((x) => x.draw(ctx));
  }

  createCream() {
    const now = new Date();
    const diff = now - this.lastCreatedAt;
    if (diff < this.creamPeriod) return;

    const cream = new Cream();
    cream.resize(this.canvasWidth, this.canvasHeight);
    cream.pos.x = this.canvasWidth / 2;
    this.creams.push(cream);

    this.lastCreatedAt = now;
  }

  updateCreams() {
    this.creams.forEach((x) => x.update());
    for (let i = this.creams.length - 1; i > 0; i--) {
      if (!this.creams[i].needToRemove) continue;
      this.creams.splice(i, 1);
    }
  }
}
