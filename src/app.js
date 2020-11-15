import Nozzle from "./nozzle.js";
import Wall from "./wall.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", this.resize.bind(this));

    this.nozzle = new Nozzle();
    this.wall = new Wall();
    this.nozzle.addUnit(this.wall);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.nozzle.resize(this.width, this.height);
    this.wall.resize(this.width, this.height);
  }

  animate(t) {
    this.nozzle.update();
    this.wall.update();
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "#9BBBD4";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fill();

    this.nozzle.draw(this.context);
    this.wall.draw(this.context);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
