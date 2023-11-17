import Cream from "./cream.js"
import Vector from "../physics/vector.js"
import Shape from "./shape.js"
import Counter from "../utils/counter.js"

export default class Nozzle extends Shape {
  constructor() {
    super()
    this.sequence = 0
    this.capacity = 500
    this.pos = new Vector()
    this.creamCreationCounter = new Counter(18, this.addCream.bind(this))
    this.angle = 90
    /** @type Cream[] */
    this.creams = []
    /** @type Cream */
    this.lastCream = null
  }

  resize(ow, oh, nw, nh) {
    this.pos = this.pos.scale(nw / ow, nh / oh)
  }

  update() {
    this.createCreams()
    this.removeCreams()
  }

  getCircles() {
    return this.creams.map(c => c.circle)
  }

  calculateAcceleration() {
    return new Vector(0, 1).rotate((90 - this.angle) * Math.PI / 180)
  }

  addCream() {
    const creamStartPos = new Vector(
      this.pos.x + (Math.random() - 0.5) * 40,
      this.pos.y + Math.random() * 30,
    )
    const cream = new Cream({
      pos: creamStartPos,
      radius: 10,
      text: ++this.sequence,
    })
    cream.circle.direction = this.calculateAcceleration()
    if (this.lastCream != null) {
      this.lastCream.next = cream
    }
    this.creams.push(cream)
    this.lastCream = cream
    this.createShape(cream)
  }

  removeCream(index = 0, count = 1) {
    this.removeShape(...this.creams.splice(index, count))
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
    this.creamCreationCounter.add()
  }

  removeCreams() {
    if (this.creams.length <= this.capacity) return
    this.removeCream()
  }

  updateAngle(angle) {
    this.angle = angle
    this.creams.forEach(c => {
      c.circle.direction = this.calculateAcceleration()
    })
  }
}
