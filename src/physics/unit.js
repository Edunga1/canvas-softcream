import Vector from "./vector.js"

export default class Unit {
  constructor({
    pos = new Vector(),
    isFixed = false,
  }) {
    this.pos = pos
    this.isFixed = isFixed
    this.movement = new Vector(0, 2)
    this.friction = .05
    this.elasticity = 1
    this.velocity = new Vector(0, 20)
    this.acceleration = new Vector(0, 0)
    this.accelerationScalar = .05
    this.mass = 50
    this.inverseMass = 1 / this.mass
  }

  reposition() {
    if (this.isFixed) return
    this.acceleration = this.acceleration.unit().multiply(this.accelerationScalar)
    this.velocity = this.velocity.add(this.acceleration)
    this.velocity = this.velocity.multiply(1 - this.friction)
    this.pos = this.pos.add(this.velocity)
  }

  collideCircle() {
    throw new Error("Implement this.")
  }

  collideLine() {
    throw new Error("Implement this.")
  }

  toString() {
    return `pos(x,y): ${this.pos.toString()}`
  }
}
