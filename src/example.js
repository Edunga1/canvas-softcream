export default class Example {
  constructor() {
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.count = 0;
  }

  resize(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  update() {
    this.count += 1;
  }

  draw(ctx) {
    const centerX = this.canvasWidth / 2;
    const centerY = this.canvasHeight / 2;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(centerX - 100, centerY - 50, 200, 100);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(this.count, this.canvasWidth / 2, this.canvasHeight / 2);
    ctx.fill();
  }
}
