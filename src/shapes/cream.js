import Circle from "../bodies/circle.js"
import Vector from "../physics/vector.js"
import Shape from "./shape.js"

export default class Cream extends Shape {
  constructor({
    pos = new Vector(0, 0),
    radius = 5,
  } = {}) {
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
    ctx.arc(
      this.circle.pos.x,
      this.circle.pos.y,
      this.circle.radius,
      0,
      2 * Math.PI
    )
    ctx.strokeStyle = "#444"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
  }

  getCircle() {
    return this.circle
  }
}
