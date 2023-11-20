import Shape from "./shapes/shape.js" // eslint-disable-line no-unused-vars
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
    this.lastTime = 0
    this.delta = 0
    this.width = 100
    this.height = 100

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

    /** @type Shape[] */
    this.shapes = []
    /** @type Circle[] */
    this.circles = []
    /** @type Line[] */
    this.lines = []

    this.unitPrinter = new UnitPropertyPrinter()

    // main shapes
    this.nozzle = new Nozzle()
    this.nozzle.pos = new Vector(this.width/2, this.height/20)
    this.addShape(this.nozzle)
    this.walls = [
      new Wall(this.width/2-10, this.height/2, this.width/2+10, this.height/2),
      new Wall(this.width/2-10, this.height/2, this.width/2-11, this.height/2-2),
      new Wall(this.width/2+10, this.height/2, this.width/2+11, this.height/2-2),
      // border walls
      new Wall(0, 0, this.width, 0),
      new Wall(0, this.height, this.width, this.height),
      new Wall(0, 0, 0, this.height),
      new Wall(this.width, 0, this.width, this.height),
    ]
    this.addShape(...this.walls)

    this.initInputs()
    this.resize()
  }

  start(initialTick = 0) {
    if (initialTick > 0) {
      for (let i = 0; i < initialTick; i++) this.update()
    }
    requestAnimationFrame(this.animate.bind(this))
  }

  initInputs() {
    const inputDegree = window.document.querySelector("#degree")
    if (inputDegree) {
      inputDegree.value = this.angle
      inputDegree.addEventListener("input", (e) => {
        this.angle = e.target.value
        this.nozzle.updateAngle(this.angle)
      })
    }

    const inputResetDegree = window.document.querySelector("#reset-degree")
    if (inputResetDegree) {
      inputResetDegree.addEventListener("click", () => {
        this.angle = 90
        this.nozzle.updateAngle(this.angle)
        if (inputDegree) inputDegree.value = this.angle
      })
    }
  }

  resize() {
    const oldWidth = this.width
    const oldHeight = this.height
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.shapes.forEach(s => {
      s.resize(oldWidth, oldHeight, this.width, this.height)
    })
  }

  onDeviceOrientation(e) {
    this.angle = e.alpha + 90
    this.nozzle.updateAngle(this.angle)
  }

  refreshPhysics() {
    this.circles = this.shapes.map(s => s.getCircles()).flat()
    this.lines = this.shapes.map(s => s.getLines()).flat()
  }

  addShape(...shapes) {
    this.shapes.push(...shapes)
    this.refreshPhysics()
    shapes.forEach(s => {
      s.createShape = this.addShape.bind(this)
      s.removeShape = this.removeShape.bind(this)
    })
  }

  removeShape(...shapes) {
    this.shapes = this.shapes.filter(s => !shapes.includes(s))
    this.refreshPhysics()
  }

  animate(time) {
    this.delta = Math.min(time - this.lastTime, 1000/60)
    this.lastTime = time
    this.update()
    this.draw()
    requestAnimationFrame(this.animate.bind(this))
  }

  update() {
    this.updateShapes()
    this.updatePhysics()
    this.removeOuted()
  }

  updateShapes() {
    this.shapes.forEach(s => s.update())
  }

  updatePhysics() {
    this.circles.forEach(c1 => {
      const targetLines = [...this.lines]
      targetLines.forEach(l => c1.collideLine(l))

      const targetsCircles = [...this.circles]
      targetsCircles.splice(targetsCircles.indexOf(c1), 1)
      targetsCircles.forEach(c2 => c1.collideCircle(c2))
    })
  }

  removeOuted() {
    if (!this.options.escape) return
    const outed = this.nozzle.creams.filter(c => c.circle.pos.y + c.circle.radius > this.height)
    outed.forEach(c => this.nozzle.removeCreamOf(c))
  }

  draw() {
    // clear canvas
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = "#9BBBD4"
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.fill()

    // draw shapes
    this.shapes.forEach(s => {
      this.context.save()
      s.draw(this.context)
      this.context.restore()
    })

    this.unitPrinter.draw(this.context)
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
  new App().start(500)
}
