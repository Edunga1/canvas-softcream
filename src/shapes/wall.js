import Line from "../bodies/line.js"
import Vector from "../physics/vector.js"
import Shape from "./shape.js"

export default class Wall extends Shape {
  constructor({
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
  } = {}) {
    super()
    this.line = new Line({
      start: new Vector(x1, y1),
      end: new Vector(x2, y2),
    })
  }

  resize(x1, y1, x2, y2) {
    this.line.resize(
      new Vector(x1, y1),
      new Vector(x2, y2),
    )
  }

  getLines() {
    return this.line
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.line.start.x, this.line.start.y)
    ctx.lineTo(this.line.end.x, this.line.end.y)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  }
}
