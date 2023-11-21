import Cream from "./cream.js"
import Vector from "../physics/vector.js"
import Shape from "./shape.js"
import Counter from "../utils/counter.js"

export default class Nozzle extends Shape {
  constructor() {
    super()
    this.capacity = 500
    this.pos = new Vector()
    this.creamCreationCounter = new Counter(12, this.addCream.bind(this))
    this.creamRadius = 4
    // SOX: Start Offset X
    this.creamMaxSOX = this.creamRadius * 10
    this.creamMinSOX = -(this.creamMaxSOX)
    this.lastCreamSOX = 0
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
    const pos = this.getRandomizedPos()
    const cream = new Cream({
      pos: pos,
      radius: this.creamRadius,
    })
    this.lastCreamSOX = pos.x - this.pos.x
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

  getRandomizedPos() {
    const movement = Math.floor(Math.random() * 2) * this.creamRadius
    let sign = Math.floor(Math.random() * 2) * 2 - 1
    if (this.lastCreamSOX + movement * sign > this.creamMaxSOX) {
      sign = -1
    } else if (this.lastCreamSOX + movement * sign < this.creamMinSOX) {
      sign = 1
    }
    return new Vector(
      this.pos.x + this.lastCreamSOX + movement * sign,
      this.pos.y + 10,
    )
  }
}
