import Unit from "./unit.js";

export default class Wall extends Unit {
  constructor() {
    super({ width: 100, height: 100, isFixed: true });
  }

  resize(width, height) {
    this.pos.x = width / 2 - this.width / 2;
    this.pos.y = height - this.height - 100;
    super.resize(width, height);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
}
