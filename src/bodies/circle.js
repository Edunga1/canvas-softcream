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

  intersectsCircle(
    /** @type Circle */
    circle,
  ) {
    return this.radius + circle.radius >= circle.pos.subtr(this.pos).mag()
  }

  intersectsLine(
    /** @type Line */
    line,
  ) {
    // TODO
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
   * @param {Circle} circle
   */
  collideCircle(circle) {
    if (this.isFixed) return
    if (!this.intersectsCircle(circle)) return

    this.penetrationResolution(circle)
    this.collideResolution(circle)
  }

  /**
   * @param {Line} line
   */
  collideLine(line) {
    if (this.isFixed) return
    if (!this.intersectsLine(line)) return
    // TODO
  }
}
