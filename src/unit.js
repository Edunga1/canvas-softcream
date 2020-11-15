import Point from "./point.js";

export default class Unit {
  constructor({
    canvasWidth = 0,
    canvasHeight = 0,
    pos = new Point(),
    width = 10,
    height = 10,
    isFixed = false,
    isCenter = false,
  } = {}) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = width;
    this.height = height;
    this.pos = pos;
    this.pos2 = new Point(pos.x + width, pos.y + height);
    this.isFixed = isFixed;
    this.movement = new Point(0, 1);
  }

  update() {
    if (this.isFixed) return;
    this.pos.add(this.movement);
    this.pos2.x = this.pos.x + this.width;
    this.pos2.y = this.pos.y + this.height;
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;

    this.pos2.x = this.pos.x + this.width;
    this.pos2.y = this.pos.y + this.height;
  }

  /**
   * @param {Unit} unit
   */
  collide(unit) {
    if (this === unit) {
      return;
    }

    const isY = this.pos2.y >= unit.pos.y && this.pos2.y <= unit.pos2.y;

    if (
      this.movement.y > 0 &&
      this.pos.x >= unit.pos.x &&
      this.pos.x <= unit.pos2.x &&
      isY
    ) {
      this.movement.x = 0;
      this.movement.y = 0;
    } else if (
      this.movement.y > 0 &&
      this.pos.x < unit.pos.x &&
      this.pos2.x >= unit.pos.x &&
      this.pos2.x <= unit.pos2.x &&
      isY
    ) {
      this.movement.x -= 0.5;
      this.movement.y = Math.max(this.movement.y * 0.95, 0.2);
    } else {
      this.movement.x *= 0.9;
    }
  }
}
