import Unit from "../physics/unit.js"

export default class {
  constructor() {
    /** @type Unit */
    this.$unit = null
  }

  set unit(
    /** @type Unit */
    unit,
  ) {
    this.$unit = unit
  }

  get text() {
    return this.$unit.toString().split("\n")
  }

  draw(ctx) {
    if (this.$unit == null) return

    ctx.font = "20pt"
    ctx.fillStyle = "#000"
    this.text.forEach((line, idx) => {
      ctx.fillText(line, 50, 50 + idx * 20)
    })
  }
}
