import Vector from "./vector.js"

export default class Unit {
  constructor({
    pos = new Vector(),
    isFixed = false,
  }) {
    this.pos = pos
    this.isFixed = isFixed
    this.friction = .05
    this.elasticity = 1
    this.velocity = new Vector(0, 0)
    this.direction = new Vector(0, 1)
    this.accelerationScalar = .03
    this.mass = 50
  }

  get inverseMass() {
    return 1 / this.mass
  }

  get acceleration() {
    return this.direction.unit().multiply(this.accelerationScalar)
  }

  reposition(delta) {
    if (this.isFixed) return
    this.velocity = this.velocity.add(this.acceleration.multiply(delta/4))
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
    return `
    pos: ${this.pos.toString()}
    friction: ${this.friction}
    elasticity: ${this.elasticity}
    velocity: ${this.velocity.toString()}
    acceleration: ${this.direction.toString()}
    accelerationScalar: ${this.accelerationScalar}
    mass: ${this.mass}
    `
  }
}
