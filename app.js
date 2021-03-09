import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { SnowParticle } from "./snowParticle.js";
import { collide, distance } from "./utils.js";

class App {
  constructor() {
    this.darkModBtn = document.createElement("button");
    this.darkModBtn.className = "btn-toggle";
    this.darkModBtn.innerHTML = "Dark Mode";
    document.body.appendChild(this.darkModBtn);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    const btn = document.querySelector(".btn-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    btn.addEventListener("click", function () {
      if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
      } else {
        document.body.classList.toggle("dark-theme");
      }
    });

    // image preloader
    this.loadedImages = 0;

    this.totalPages = 3;

    this.curFile = 0;
    this.snowballCnt = 0;

    this.page = 1;

    this.ibxFiles = [
      { img: "./assets/brands/klm_logo.png", brand: "KLM" },
      { img: "./assets/brands/nike_logo.png", brand: "Nike" },
      { img: "./assets/brands/disney_world_logo.png", brand: "Disney World" },
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

    this.lanFiles = [
      "lan1",
      "lan2",
      "lan3",
      "lan4",
      "lan5",
      "lan6",
      "lan7",
      "lan8",
      "lan9",
      "lan10",
      "lan11",
      "lan12",
      "lan13",
      "lan14",
      "lan15",
      "lan16",
      "lan17",
      "lan18",
      "lan19",
      "lan20",
    ];

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
      speed: 8,
    };
    this.completed = 0;
    this.pageLoading = true;

    this.mousePos = {
      x: 0,
      y: 0,
    };

    this.deltaX = 0;
    this.deltaY = 0;

    this.step = 1;
    this.selected;

    this.isBeingAnimated = false;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.preloaded = [];

    this.preloadImages();

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

  preloadImages() {
    for (var i = 0; i < this.ibxFiles.length; i++) {
      const tempImage = new Image();

      tempImage.addEventListener("load", this.trackProgress.bind(this), true);
      tempImage.src = this.ibxFiles[i].img;

      this.ibxFiles[i]["loadedImg"] = tempImage;
    }
  }

  trackProgress() {
    this.loadedImages++;

    if (this.loadedImages == this.ibxFiles.length) {
      this.resize();
    }
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
    this.snowParticles = [];
    for (let i = 0; i < this.snowParticlesCnt; i++) {
      this.snowParticles.push(
        new SnowParticle(this.stageWidth, this.stageHeight)
      );
    }
  }

  createSnowballs() {
    switch (this.page) {
      case 1:
        this.files = this.ibxFiles;
        break;
      case 2:
        this.files = this.lanFiles;
        break;
      case 3:
        this.files = this.carFiles;
        break;
    }

    this.step = 1;
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
      : (this.snowball.radius = 75);

    for (let i = 0; i < this.snowballCnt; i++) {
      if (this.files) {
        this.addSnowball();

        this.curRow++;
      }
    }
  }

  addSnowball() {
    this.snowball.x =
      Math.random() * (this.stageWidth - this.snowball.radius * 4) +
      this.snowball.radius;

    this.snowball.y =
      this.stageHeight -
      ((this.stageHeight - this.snowball.radius * 2) / this.snowballCnt) *
        this.curRow -
      this.snowball.radius * 2;

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
            Math.random() * (this.stageWidth - this.snowball.radius * 3) +
            this.snowball.radius;

          this.snowball.y =
            this.stageHeight -
            ((this.stageHeight - this.snowball.radius * 2) / this.snowballCnt) *
              this.curRow -
            this.snowball.radius * 2;
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

    for (let i = this.snowpacks.length - 1; i >= 0; i--) {
      const snowpack = this.snowpacks[i];
      snowpack.draw(this.ctx);

      if (snowpack.alpha <= 0) {
        this.snowpacks.splice(i, 1);
      }
    }

    switch (this.step) {
      case 1:
        this.completed = 0;
        if (this.completed < this.snowballs.length) {
          this.isBeingAnimated = true;
        }
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

          snowball.draw(this.ctx);

          if (snowball.sy > snowball.y) {
            snowball.speed = 0;
            this.completed++;
          } else {
            snowball.sy += snowball.speed;
          }
        }
        if (this.completed === this.snowballs.length) {
          this.isBeingAnimated = false;
        }

        if (!this.isBeingAnimated) {
          this.step = 2;
        }

        break;

      case 2:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          snowball.draw(this.ctx);
        }

        break;

      case 3:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          this.moveX *= 0.9;
          this.moveY *= 0.99;
          snowball.sx += this.moveX;

          if (this.moveY > 0) {
            snowball.sy += this.moveY;
          }

          snowball.draw(this.ctx);

          if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.addSnowball();
            this.snowballs.splice(i, 1);
          }
        }

        break;
      case 4:
        // moving back to position
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

          if (snowball.sx < snowball.x) {
            snowball.sx += 10;
            if (snowball.sx > snowball.x) {
              snowball.sx = snowball.x;
            }
          }
          if (snowball.sx > snowball.x) {
            snowball.sx -= 10;
            if (snowball.sx < snowball.x) {
              snowball.sx = snowball.x;
            }
          }

          snowball.draw(this.ctx);
        }
        break;
      case 5:
        this.completed = 0;
        if (this.completed < this.snowballs.length) {
          this.isBeingAnimated = true;
        }

        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

          snowball.sx += this.moveX * 5;

          snowball.draw(this.ctx);

          if (
            snowball.sx >= this.stageWidth + snowball.radius / 2 ||
            snowball.sx <= -snowball.radius / 2
          ) {
            this.completed++;
          }
        }

        if (this.completed === this.snowballs.length) {
          this.isBeingAnimated = false;
        }

        if (!this.isBeingAnimated) {
          this.step = 6;
          this.createSnowballs();
        }

        break;
      case 6:
        this.completed = 0;
        if (this.completed < this.snowballs.length) {
          this.isBeingAnimated = true;
        }
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

          snowball.draw(this.ctx);

          if (snowball.sy > snowball.y) {
            snowball.speed = 0;
            this.completed++;
          } else {
            snowball.sy += snowball.speed;
          }
        }
        if (this.completed === this.snowballs.length) {
          this.isBeingAnimated = false;
        }

        if (!this.isBeingAnimated) {
          this.step = 2;
        }

        break;
    }

    // console.log(`${this.curFile} / ${this.files.length}`);
  }

  onDown(e) {
    if (!this.isBeingAnimated) {
      this.step = 3;
    }

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
      this.moveY = (e.clientY - this.offsetY) * 2.5;
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
    if (e.deltaY > 0) {
      if (!this.isBeingAnimated) {
        this.step = 3;
      }
      this.moveY = e.deltaY * 0.175;
    }
  }

  handleSwipe() {
    this.deltaX = this.endX - this.startX;
    this.deltaY = this.endY - this.startY;

    // Scroll left
    if (Math.abs(this.deltaX) > Math.abs(this.deltaY) && this.deltaX < 0) {
      if (Math.abs(this.deltaX) < this.stageWidth * 0.33) {
        if (!this.isBeingAnimated) {
          this.step = 4;
        }
      } else {
        if (!this.isBeingAnimated) {
          this.page--;
          if (this.page < 1) {
            this.page = 3;
          }
          this.step = 5;
        }
      }
    }

    // Scroll Right
    if (Math.abs(this.deltaX) > Math.abs(this.deltaY) && this.deltaX > 0) {
      if (Math.abs(this.deltaX) < this.stageWidth * 0.33) {
        if (!this.isBeingAnimated) {
          this.step = 4;
        }
      } else {
        if (!this.isBeingAnimated) {
          this.page++;
          if (this.page > this.totalPages) {
            this.page = 1;
          }
          this.step = 5;
        }
      }
    }

    // Scroll Up
    if (Math.abs(this.deltaX) < Math.abs(this.deltaY) && this.deltaY < 0) {
      if (!this.isBeingAnimated) {
        this.step = 3;
      }
    }

    // Scroll Down
    if (Math.abs(this.deltaX) < Math.abs(this.deltaY) && this.deltaY > 0) {
      if (!this.isBeingAnimated) {
        this.step = 3;
      }
    }

    if (Math.abs(this.deltaX) < 10 && Math.abs(this.deltaY) < 10) {
      for (let i = 0; i < this.snowballs.length; i++) {
        const snowball = this.snowballs[i];
        const dist = distance(snowball.x, snowball.sy, this.endX, this.endY);

        if (dist < snowball.radius) {
          this.selected = snowball.file;
        }
      }
      if (this.selected) {
        this.selected = null;
      }
    }
  }
}

window.onload = () => {
  new App();
};
