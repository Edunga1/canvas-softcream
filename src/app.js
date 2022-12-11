import Nozzle from "./shapes/nozzle.js"
import Wall from "./shapes/wall.js"
import Unit from "./physics/unit.js"

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    /** @type CanvasRenderingContext2D */
    this.context = this.canvas.getContext("2d")
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))
    this.canvas.addEventListener("mouseover", this.onMouseOverCanvas.bind(this))

    this.nozzle = new Nozzle()
    this.wall = new Wall()
    this.resize()

    /** @type Circle[] */
    this.circles = []
    /** @type Line[] */
    this.lines = []

    this.mouseX = 0
    this.mouseY = 0

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
      this.height / 3,
    )
  }

  animate(t) {
    this.nozzle.update()

    this.collectShapes()

    this.updateCircles()
    this.draw()
  }

  collectShapes() {
    this.circles = this.nozzle.getCircles()
    this.lines = [this.wall.getLine()]
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

    requestAnimationFrame(this.animate.bind(this))
  }

  onMouseOverCanvas(
    /** @type MouseEvent */
    event,
  ) {
    const units = this.circles.concat(this.lines)
    console.log(event.offsetX, event.offsetY)
    const found = units.filter(u => this.context.isPointInPath(u, event.offsetX, event.offsetY))
    console.log(found)
    //this.context.fillText(unit.toString(), this.mouseX, this.mouseY)
  }
}

window.onload = () => {
  new App()
}
