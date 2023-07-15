import Nozzle from "./shapes/nozzle.js"
import Wall from "./shapes/wall.js"
import Vector from "./physics/vector.js"
import Circle from "./bodies/circle.js"
import UnitPropertyPrinter from "./gui/unit-printer.js"

class App {
  constructor() {
    this.options = {
      escape: false,
    }
    this.angle = 90

    this.canvas = document.createElement("canvas")
    /** @type CanvasRenderingContext2D */
    this.context = this.canvas.getContext("2d")
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))
    window.addEventListener("deviceorientation", this.onDeviceOrientation.bind(this))

    // mouse events
    this.mouseMoveEnabled = true
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this))

    this.nozzle = new Nozzle()
    this.walls = new Array(5).fill(0).map(() => new Wall())
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

    this.nozzle.resize(this.width/2, 0)
    this.walls[0].resize(this.width/4, this.height/2, this.width*3/4, this.height/2)
    this.walls[1].resize(0, 0, this.width, 0)
    this.walls[2].resize(0, this.height, this.width, this.height)
    this.walls[3].resize(0, 0, 0, this.height)
    this.walls[4].resize(this.width, 0, this.width, this.height)
  }

  onDeviceOrientation(e) {
    if (90 - Math.abs(e.alpha) > 30 || 90 - Math.abs(e.gmma) > 30) return
    this.angle = e.beta
    this.nozzle.updateAngle(this.angle)
  }

  animate() {
    this.nozzle.update()

    this.collectShapes()

    this.updateCircles()
    this.removeOuted()
    this.draw()
  }

  collectShapes() {
    this.circles = this.nozzle.getCircles()
    this.lines = this.walls.map(w => w.getLines())
  }

  updateCircles() {
    this.circles.forEach(c1 => {
      const targetLines = [...this.lines]
      targetLines.forEach(l => c1.collideLine(l))

      const targetsCircles = [...this.circles]
      targetsCircles.splice(targetsCircles.indexOf(c1), 1)
      targetsCircles.forEach(c2 => c1.collideCircle(c2))

      c1.reposition()
    })
  }

  removeOuted() {
    if (!this.options.escape) return
    const outed = this.nozzle.creams.filter(c => c.circle.pos.y + c.circle.radius > this.height)
    outed.forEach(c => this.nozzle.removeCreamOf(c))
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = "#9BBBD4"
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.fill()

    this.nozzle.draw(this.context)
    this.walls.forEach(w => w.draw(this.context))

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
