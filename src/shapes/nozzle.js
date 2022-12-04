import Cream from "./cream.js"
import Point from "../physics/point.js"
import ShapeCollection from "./collection.js"

export default class Nozzle extends ShapeCollection {
  constructor() {
    super()
    this.pos = new Point()
    this.lastCreatedAt = new Date()
    /** @type {Cream[]} */
    this.creams = []
    this.creamPeriod = 200
  }

  resize(x, y) {
    this.pos = new Point(x, y)
  }

  update() {
    this.createCream()
  }

  draw(ctx) {
    this.creams.forEach((x) => x.draw(ctx))
  }

  getCircles() {
    return this.creams.map(c => c.circle)
  }

  createCream() {
    const now = new Date()
    const diff = now - this.lastCreatedAt
    if (diff < this.creamPeriod) return

    const creamStartPos = new Point(
      this.pos.x + (Math.random() - 0.5) * 20,
      this.pos.y,
    )
    const cream = new Cream({
      pos: creamStartPos,
      radius: 10,
    })
    this.creams.push(cream)

    this.lastCreatedAt = now
  }
}
