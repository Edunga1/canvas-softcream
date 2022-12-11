import Unit from "../physics/unit.js"
import Vector from "../physics/vector.js"
import Line from "./line.js"

export default class Circle extends Unit {
  constructor({
    pos = new Vector(),
    radius = 5,
  }) {
    super({ pos: pos, })
    this.radius = radius
    this.elasticity = .5
  }

  intersectsCircle(
    /** @type Circle */
    circle,
  ) {
    return this.radius + circle.radius >= circle.pos.subtr(this.pos).mag()
  }

  penetrationResolutionCircle(
    /** @type Circle */
    circle,
  ) {
    const dist = this.pos.subtr(circle.pos)
    // penetration depth
    const depth = this.radius + circle.radius - dist.mag()
    const penetrationRes = dist.unit().multiply(depth / (this.inverseMass + circle.inverseMass))
    this.pos = this.pos.add(penetrationRes.multiply(this.inverseMass))
  }

  collideResolutionCircle(
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

    this.penetrationResolutionCircle(circle)
    this.collideResolutionCircle(circle)
  }

  intersectsLine(
    /** @type Line */
    line,
  ) {
    const ballToClosest = this.closestLinePoint(line).subtr(this.pos)
    return ballToClosest.mag() <= this.radius
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

  penetrationResolutionLine(
    /** @type Line */
    line,
  ) {
    const penVect = this.pos.subtr(this.closestLinePoint(line))
    this.pos = this.pos.add(penVect.unit().multiply(this.radius - penVect.mag()))
  }

  collideResolutionLine(
    /** @type Line */
    line,
  ) {
    const normal = this.pos.subtr(this.closestLinePoint(line)).unit()
    const separatingVelocity = this.velocity.dot(normal)
    const newSepratingVelcotiy = -separatingVelocity * this.elasticity
    const vsepDiff = separatingVelocity - newSepratingVelcotiy
    this.velocity = this.velocity.add(normal.multiply(-vsepDiff))
  }

  /**
   * @param {Line} line
   */
  collideLine(line) {
    if (this.isFixed) return
    if (!this.intersectsLine(line)) return
    this.penetrationResolutionLine(line)
    this.collideResolutionLine(line)
  }
}
