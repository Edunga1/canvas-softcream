import Point from "./point.js";

export default class Wall {
  constructor() {
    this.pos = new Point();
    this.width = 200;
    this.height = 50;
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.pos.x = width / 2 - this.width / 2;
    this.pos.y = height - this.height;
  }

  update() {}

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
}
