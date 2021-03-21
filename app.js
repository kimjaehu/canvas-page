import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { SnowParticle } from "./snowParticle.js";
import { Card } from "./card.js";
import { collide, distance, easeIn } from "./utils.js";
import { Status } from "./status.js";

class App {
  constructor() {
    this.logo = document.createElement("div");
    this.logo.className = "logo neumorphism--text";
    this.logo.innerHTML = "noon";
    document.body.appendChild(this.logo);

    this.darkModBtn = document.createElement("button");
    this.darkModBtn.className = "ui__btn-toggle";
    this.darkModBtn.innerHTML = "Dark Mode";
    document.body.appendChild(this.darkModBtn);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.btn = document.querySelector(".ui__btn-toggle");
    this.btn.addEventListener("click", this.darkModeToggle.bind(this), false);

    this.status = new Status();
    // image preloader
    this.loadedImages = 0;

    this.totalPages = 3;

    this.curFile = 0;
    this.snowballCnt = 0;

    this.page = 1;

    this.files = [
      {
        category: "brand",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
        content: "",
      },
      {
        category: "brand",
        img: "./assets/brand/nike_logo.png",
        title: "Nike",
        url: "/nike.html",
      },
      {
        category: "brand",
        img: "./assets/brand/disney_world_logo.png",
        title: "Disney World",
        url: "/disney_world.html",
      },

      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "car",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },

      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "lan",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
    ];

    this.curFiles = [];
    this.brandFiles = [];
    this.carFiles = [];
    this.lanFiles = [];

    this.snowParticles = [];
    this.snowParticlesCnt = 100;

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
      speed: 50,
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
    this.cardOpened = false;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.preloaded = [];

    this.preloadImages();

    this.card = new Card();

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

  darkModeToggle() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
      this.darkTheme = true;
      document.body.classList.toggle("light-theme");
      if (document.body.classList.contains("light-theme")) {
        this.darkTheme = false;
      }
    } else {
      this.darkTheme = false;
      document.body.classList.toggle("dark-theme");
      if (document.body.classList.contains("dark-theme")) {
        this.darkTheme = true;
      }
    }
  }

  preloadImages() {
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const tempImage = new Image();

      tempImage.addEventListener("load", this.trackProgress.bind(this), true);
      tempImage.src = file.img;

      file["loadedImg"] = tempImage;

      switch (file.category) {
        case "brand":
          this.brandFiles.push(file);
          break;
        case "car":
          this.carFiles.push(file);
          break;
        case "lan":
          this.lanFiles.push(file);
          break;
      }
    }
  }

  trackProgress() {
    this.loadedImages++;

    if (this.loadedImages == this.files.length) {
      this.resize();
    }
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.status.resize(this.stageWidth, this.stageHeight);
    this.card.resize(this.stageWidth, this.stageHeight);

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
        this.curFiles = this.brandFiles;
        break;
      case 2:
        this.curFiles = this.carFiles;
        break;
      case 3:
        this.curFiles = this.lanFiles;
        break;
    }

    this.step = 1;

    this.snowballs = [];

    this.curFile = 0;
    this.curRow = 0;

    if (this.stageWidth <= 640) {
      this.rows = 4;
    } else {
      this.rows = 6;
    }

    this.snowballCnt = Math.min(this.rows, this.curFiles.length);

    this.columnWidth = Math.floor(this.stageWidth / this.snowballCnt);
    this.columnHeight = Math.floor(this.stageHeight / this.snowballCnt);

    this.columnSize = Math.min(this.columnWidth, this.columnHeight);

    this.stageWidth <= 640
      ? (this.snowball.radius = 60)
      : (this.snowball.radius = 75);

    for (let i = 0; i < this.snowballCnt; i++) {
      if (this.curFiles) {
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

    if (this.curFile >= this.curFiles.length) {
      this.curFile = 0;
    }

    this.snowballs.push(
      new Snowball(
        this.snowball.x,
        this.snowball.y,
        this.snowball.radius,
        Math.random() * (this.snowball.speed / 2) + this.snowball.speed,
        this.curFiles[this.curFile]
      )
    );

    this.curFile++;
  }

  addSnowpack(x, y, radius) {
    this.snowpacks.push(new Snowpack(x, y, radius));
  }

  animate(t) {
    this.rafId = requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = this.snowParticles.length - 1; i >= 0; i--) {
      const snowParticle = this.snowParticles[i];
      snowParticle.draw(this.ctx);

      if (snowParticle.y >= this.stageHeight) {
        snowParticle.y = 0;
      }
    }

    this.status.draw(this.ctx, this.curFile, this.curFiles.length);

    for (let i = this.snowpacks.length - 1; i >= 0; i--) {
      const snowpack = this.snowpacks[i];
      snowpack.draw(this.ctx);

      if (snowpack.alpha <= 0) {
        this.snowpacks.splice(i, 1);
      }
    }

    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i];

      snowball.draw(this.ctx);
    }

    switch (this.step) {
      case 1:
        this.completed = 0;
        if (this.completed < this.snowballs.length) {
          this.isBeingAnimated = true;
        }
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

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
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }
        break;

      case 2:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
        }
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
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

          if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.addSnowball();
            this.snowballs.splice(i, 1);
          }
        }

        this.status.radius += 30;
        this.status.fontSize -= 10;
        if (this.status.radius >= 150) {
          this.status.radius = 150;
        }

        if (this.status.fontSize <= 150) {
          this.status.fontSize = 150;
        }

        break;
      case 4:
        // moving back to position
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          this.moveY *= 0.99;

          if (this.moveY > 0) {
            snowball.sy += this.moveY;
          }

          if (snowball.sx < snowball.x) {
            snowball.sx += 50;
            if (snowball.sx > snowball.x) {
              snowball.sx = snowball.x;
            }
          }
          if (snowball.sx > snowball.x) {
            snowball.sx -= 50;
            if (snowball.sx < snowball.x) {
              snowball.sx = snowball.x;
            }
          }

          if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.addSnowball();
            this.snowballs.splice(i, 1);
          }

          this.status.radius -= 10;
          this.status.fontSize += 10;
          if (this.status.radius <= 0) {
            this.status.radius = 0;
          }

          if (this.status.fontSize >= 200) {
            this.status.fontSize = 200;
          }
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

        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }
        break;
      case 6:
        this.completed = 0;
        if (this.completed < this.snowballs.length) {
          this.isBeingAnimated = true;
        }
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];

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
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }

        break;

      case 7:
        this.cardOpened = true;
        this.card.posY = easeIn(this.card.posY, this.stageHeight * 0.9, 0.1);

        this.card.draw(this.ctx);
        this.card.alpha = easeIn(this.card.alpha, 1, 0.1);

        if (
          this.card.posY >= this.stageHeight * 0.9 - 1 &&
          this.card.alpha >= 1 - 0.01
        ) {
          this.card.posY = this.stageHeight * 0.9;
          this.card.alpha = 1;
          this.step = 8;
        }
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }
        break;

      case 8:
        this.card.draw(this.ctx);

        break;

      case 9:
        break;

      case 10:
        // this.card.posY = this.card.posY + (0 - this.card.posY) * 0.1;
        this.card.posY = easeIn(this.card.posY, 0, 0.1);
        this.card.draw(this.ctx);

        if (this.card.posY <= +10) {
          this.card.posY = 0;
          this.cardOpened = false;
          this.step = 2;
        }
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }
        break;

      case 11:
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= 200) {
          this.status.fontSize = 200;
        }
        break;
    }
  }

  onDown(e) {
    if (!this.isBeingAnimated && !this.cardOpened) {
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
      this.moveY = e.clientY - this.offsetY;
      this.offsetY = e.clientY;
    }
  }

  onUp(e) {
    this.isDown = false;
    this.endX = e.clientX;
    this.endY = e.clientY;

    if (!this.cardOpened) {
      this.handleSwipe();
    } else {
      this.cardBtn();
    }
  }

  onWheel(e) {
    if (e.deltaY > 0) {
      if (!this.isBeingAnimated && !this.cardOpened) {
        this.step = 3;
      }
      this.moveY = e.deltaY * 0.175;
    }
  }

  cardBtn() {
    this.step = 10;
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
        if (Math.abs(this.deltaX) < this.stageWidth * 0.33) {
          if (!this.isBeingAnimated) {
            this.step = 4;
          }
        } else {
          this.step = 11;
        }
      }
    }

    // Scroll Down
    if (Math.abs(this.deltaX) < Math.abs(this.deltaY) && this.deltaY > 0) {
      if (!this.isBeingAnimated) {
        if (Math.abs(this.deltaX) < this.stageWidth * 0.33) {
          if (!this.isBeingAnimated) {
            this.step = 4;
          }
        } else {
          this.step = 3;
        }
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
        this.step = 7;
        this.selected = null;
      } else {
        this.step = 4;
      }
    }
  }
}

window.onload = () => {
  new App();
};
