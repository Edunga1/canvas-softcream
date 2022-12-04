import Line from "../bodies/line.js"
import Point from "../physics/point.js"
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
      start: new Point(x1, y1),
      end: new Point(x2, y2),
    })
  }

  resize(x1, y1, x2, y2) {
    this.line.resize(
      new Point(x1, y1),
      new Point(x2, y2),
    )
  }

  getLine() {
    return this.line
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.line.start.x, this.line.start.y)
    ctx.lineTo(this.line.end.x, this.line.end.y)
    ctx.strokeStyle = "#FFF"
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
  }
}
