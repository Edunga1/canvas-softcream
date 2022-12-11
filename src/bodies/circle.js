import Unit from "../physics/unit.js"
import Vector from "../physics/vector.js"
import Line from "./line.js"

export default class Circle extends Unit {
  constructor({
    pos = new Vector(),
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
  }

  closestLinePoint(
    /** @type Line */
    line,
  ) {
    const circleToLineStart = line.start.subtr(this.pos)
    const crossToLineStart = line.unit().dot(circleToLineStart)

    if (crossToLineStart > 0) {
      return line.start
    }

    const lineEndToCircle = this.pos.subtr(line.end)
    const crossToLineEnd = line.unit().dot(lineEndToCircle)

    if (crossToLineEnd > 0) {
      return line.end
    }

    const closestVect = line.unit().multiply(crossToLineStart)
    return line.start.subtr(closestVect)
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
