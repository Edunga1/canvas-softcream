import Cream from "./cream.js"
import Vector from "../physics/vector.js"
import ShapeCollection from "./collection.js"

export default class Nozzle extends ShapeCollection {
  constructor() {
    super()
    this.capacity = 50
    this.pos = new Vector()
    this.lastCreatedAt = new Date()
    /** @type {Cream[]} */
    this.creams = []
    this.creamPeriod = 200
  }

  resize(x, y) {
    this.pos = new Vector(x, y)
  }

  update() {
    this.createCreams()
    this.removeCreams()
  }

  draw(ctx) {
    this.creams.forEach((x) => x.draw(ctx))
  }

  getCircles() {
    return this.creams.map(c => c.circle)
  }

  addCream() {
    const creamStartPos = new Vector(
      this.pos.x + (Math.random() - 0.5) * 20,
      this.pos.y,
    )
    const cream = new Cream({
      pos: creamStartPos,
      radius: 10,
    })
    this.creams.push(cream)

  }

  removeCream(index = 0, count = 1) {
    this.creams.splice(index, count)
  }

  createCreams() {
    const now = new Date()
    const diff = now - this.lastCreatedAt
    if (diff < this.creamPeriod) return
    this.lastCreatedAt = now
    this.addCream()
  }

  removeCreams() {
    if (this.creams.length < this.capacity) return
    this.removeCream()
  }
}
