import Cream from "./cream.js"
import Point from "../physics/point.js"

export default class Nozzle {
  constructor() {
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
    this.checkCreamsColision()
    this.updateCreams()
  }

  draw(ctx) {
    this.creams.forEach((x) => x.draw(ctx))
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

  checkCreamsColision() {
    this.creams.forEach((c1) => {
      const copy = [...this.creams]
      const idx = copy.indexOf(c1)
      copy.splice(idx, 1)
      c1.collide(copy)
    })
  }

  updateCreams() {
    this.creams.forEach((x) => x.circle.update())
  }
}
