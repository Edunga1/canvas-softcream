import Circle from "../bodies/circle.js"
import Point from "../physics/point.js"
import Shape from "./shape.js"

export default class Cream extends Shape {
  constructor({
    pos = new Point(0, 0),
    radius = 5,
  }) {
    super()
    this.circle = new Circle({
      radius: radius,
      pos: pos,
    })
  }

  collide(
    /** @type {Shape} */
    shape,
  ) {
    this.circle.collideCircle(shape.circle)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "#444"
    ctx.arc(
      this.circle.pos.x,
      this.circle.pos.y,
      this.circle.radius,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    ctx.closePath()

    // a red dot for debugging
    const size = 3
    const offset = size / 2
    ctx.beginPath()
    ctx.fillStyle = "red"
    ctx.fillRect(this.circle.pos.x - offset, this.circle.pos.y - offset, size, size)
    ctx.fill()
    ctx.closePath()
  }

  getCircle() {
    return this.circle
  }
}
