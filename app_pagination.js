import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { SnowParticle } from "./snowParticle.js";
import { collide } from "./utils.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.totalPages = 0;

    this.page = 1;
    this.curfile = 1;

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

    this.files = this.ibxFiles;

    this.snowParticles = [];
    this.snowParticlesCnt = 200;

    this.snowballs = [];
    this.snowpacks = [];
    this.snowballSize = 0;
    this.columnSize = 0;

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

    this.stageWidth <= 640 ? (this.columns = 4) : (this.columns = 6);

    this.columnWidth = Math.floor(this.stageWidth / (this.columns + 4));
    this.columnHeight = Math.floor(this.stageHeight / 2);

    this.columnSize = Math.min(this.columnWidth, this.columnHeight);

    this.stageWidth <= 640
      ? (this.snowball.radius = this.columnSize)
      : (this.snowballs.radius = 125);

    if (this.page == 1) {
    }

    this.snowballs = [];
    this.snowpacks = [];

    this.curCol = 0;
    this.curRow = 0;

    this.totalPages = Math.ceil(this.files.length / this.columns);

    //Pagination indicator
    // console.log(`${this.page}/${this.totalPages}`);

    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i]) {
        const file = this.files[i];

        this.snowball.x =
          this.columnWidth * 1.5 +
          this.curCol * (this.stageWidth / (this.columns + 1));

        if (this.stageWidth <= 1100) {
          if (i % 2 === 0) {
            this.snowball.y = this.stageHeight / 2;
          } else {
            this.snowball.y =
              this.stageHeight / 2 +
              this.columnHeight / 4 +
              this.columnHeight / 4;
          }
        } else {
          this.snowball.y = this.stageHeight / 2 + this.columnHeight / 8;
        }

        this.snowballs.push(
          new Snowball(
            this.snowball.x,
            this.snowball.y,
            this.snowball.radius,
            Math.random() * (this.snowball.speed / 2) + this.snowball.speed,
            file
          )
        );

        this.curCol++;
        if (this.curCol >= this.columns) {
          this.curCol = 0;
        }
      }
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

    switch (this.step) {
      case 1:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          this.moveY = 0;
          snowball.draw(this.ctx, this.moveY);

          // if (snowball.sy > snowball.y) {
          //   snowball.speed = 0;
          // } else {
          //   snowball.sy += snowball.speed;
          // }

          if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.snowballs.splice(i, 1);
          }
        }

        if (this.snowballs.every((snowball) => snowball.sy > snowball.y)) {
          this.step = 2;
        }
        break;

      case 2:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          snowball.draw(this.ctx, this.moveY);

          if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.snowballs.splice(i, 1);

            this.page = 2;
            this.createSnowballs();
          }
        }
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
    this.moveY = e.deltaY * 0.175;
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
    for (let i = 0; i < this.snowballs.length; i++) {
      const snowball = this.snowballs[i];
      const distance = Math.sqrt(
        (snowball.x - this.endX) * (snowball.x - this.endX) +
          (snowball.sy - this.endY) * (snowball.sy - this.endY)
      );

      if (distance < snowball.radius) {
        this.selected = snowball.file;
        // this.step = 2;
      }
    }

    if (this.selected) {
      console.log(this.selected);
      this.selected = null;
    }
  }
}

window.onload = () => {
  new App();
};
