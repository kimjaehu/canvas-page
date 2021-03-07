import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { SnowParticle } from "./snowParticle.js";
import { collide, distance } from "./utils.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.totalPages = 0;

    this.curFile = 0;
    this.snowballCnt = 0;

    this.ibxFiles = [
      "ibx1",
      "ibx2",
      "ibx3",
      "ibx4",
      "ibx5",
      "ibx6",
      "ibx7",
      "ibx8",
      "ibx9",
      "ibx10",
      "ibx11",
      "ibx12",
    ];

    this.carFiles = [
      "car1",
      "car2",
      "car3",
      "car4",
      "car5",
      "car6",
      "car7",
      "car8",
      "car9",
      "car10",
      "car11",
      "car12",
      "car13",
      "car14",
      "car15",
      "car16",
      "car17",
      "car18",
      "car19",
      "car20",
    ];

    this.files = this.ibxFiles;

    this.snowParticles = [];
    this.snowParticlesCnt = 200;

    this.snowballs = [];
    this.snowpacks = [];

    // ui related
    this.columnSize = 0;
    this.rows = 0;
    this.curRow = 0;

    this.snowball = {
      x: 0,
      y: 0,
      radius: 75,
      speed: 5,
    };

    this.pageLoading = true;

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
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.createSnowparticles();
    this.createSnowballs();
  }

  createSnowparticles() {
    this.rows = 1;

    this.snowParticles = [];
    for (let i = 0; i < this.snowParticlesCnt; i++) {
      this.snowParticles.push(
        new SnowParticle(this.stageWidth, this.stageHeight)
      );
    }
  }

  createSnowballs() {
    //make it responsive >1920px
    this.snowballs = [];
    this.curFile = 0;
    this.curRow = 0;

    if (this.stageWidth <= 640) {
      this.rows = 4;
    } else {
      this.rows = 6;
    }

    this.snowballCnt = Math.min(this.rows, this.files.length);

    this.columnWidth = Math.floor(this.stageWidth / this.snowballCnt);
    this.columnHeight = Math.floor(this.stageHeight / this.snowballCnt);

    this.columnSize = Math.min(this.columnWidth, this.columnHeight);

    this.stageWidth <= 640
      ? (this.snowball.radius = 60)
      : (this.snowball.radius = 80);

    this.snowballs = [];
    this.snowpacks = [];

    for (let i = 0; i < this.snowballCnt; i++) {
      if (this.files) {
        this.addSnowball();

        this.curRow++;
      }
    }
  }

  addSnowball() {
    this.snowball.x =
      Math.random() * (this.stageWidth - this.snowball.radius * 2) +
      this.snowball.radius;

    this.snowball.y = this.stageHeight - this.columnHeight * this.curRow;

    // this.snowball.radius -
    // ((this.stageHeight - this.snowball.radius) / (this.rows + 2)) *
    //   (this.curRow + 1);

    if (this.snowballs) {
      for (let i = 0; i < this.snowballs.length; i++) {
        const snowball = this.snowballs[i];

        if (
          collide(
            snowball.x,
            snowball.y,
            this.snowball.radius,
            this.snowball.x,
            this.snowball.y,
            this.snowball.radius
          )
        ) {
          this.snowball.x =
            Math.random() * (this.stageWidth - this.snowball.radius) +
            this.snowball.radius;

          this.snowball.y =
            this.stageHeight -
            this.snowball.radius -
            ((this.stageHeight - this.snowball.radius) / (this.rows + 2)) *
              (this.curRow + 1);
        }
      }
    }

    this.snowballs.push(
      new Snowball(
        this.snowball.x,
        this.snowball.y,
        this.snowball.radius,
        Math.random() * (this.snowball.speed / 2) + this.snowball.speed,
        this.files[this.curFile]
      )
    );
    this.curFile++;
    if (this.curFile >= this.files.length) {
      this.curFile = 0;
    }
  }

  addSnowpack(x, y, radius) {
    this.snowpacks.push(new Snowpack(x, y, radius));
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = this.snowParticles.length - 1; i >= 0; i--) {
      const snowParticle = this.snowParticles[i];
      snowParticle.draw(this.ctx);

      if (snowParticle.y >= this.stageHeight) {
        snowParticle.y = 0;
      }
    }

    this.moveY *= 0.95;

    for (let i = this.snowpacks.length - 1; i >= 0; i--) {
      const snowpack = this.snowpacks[i];
      snowpack.draw(this.ctx);

      if (snowpack.alpha <= 0) {
        this.snowpacks.splice(i, 1);
      }
    }

    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i];

      snowball.draw(this.ctx, this.moveY);

      if (snowball.sy > snowball.y) {
        snowball.speed = 0;
      } else {
        snowball.sy += snowball.speed;
      }

      if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
        this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
        this.addSnowball();
        this.snowballs.splice(i, 1);
      }
    }

    switch (this.step) {
      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.moveY = 0;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.offsetX = e.clientX;
    this.offsetY = e.clientY;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
      this.moveY = e.clientY - this.offsetY;
      this.offsetY = e.clientY;
    }
  }

  onUp(e) {
    this.isDown = false;
    this.endX = e.clientX;
    this.endY = e.clientY;

    this.handleSwipe();
  }

  onWheel(e) {
    e.deltaY > 0 && (this.moveY = e.deltaY * 0.175);
  }

  /*
      Touch down, store time and position
      Touch up, store time and position
      In the same handler as touch up continue with these steps:

      Subtract start time from end time
      Calculate distance between start point and end point
      Calculate angle between start point and end point
      To get a factor to relate to you divide distance on time difference. The higher value the faster the velocity.
  */

  handleSwipe() {
    console.log(this.endX - this.startX, this.endY - this.startY);

    if (
      Math.abs(this.endX - this.startX) < 10 &&
      Math.abs(this.endY - this.startY) < 10
    ) {
      for (let i = 0; i < this.snowballs.length; i++) {
        const snowball = this.snowballs[i];
        const dist = distance(snowball.x, snowball.sy, this.endX, this.endY);

        if (dist < snowball.radius) {
          this.selected = snowball.file;
        }
      }
      console.log(this.selected);
      if (this.selected) {
        this.selected = null;
      }
    }
  }
}

window.onload = () => {
  new App();
};
