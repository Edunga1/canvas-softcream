import Point from "./physics/point.js";

export default class Unit {
  constructor({
    pos = new Point(),
    width = 10,
    height = 10,
    isFixed = false,
  }) {
    this.width = width;
    this.height = height;
    this.pos = pos;
    this.isFixed = isFixed;
    this.movement = new Point(0, 2)
    this.friction = .05
    this.elasticity = 1
    this.velocity = new Point(0, 20)
    this.acceleration = new Point(0, 0)
    this.accelerationScalar = .05
    this.mass = 50
    this.inverseMass = 1 / this.mass
  }

  update() {
    this.reposition()
  }

  reposition() {
    if (this.isFixed) return;
    this.acceleration = this.acceleration.unit().multiply(this.accelerationScalar)
    this.velocity = this.velocity.add(this.acceleration)
    this.velocity = this.velocity.multiply(1 - this.friction)
    this.pos = this.pos.add(this.velocity)
  }

  resize() {
  }

  intersects(
    /** @type Unit */
    unit,
  ) {
    return this.width / 2 + unit.width / 2 >= unit.pos.subtr(this.pos).mag()
  }

  penetrationResolution(
    /** @type Unit */
    unit,
  ) {
    const dist = this.pos.subtr(unit.pos)
    // penetration depth
    const depth = this.width / 2 + unit.width / 2 - dist.mag()
    // may be resilient?
    const penetrationRes = dist.unit().multiply(depth / (this.inverseMass + unit.inverseMass))
    this.pos = this.pos.add(penetrationRes.multiply(this.inverseMass))
  }

  collideResolution(
    /** @type Unit */
    unit,
  ) {
    const normal = this.pos.subtr(unit.pos).unit()
    const relativeVelocity = this.velocity.subtr(unit.velocity)
    const separatingVelocity = relativeVelocity.dot(normal)
    const newSepVel = -separatingVelocity * Math.min(this.elasticity, unit.elasticity)

    const vsepDiff = newSepVel - separatingVelocity

    const impulse = vsepDiff / (this.inverseMass + unit.inverseMass)
    const impulseVector = normal.multiply(impulse)

    this.velocity = this.velocity.add(impulseVector.multiply(this.inverseMass))
  }

  /**
   * @param {Unit[]} units
   */
  collide(units) {
    if (this.isFixed) return
    const intersectedUnits = units.filter(u => this.intersects(u))
    intersectedUnits.forEach((u) => {
      this.penetrationResolution(u)
      this.collideResolution(u)
    })
  }

  toString() {
    return `w: ${this.width} / h: ${this.height} / pos(x,y): ${this.pos.toString()}`
  }
}
