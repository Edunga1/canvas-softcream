export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(
    /** @type Vector */
    vector,
  ) {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y,
    )
  }

  subtr(
    /** @type Vector */
    vector,
  ) {
    return new Vector(
      this.x - vector.x,
      this.y - vector.y,
    )
  }

  /** magnitude of vector */
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  unit() {
    const mag = this.mag()
    if (mag === 0) {
      return new Vector(0, 0)
    }
    return new Vector(this.x / mag, this.y / mag)
  }

  multiply(
    /** @type number */
    scalar,
  ) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  dot(
    /** @type Vector */
    vector,
  ) {
    return this.x * vector.x + this.y * vector.y
  }

  rotate(
    /** @type number */
    angle,
  ) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return new Vector(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos,
    )
  }

  scale(
    /** @type number */
    sx,
    /** @type number */
    sy,
  ) {
    return new Vector(this.x * sx, this.y * sy)
  }

  toString() {
    return `${this.x.toFixed(2)}, ${this.y.toFixed(2)}`
  }
}
