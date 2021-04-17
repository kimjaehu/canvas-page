import { Airplane } from "./airplane.js";

export class AirplaneController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "airplane_blue.png";

    this.cur = 0;
    this.speed = 0.25;
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addAirplane();
  }

  addAirplane() {
    this.airplane = new Airplane(this.img, this.stageWidth, this.stageHeight);
  }

  draw(ctx, t, points) {
    let percent;
    if (this.isLoaded) {
      percent = this.airplane.animate(ctx, t, points[this.cur], this.speed);
      percent == 100 - this.speed && this.cur++;
    }

    return this.cur == points.length;
  }
}
