import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { collide } from "./utils.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.page = 1;
    this.curFile = 0;

    this.ibxFiles = [
      "file1",
      "file2",
      "file3",
      "file4",
      "file5",
      "file6",
      "file7",
      "file8",
      "file9",
      "file10",
      "file11",
      "file12",
      "file13",
      "file14",
      "file15",
      "file16",
      "file17",
      "file18",
      "file19",
      "file20",
    ];

    this.snowballs = [];
    this.list = [];
    this.spaceSize = 250;

    this.snowpacks = [];

    this.snowballPos = {
      x: 0,
      y: 0,
      radius: 75,
      speed: 5,
    };

    this.mousePos = {
      x: 0,
      y: 0,
    };

    this.step = 1;
    this.selected;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.moveY = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.swipeDir = null;

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);
    document.addEventListener("wheel", this.onWheel.bind(this), false);

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.curFile = 0;

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.createSnowballs();
  }

  createSnowballs() {
    this.step = 1;
    this.snowballs = [];
    this.snowpacks = [];
    this.columns = Math.floor(this.stageWidth / this.spaceSize);
    this.rows = Math.floor(this.stageHeight / this.spaceSize);

    this.snowballCnt = this.columns * this.rows;

    this.curCol = 0;
    this.curRow = 0;

    for (let i = 0; i < this.snowballCnt; i++) {
      this.addSnowball();

      this.curCol++;
      if (this.curCol >= this.columns) {
        this.curCol = 0;
        this.curRow++;
      }
    }
  }

  addSnowball() {
    if (this.page == 1) {
      this.list = this.ibxFiles;
    }

    this.snowballPos.x = Math.floor(
      Math.random() * (this.stageWidth - this.snowballPos.radius * 4) +
        this.snowballPos.radius * 2
    );
    this.snowballPos.y = Math.floor(
      Math.random() * (this.stageHeight - this.snowballPos.radius * 4) +
        this.snowballPos.radius * 2
    );

    for (let i = 0; i < this.snowballs.length; i++) {
      const snowball = this.snowballs[i];
      if (
        collide(
          snowball.x,
          snowball.sy,
          this.snowballPos.x,
          this.snowballPos.y,
          snowball.radius
        )
      ) {
        console.log("collided");
      }
    }

    this.snowballs.push(
      new Snowball(
        this.snowballPos.x,
        this.snowballPos.y,
        this.snowballPos.radius,
        Math.random() * (this.snowballPos.speed / 2) + this.snowballPos.speed,
        this.list[this.curFile]
      )
    );
    this.curFile++;

    if (this.curFile >= this.list.length) {
      this.curFile = 0;
    }
  }

  addSnowpack(x, y, radius) {
    this.snowpacks.push(new Snowpack(x, y, radius));
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveY *= 0.95;

    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i];
      snowball.draw(this.ctx, this.moveY, this.ca);

      if (snowball.sy >= this.stageHeight + this.snowballPos.radius / 2) {
        this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
        this.snowballs.splice(i, 1);
        this.addSnowball();
      }
    }

    for (let i = this.snowpacks.length - 1; i >= 0; i--) {
      const snowpack = this.snowpacks[i];
      snowpack.draw(this.ctx);

      if (snowpack.alpha <= 0) {
        this.snowpacks.splice(i, 1);
      }
    }
    switch (this.step) {
      case 1:
        break;

      case 2:
        break;
    }
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.moveY = 0;
    this.offsetX = e.clientX;
    this.offsetY = e.clientY;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = (e.clientX - this.offsetX) * 3;
      this.offsetX = e.clientX;
      this.moveY = (e.clientY - this.offsetY) * 3;
      this.offsetY = e.clientY;
    }
  }

  onUp(e) {
    this.isDown = false;
    this.handleSwipe();

    this.offsetX = e.clientX;
    this.offsetY = e.clientY;

    for (let i = 0; i < this.snowballs.length; i++) {
      const snowball = this.snowballs[i];
      const distance = Math.sqrt(
        (snowball.x - this.offsetX) * (snowball.x - this.offsetX) +
          (snowball.sy - this.offsetY) * (snowball.sy - this.offsetY)
      );

      if (distance < snowball.radius) {
        this.selected = snowball.file;
        this.step = 2;
      }
    }
  }

  onWheel(e) {
    this.moveY = e.deltaY * 0.175;
  }

  handleSwipe() {}
}

window.onload = () => {
  new App();
};
