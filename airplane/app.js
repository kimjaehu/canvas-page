import { Path } from "./path.js";
import { CloudController } from "./cloud-controller.js";

import { Background } from "./background.js";

class App {
  constructor() {
    // logo

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.logo = document.createElement("IMG");
    this.logo.classList.add("logo");
    this.logo.setAttribute("src", "klm_logo_white.png");
    this.logo.setAttribute("alt", "KLM Logo");
    document.body.appendChild(this.logo);

    this.paths = [];

    this.cloudController = new CloudController();
    this.background = new Background();

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("pointerup", this.onUp.bind(this), false);
    window.addEventListener("resize", this.resize.bind(this), false);

    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.background.backgroundColor(this.paths);

    this.cloudController.resize(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    let end = Boolean;

    this.background.backgroundColor(this.paths);

    this.paths.length > 0 && this.cloudController.draw(this.ctx);

    for (let i = 0; i < this.paths.length; i++) {
      end = this.paths[i].draw(this.ctx, t);
      end && this.paths.splice(i, 1);
    }
  }

  onUp(e) {
    let cx = e.clientX;
    let cy = e.clientY;

    this.paths.push(
      new Path(this.ctx, cx, cy, this.stageWidth, this.stageHeight)
    );

    this.background.backgroundColor(this.paths);
  }
}

window.onload = () => {
  new App();
};
