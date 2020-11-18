import Point from "./point.js";

export default class Unit {
  constructor({
    canvasWidth = 0,
    canvasHeight = 0,
    pos = new Point(),
    width = 10,
    height = 10,
    isFixed = false,
  } = {}) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = width;
    this.height = height;
    this.pos = pos;
    this.pos2 = new Point(pos.x + width, pos.y + height);
    this.isFixed = isFixed;
    this.movement = new Point(0, 2);
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
   * @param {Unit[]} units
   */
  collide(units) {
    const adjacentUnits = units.filter(
      (u) =>
        this.pos.x < u.pos2.x &&
        this.pos2.x > u.pos.x &&
        this.pos.y < u.pos2.y &&
        this.pos2.y > u.pos.y
    );

    if (adjacentUnits.length === 0) {
      // 부유 상태
      this.movement.x *= 0.8;
      this.movement.y = 2;
      return;
    }

    if (this.isFixed) {
      return;
    }

    const minx = Math.min(...adjacentUnits.map((u) => u.pos.x));
    const miny = Math.min(...adjacentUnits.map((u) => u.pos.y));
    const maxx = Math.max(...adjacentUnits.map((u) => u.pos2.x));
    const maxy = Math.max(...adjacentUnits.map((u) => u.pos2.y));
    const pos = new Point(minx, miny);
    const pos2 = new Point(maxx, maxy);
    const isUp = this.pos2.y < pos2.y;

    // 멈춰야 하는 경우
    if (this.pos.x > pos.x && this.pos2.x < pos2.x) {
      this.movement.x = 0;
      this.movement.y = 0;
    }
    // 미끄러짐
    else if (this.movement.y > 0 && isUp) {
      this.movement.x = this.pos.x < pos.x ? -0.5 : 0.5;
      this.movement.y = Math.max(this.movement.y * 0.95, 0.2);
    }
  }
}
