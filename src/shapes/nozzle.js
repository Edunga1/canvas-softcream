import Cream from "./cream.js"
import Vector from "../physics/vector.js"
import Shape from "./shape.js"

export default class Nozzle extends Shape {
  constructor() {
    super()
    this.sequence = 0
    this.capacity = 200
    this.pos = new Vector()
    this.lastCreatedAt = new Date()
    this.angle = 90
    /** @type Cream[] */
    this.creams = []
    this.creamPeriod = 700
    /** @type Cream */
    this.lastCream = null
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

  calculateAcceleration() {
    return new Vector(0, 1).rotate((this.angle - 90) * Math.PI / 180)
  }

  addCream() {
    const creamStartPos = new Vector(
      this.pos.x + (Math.random() - 0.5) * 20,
      this.pos.y,
    )
    const cream = new Cream({
      pos: creamStartPos,
      radius: 10,
      text: ++this.sequence,
    })
    cream.circle.acceleration = this.calculateAcceleration()
    if (this.lastCream != null) {
      this.lastCream.next = cream
    }
    this.creams.push(cream)
    this.lastCream = cream
  }

  removeCream(index = 0, count = 1) {
    this.creams.splice(index, count)
  }

  removeCreamOf(
    /** @type Cream */
    cream,
  ) {
    const index = this.creams.indexOf(cream)
    if (index == -1) return
    this.removeCream(index)
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

  updateAngle(angle) {
    this.angle = angle
    this.creams.forEach(c => {
      c.circle.acceleration = this.calculateAcceleration()
    })
  }
}
