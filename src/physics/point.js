export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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
      this.x = point.x,
      this.py = point.y,
    )
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  unit() {
    const mag = this.mag()
    return new Point(this.x / mag, this.y / mag)
  }

  toString() {
    return `(${this.x}, ${this.y})`
  }
}
