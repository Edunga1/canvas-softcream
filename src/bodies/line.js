import Point from "../physics/point.js"
import Unit from "../physics/unit.js"

export default class Line extends Unit {
  constructor({
    start = new Point(),
    end = new Point(),
  }) {
    super({ pos: start })
    this.start = start
    this.end = end
  }

  resize(
    start = new Point(),
    end = new Point(),
  ) {
    this.pos = start
    this.start = start
    this.end = end
  }
}
