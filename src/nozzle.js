import Cream from "./cream.js";
import Point from "./physics/point.js";

export default class Nozzle {
  constructor() {
    this.pos = new Point();
    this.lastCreatedAt = new Date();
    /** @type {Unit[]} */
    this.units = [];
    this.creamPeriod = 200;
  }

  resize(x, y) {
    this.pos = new Point(x, y)
  }

  update() {
    this.createCream();
    this.checkCreamsColision();
    this.updateCreams();
  }

  draw(ctx) {
    this.units.forEach((x) => x.draw(ctx));
  }

  createCream() {
    const now = new Date();
    const diff = now - this.lastCreatedAt;
    if (diff < this.creamPeriod) return;

    const creamStartPos = new Point(
      this.pos.x + (Math.random() - 0.5) * 20,
      this.pos.y,
    )
    const cream = new Cream({
      width: 10,
      height: 10,
      pos: creamStartPos,
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
  }

  addUnit(unit) {
    this.units.push(unit);
  }
}
