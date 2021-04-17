import { Cloud } from "./cloud.js";

export class CloudController {
  constructor() {
    this.clouds = [];

    this.cur = 0;
    this.total = 80;
    this.isLoaded = false;

    this.max = 200;

    this.addCloud();
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addCloud();
  }

  addCloud() {
    let cloudConditions = this.cloudConditions();
    this.clouds.push(
      new Cloud(
        cloudConditions.x,
        cloudConditions.y,
        cloudConditions.speed,
        cloudConditions.radius
      )
    );
  }

  draw(ctx) {
    this.cur += 1;
    if (this.cur < this.total) {
      this.addCloud();
    }
    for (let i = 0; i < this.clouds.length; i++) {
      const cloud = this.clouds[i];
      if (cloud.x > this.stageWidth + this.max) {
        this.clouds.splice(i, 1);
        this.addCloud();
      } else {
        cloud.draw(ctx);
      }
    }
  }

  cloudConditions() {
    let y = this.stageHeight * Math.random();
    let radius = Math.random() * this.max;
    let x;
    let speed;
    if (this.cur % 2 == 0) {
      x = 0 - this.max;
      speed = Math.random() * 2;
    } else {
      x = this.stageWidth + this.max;
      speed = -Math.random() * 2;
    }
    return { x: x, y: y, speed: speed, radius: radius };
  }
}
