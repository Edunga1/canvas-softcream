export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(
    /** @type Point */
    point,
  ) {
    return new Point(
      this.x + point.x,
      this.y + point.y,
    )
  }

  subtr(
    /** @type Point */
    point,
  ) {
    return new Point(
      this.x - point.x,
      this.y - point.y,
    )
  }

  /** magnitude of vector */
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  unit() {
    const mag = this.mag()
    if (mag === 0) {
      return new Point(0, 0)
    }
    return new Point(this.x / mag, this.y / mag)
  }

  multiply(scalar = 1) {
    return new Point(this.x * scalar, this.y * scalar)
  }

  dot(
    /** @type Point */
    point,
  ) {
    return this.x * point.x + this.y * point.y
  }

  toString() {
    return `(${this.x}, ${this.y})`
  }
}
