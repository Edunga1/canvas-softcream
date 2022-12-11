import Vector from "../physics/vector.js"
import Unit from "../physics/unit.js"

export default class Line extends Unit {
  constructor({
    start = new Vector(),
    end = new Vector(),
  }) {
    super({ pos: start })
    this.start = start
    this.end = end
  }

  unit() {
    return this.end.subtr(this.start).unit()
  }

  resize(
    start = new Vector(),
    end = new Vector(),
  ) {
    this.pos = start
    this.start = start
    this.end = end
  }
}
