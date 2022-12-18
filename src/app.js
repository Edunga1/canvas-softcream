import Nozzle from "./shapes/nozzle.js"
import Wall from "./shapes/wall.js"
import Vector from "./physics/vector.js"
import Circle from "./bodies/circle.js"
import UnitPropertyPrinter from "./gui/unit-printer.js"

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    /** @type CanvasRenderingContext2D */
    this.context = this.canvas.getContext("2d")
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))

    // mouse events
    this.mouseMoveEnabled = true
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this))

    this.nozzle = new Nozzle()
    this.wall = new Wall()
    this.resize()

    /** @type Circle[] */
    this.circles = []
    /** @type Line[] */
    this.lines = []

    this.unitPrinter = new UnitPropertyPrinter()

    Array.from(Array(30)).forEach(() => this.nozzle.addCream())
    requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.nozzle.resize(this.width / 2, 0)
    this.wall.resize(
      this.width / 4,
      this.height / 2,
      this.width * 3 / 4,
      this.height / 2,
    )
  }

  animate() {
    this.nozzle.update()

    this.collectShapes()

    this.updateCircles()
    this.draw()
  }

  collectShapes() {
    this.circles = this.nozzle.getCircles()
    this.lines = [this.wall.getLines()]
  }

  updateCircles() {
    this.circles.forEach(c1 => {
      const targetLines = [...this.lines]
      targetLines.forEach(l => {
        c1.collideLine(l)
      })

      const targetsCircles = [...this.circles]
      targetsCircles.splice(targetsCircles.indexOf(c1), 1)
      targetsCircles.forEach(c2 => {
        c1.collideCircle(c2)
      })

      c1.reposition()
    })
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = "#9BBBD4"
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.fill()

    this.nozzle.draw(this.context)
    this.wall.draw(this.context)

    // Debug line to circle
    this.nozzle.creams.map(c => c.circle).forEach(circle => {
      const point = circle.closestLinePoint(this.wall.line)
      this.context.beginPath()
      this.context.moveTo(point.x, point.y)
      this.context.lineTo(circle.pos.x, circle.pos.y)
      this.context.strokeStyle = "#00F"
      this.context.lineWidth = 1
      this.context.setLineDash([1, 3])
      this.context.stroke()
      this.context.closePath()
      this.context.setLineDash([])
    })

    this.unitPrinter.draw(this.context)

    requestAnimationFrame(this.animate.bind(this))
  }

  updateUnitPrinter(pos) {
    const point = new Circle({ pos, radius: 1 })
    const found = this.circles.filter(c => c.intersectsCircle(point))?.[0]
    this.unitPrinter.unit = found
    return !!found
  }

  onMouseMove(
    /** @type MouseEvent */
    event,
  ) {
    if (!this.mouseMoveEnabled) return

    const pos = new Vector(event.offsetX, event.offsetY)
    this.updateUnitPrinter(pos)
  }

  onMouseUp(
    /** @type MouseEvent */
    event,
  ) {
    const pos = new Vector(event.offsetX, event.offsetY)
    const res = this.updateUnitPrinter(pos)
    this.mouseMoveEnabled = !res
  }
}

window.onload = () => {
  new App()
}
