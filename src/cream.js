import Unit from "./unit.js";

export default class Cream extends Unit {
  constructor(opts) {
    super({ ...opts, isCenter: true });
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#444";
    ctx.arc(
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2,
      this.width / 2,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
    ctx.fill();
    ctx.closePath();
  }

  get needToRemove() {
    return this.pos.y - this.width >= this.canvasHeight;
  }
}
