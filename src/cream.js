import Point from "./point.js";

export default class Cream {
  constructor() {
    this.pos = new Point();
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  update() {
    this.pos.y++;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#444";
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  collide(pos, width, height) {
    return (
      this.pos.x >= pos.x &&
      this.pos.x <= pos.x + width &&
      this.pos.y >= pos.y &&
      this.pos.y <= pos.y + height
    );
  }

  get needToRemove() {
    return this.pos.y - 5 >= this.canvasHeight;
  }
}
