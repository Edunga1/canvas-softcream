import Cream from "./cream.js";
import Point from "./point.js";

export default class Nozzle {
  constructor() {
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.lastCreatedAt = new Date();
    /** @type {Unit[]} */
    this.units = [];
    this.creamPeriod = 500;
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  update() {
    this.createCream();
    this.checkCreamsColision();
    this.updateCreams();
    // TODO: DEBUG
    // console.log(this.units.length);
  }

  draw(ctx) {
    this.units.forEach((x) => x.draw(ctx));
  }

  createCream() {
    const now = new Date();
    const diff = now - this.lastCreatedAt;
    if (diff < this.creamPeriod) return;

    const cream = new Cream({
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      width: 10,
      height: 10,
      // pos: new Point(this.canvasWidth / 2 - 10, 0),
      pos: new Point(this.canvasWidth / 2 + (Math.random() - 0.5) * 20, 0),
    });
    this.units.push(cream);

    this.lastCreatedAt = now;
  }

  checkCreamsColision() {
    this.units.forEach((c1) => {
      const copy = [...this.units];
      const idx = copy.indexOf(c1);
      copy.splice(idx, 1);
      c1.collide(copy);
    });
  }

  updateCreams() {
    this.units.forEach((x) => x.update());
    for (let i = this.units.length - 1; i > 0; i--) {
      if (!this.units[i].needToRemove) continue;
      this.units.splice(i, 1);
    }
  }

  addUnit(unit) {
    this.units.push(unit);
  }
}
