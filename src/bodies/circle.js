import Unit from "../physics/unit.js"
import Point from "../physics/point.js"

export default class Circle extends Unit {
  constructor({
    pos = new Point(),
    radius,
  }) {
    super({ pos: pos, })
    this.radius = radius
  }

  intersects(
    /** @type Unit */
    unit,
  ) {
    return this.radius + unit.radius >= unit.pos.subtr(this.pos).mag()
  }

  penetrationResolution(
    /** @type Unit */
    unit,
  ) {
    const dist = this.pos.subtr(unit.pos)
    // penetration depth
    const depth = this.radius + unit.radius - dist.mag()
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
   * @param {Circle[]} circles
   */
  collideCircle(circles) {
    if (this.isFixed) return
    const intersectedUnits = circles.filter(u => this.intersects(u))
    intersectedUnits.forEach((u) => {
      this.penetrationResolution(u)
      this.collideResolution(u)
    })
  }
}
