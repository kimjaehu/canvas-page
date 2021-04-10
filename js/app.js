import { Snowball } from "./snowball.js";
import { Snowpack } from "./snowpack.js";
import { SnowParticle } from "./snowParticle.js";
import { Card } from "./card.js";
import { collide, distance, easeIn } from "./utils.js";
import { Status } from "./status.js";
import { Menu } from "./menu.js";
// import { Icon } from "./icon.js";
// import { Logo } from "./logo.js";

const COLOR_LIGHT = {
  systemText: { r: 0, g: 0, b: 0 },

  systemBlue: { r: 0, g: 122, b: 255 },
  systemGreen: { r: 52, g: 199, b: 89 },
  systemIndigo: { r: 88, g: 86, b: 214 },
  systemOrange: { r: 255, g: 149, b: 0 },
  systemPink: { r: 255, g: 45, b: 85 },
  systemPurple: { r: 175, g: 82, b: 222 },
  systemRed: { r: 255, g: 59, b: 48 },
  systemTeal: { r: 90, g: 200, b: 250 },
  systemYellow: { r: 255, g: 204, b: 0 },

  systemGray: { r: 142, g: 142, b: 147 },
  systemGray2: { r: 174, g: 175, b: 178 },
  systemGray3: { r: 199, g: 199, b: 204 },
  systemGray4: { r: 209, g: 209, b: 214 },
  systemGray5: { r: 229, g: 229, b: 234 },
  systemGray6: { r: 242, g: 242, b: 247 },
};

const COLOR_DARK = {
  systemText: { r: 255, g: 255, b: 255 },

  systemBlue: { r: 10, g: 132, b: 255 },
  systemGreen: { r: 48, g: 209, b: 88 },
  systemIndigo: { r: 94, g: 92, b: 230 },
  systemOrange: { r: 255, g: 159, b: 10 },
  systemPink: { r: 255, g: 55, b: 95 },
  systemPurple: { r: 191, g: 90, b: 242 },
  systemRed: { r: 255, g: 69, b: 58 },
  systemTeal: { r: 100, g: 210, b: 255 },
  systemyellow: { r: 255, g: 214, b: 10 },

  systemGray: { r: 142, g: 142, b: 147 },
  systemGray2: { r: 99, g: 99, b: 102 },
  systemGray3: { r: 72, g: 72, b: 74 },
  systemGray4: { r: 58, g: 58, b: 60 },
  systemGray5: { r: 44, g: 44, b: 46 },
  systemGray6: { r: 28, g: 28, b: 30 },
};

class App {
  constructor() {
    this.nav = document.createElement("nav");

    this.logoDiv = document.createElement("div");
    this.logoDiv.className = "logo";
    this.logo = document.createElement("a");
    this.logo.href = "/";
    this.logo.innerHTML = "nooon";

    this.logoDiv.appendChild(this.logo);

    this.aboutBtn = document.createElement("div");
    this.aboutBtn.className = "about-btn";
    this.aboutA = document.createElement("a");
    this.aboutA.innerHTML = "about";

    this.aboutBtn.appendChild(this.aboutA);

    this.aboutBtn.addEventListener(
      "click",
      this.onClickAbout.bind(this),
      false
    );

    this.nav.append(this.logoDiv, this.aboutBtn);

    this.cursorUp = document.createElement("div");
    this.cursorUp.className = "cursor--up";
    this.cursorUp.innerHTML = "Up";
    this.arrowUp = document.createElement("div");
    this.arrowUp.className = "cursor__arrow-up";
    this.cursorDown = document.createElement("div");
    this.cursorDown.className = "cursor--down";
    this.cursorDown.innerHTML = "Down";
    this.arrowDown = document.createElement("div");
    this.arrowDown.className = "cursor__arrow-down";
    this.cursorLeft = document.createElement("div");
    this.cursorLeft.className = "cursor--left";
    this.cursorLeft.innerHTML = "words";
    this.arrowLeft = document.createElement("div");
    this.arrowLeft.className = "cursor__arrow-left";
    this.cursorRight = document.createElement("div");
    this.cursorRight.className = "cursor--right";
    this.cursorRight.innerHTML = "cars";
    this.arrowRight = document.createElement("div");
    this.arrowRight.className = "cursor__arrow-right";
    this.nav.append(
      this.cursorUp,
      this.cursorDown,
      this.cursorLeft,
      this.cursorRight,
      this.arrowUp,
      this.arrowDown,
      this.arrowLeft,
      this.arrowRight
    );

    document.body.appendChild(this.nav);

    this.mouseCursor = document.createElement("div");
    this.mouseCursor.className = "cursor";

    document.body.appendChild(this.mouseCursor);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.footer = document.createElement("footer");
    this.divSocial = document.createElement("div");
    this.divSocial.className = "social-icons";

    this.youtubeBtn = document.createElement("div");
    this.youtubeBtn.classList.add("social-icons__btn");

    this.youtubeA = document.createElement("a");
    this.youtubeA.classList.add("social-icons__link--youtube");
    this.youtubeA.setAttribute("href", "https://www.youtube.com");
    this.youtubeA.setAttribute("target", "_blank");
    this.youtubeSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.youtubeSvg.classList.add("social-icons__svg");
    this.youtubeSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.youtubeSvg.setAttributeNS(null, "viewBox", "0 0 24 24");
    this.youtubePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.youtubePath.setAttributeNS(
      null,
      "d",
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    );

    this.youtubeSvg.appendChild(this.youtubePath);
    this.youtubeA.appendChild(this.youtubeSvg);
    this.youtubeBtn.appendChild(this.youtubeA);

    this.instagramBtn = document.createElement("div");
    this.instagramBtn.classList.add("social-icons__btn");

    this.instagramA = document.createElement("a");
    this.instagramA.classList.add("social-icons__link--instagram");
    this.instagramA.setAttribute("href", "https://www.instagram.com/kjh__cc/");
    this.instagramA.setAttribute("target", "_blank");

    this.instagramSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.instagramSvg.classList.add("social-icons__svg");
    this.instagramSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.instagramSvg.setAttributeNS(null, "viewBox", "0 0 24 24");
    this.instagramPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.instagramPath.setAttributeNS(
      null,
      "d",
      "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
    );

    this.instagramSvg.appendChild(this.instagramPath);
    this.instagramA.appendChild(this.instagramSvg);
    this.instagramBtn.appendChild(this.instagramA);

    this.divSocial.append(this.youtubeBtn, this.instagramBtn);
    this.footer.appendChild(this.divSocial);
    document.body.appendChild(this.footer);

    // about modal content
    this.aboutDiv = document.createElement("div");
    this.aboutDiv.classList.add("about");
    this.aboutClose = document.createElement("div");
    this.aboutClose.classList.add("about__close");
    this.aboutCloseBtn = document.createElement("div");
    this.aboutCloseBtn.classList.add("about__close__btn");
    this.aboutCloseBtn.innerHTML = "x";

    this.aboutClose.appendChild(this.aboutCloseBtn);

    this.aboutContents = document.createElement("div");
    this.aboutContents.classList.add("about__contents");
    this.aboutTitle = document.createElement("H1");
    this.aboutTitle.classList.add("about__contents__title");
    this.aboutTitle.innerHTML = "nooon";

    this.aboutSubtitle = document.createElement("H2");
    this.aboutSubtitle.classList.add("about__contents__subtitle");
    this.aboutSubtitle.innerHTML =
      "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis rhoncus neque. Suspendisse facilisis fermentum venenatis.";

    this.aboutCopyright = document.createElement("p");
    this.aboutCopyright.classList.add("about_copyright");
    this.aboutCopyright.innerHTML = "© 2021 Jae Kim.  All rights reserved.";

    this.aboutBody1 = document.createElement("p");
    this.aboutBody1.classList.add("about__contents__body1");
    this.aboutBody1.innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis rhoncus neque. Suspendisse facilisis fermentum venenatis. Sed convallis odio sem, vel imperdiet augue sodales id. Suspendisse in mollis risus, eget sodales ante. Vestibulum tristique velit nec orci luctus, vitae egestas justo facilisis.";
    this.aboutBody2 = document.createElement("p");
    this.aboutBody2.classList.add("about__contents__body2");
    this.aboutBody2.innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis rhoncus neque. Suspendisse facilisis fermentum venenatis. Sed convallis odio sem, vel imperdiet augue sodales id. Suspendisse in mollis risus, eget sodales ante. Vestibulum tristique velit nec orci luctus, vitae egestas justo facilisis.";
    this.aboutContact = document.createElement("div");
    this.aboutContact.classList.add("about__contents__contact");
    this.aboutContactYoutube = document.createElement("span");
    this.aboutContactYoutube.classList.add("about__contents__contact__elem");
    this.aboutContactYoutubeA = document.createElement("a");
    this.aboutContactYoutubeA.innerHTML = "youtube";
    this.aboutContactYoutubeA.setAttribute("href", "https://www.youtube.com");
    this.aboutContactYoutubeA.setAttribute("target", "_blank");

    this.aboutContactYoutube.appendChild(this.aboutContactYoutubeA);

    this.aboutContactInstagram = document.createElement("span");
    this.aboutContactInstagram.classList.add("about__contents__contact__elem");
    this.aboutContactInstagramA = document.createElement("a");
    this.aboutContactInstagramA.innerHTML = "instagram";
    this.aboutContactInstagramA.setAttribute(
      "href",
      "https://www.instagram.com"
    );
    this.aboutContactInstagramA.setAttribute("target", "_blank");

    this.aboutContactInstagram.appendChild(this.aboutContactInstagramA);

    this.aboutMailTo = document.createElement("span");
    this.aboutMailTo.classList.add("about__contents__contact__elem");
    this.aboutMailToA = document.createElement("a");
    this.aboutMailToA.innerHTML = "e-mail";
    this.aboutMailToA.setAttribute("href", "mailto:kimjaehu@gmail.com");

    this.aboutMailTo.appendChild(this.aboutMailToA);

    this.aboutContact.append(
      this.aboutContactYoutube,
      this.aboutContactInstagram,
      this.aboutMailTo
    );

    this.aboutContents.append(
      this.aboutClose,
      this.aboutCopyright,
      this.aboutTitle,
      this.aboutBody1,
      this.aboutBody2,
      this.aboutContact
    );

    this.aboutDiv.appendChild(this.aboutContents);

    document.body.appendChild(this.aboutDiv);

    this.aboutCloseBtn.addEventListener(
      "click",
      this.onClickAboutClose.bind(this),
      false
    );

    // <div id="about" style="display: block; visibility: inherit; opacity: 1;">
    //             <div id="about-right" class="right-pos white">
    //                 <div id="about-close-bt" class="buttons close-pos" style="transform: matrix(1, 0, 0, 1, 0, 0);"></div>
    //             </div>

    //         <div id="about-contents">
    //                 <h1>Form Follows Function</h1>
    //                 <h2 style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"><span class="about-bold">Form Follows Function</span> project is a collection of entrancing and engrossing "interactive experiences", each experience has its own unique design and functionality. The award-winning project includes a spinning navigation wheel on the website, with each interactive experience represented by a poster. By clicking on a poster, an interactive experience opens up. Each one is as much a piece of art as it works beautifully on both desktop and tablet.</h2>
    //                 <p style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
    //                     If you want to contact me check out my<br>
    //                     <a href="http://cmiscm.com/" target="_blank"><span id="link-website" class="about-link">website</span></a> ・
    //                     <a href="http://blog.cmiscm.com" target="_blank"><span id="link-facebook" class="about-link about-link-dot">blog</span></a> ・
    //                     <a href="http://twitter.com/cmiscm" target="_blank"><span id="link-twitter" class="about-link about-link-dot">twitter</span></a> ・
    //                     <a href="mailto:cmiscm@gmail.com"><span id="link-email" class="about-link about-link-dot">e-mail</span></a>
    //                 </p>
    //                 <span class="copyright" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
    //                         Copyright © 2013-2018 Jongmin Kim. All rights reserved.
    //                     </span>

    //                 <div class="press" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
    //                     <a href="http://goo.gl/oA3JB2" class="chrome-ex" target="_blank">This is a Chrome Experiment</a><span> ・ </span><a href="http://goo.gl/ekvNQe" class="fast-com" target="_blank">Fast Company</a><span> ・ </span><a href="http://blog.cmiscm.com/?p=4105" class="ca-korea" target="_blank">Red Dot Award 2014</a>
    //                 </div>
    //             </div></div>

    // this.darkModBtn = document.createElement("button");
    // this.darkModBtn.className = "ui__btn-toggle";
    // this.darkModBtn.innerHTML = "Dark Mode";
    // document.body.appendChild(this.darkModBtn);

    // this.btn = document.querySelector(".ui__btn-toggle");
    // this.btn.addEventListener("click", this.darkModeToggle.bind(this), false);

    // image preloader
    this.loadedImages = 0;

    this.totalPages = 3;

    this.curFile = 0;
    this.snowballCnt = 0;

    this.page = 1;

    this.files = [
      {
        category: "Creative Coding",
        img: "./assets/brand/klm_logo.png",
        title: "Creative Coding: KLM",
        url: "./airplane",
        content: "",
      },
      {
        category: "Creative Coding",
        img: "./assets/brand/nike_logo.png",
        title: "Creative Coding: Nike",
        url: "/nike.html",
      },
      {
        category: "Creative Coding",
        img: "./assets/brand/disney_world_logo.png",
        title: "Creative Coding: Disney World",
        url: "./fireworks",
      },

      {
        category: "Car",
        img: "./assets/brand/klm_logo.png",
        title: "1KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/disney_world_logo.png",
        title: "2KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/klm_logo.png",
        title: "3KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/disney_world_logo.png",
        title: "4KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/nike_logo.png",
        title: "5KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/disney_world_logo.png",
        title: "6KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/nike_logo.png",
        title: "7KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/disney_world_logo.png",
        title: "8KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/klm_logo.png",
        title: "9KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/klm_logo.png",
        title: "10KLM",
        url: "/klm.html",
      },
      {
        category: "Car",
        img: "./assets/brand/nike_logo.png",
        title: "11KLM",
        url: "/klm.html",
      },

      {
        category: "Language",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/disney_world_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
      {
        category: "Language",
        img: "./assets/brand/klm_logo.png",
        title: "KLM",
        url: "/klm.html",
      },
    ];

    this.curFiles = [];
    this.brandFiles = [];
    this.carFiles = [];
    this.lanFiles = [];

    this.snowParticles = [];
    this.snowParticlesCnt = 75;

    this.snowballs = [];
    this.snowpacks = [];

    // ui related
    this.columnSize = 0;
    this.rows = 0;
    this.curRow = 0;

    this.statusRadius = 200;
    // this.statusFontSize = 200;

    this.snowball = {
      x: 0,
      y: 0,
      radius: 75,
      speed: 15,
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

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
      this.textColor = COLOR_DARK.systemText;
      this.cardColor = COLOR_DARK.systemGray6;
      this.normColor = COLOR_DARK.systemGray;
      this.accentColor = COLOR_DARK.systemTeal;
    } else {
      this.textColor = COLOR_LIGHT.systemText;
      this.cardColor = COLOR_LIGHT.systemGray6;
      this.accentColor = COLOR_LIGHT.systemTeal;
      this.normColor = COLOR_LIGHT.systemGray;
    }

    prefersDarkScheme.addEventListener("change", (e) => {
      if (e.matches) {
        this.textColor = COLOR_DARK.systemText;
        this.cardColor = COLOR_DARK.systemGray6;
        this.accentColor = COLOR_DARK.systemTeal;
        this.normColor = COLOR_DARK.systemGray;
      } else {
        this.textColor = COLOR_LIGHT.systemText;
        this.cardColor = COLOR_LIGHT.systemGray6;
        this.accentColor = COLOR_LIGHT.systemTeal;
        this.normColor = COLOR_LIGHT.systemGray;
      }
    });

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.preloaded = [];

    this.preloadImages();

    // this.logo = new Logo(this.textColor);
    this.menu = new Menu(this.textColor);
    this.status = new Status(this.accentColor, this.normColor, this.textColor);
    this.card = new Card(this.cardColor);
    // this.icon = new Icon(this.iconColorNormal, this.iconColorActive);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.moveY = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);

    document.addEventListener("wheel", this.onWheel.bind(this), false);

    requestAnimationFrame(this.animate.bind(this));
  }

  // darkModeToggle() {
  //   const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  //   if (prefersDarkScheme.matches) {
  //     this.darkTheme = true;
  //     document.body.classList.toggle("light-theme");
  //     if (document.body.classList.contains("light-theme")) {
  //       this.darkTheme = false;
  //     }
  //   } else {
  //     this.darkTheme = false;
  //     document.body.classList.toggle("dark-theme");
  //     if (document.body.classList.contains("dark-theme")) {
  //       this.darkTheme = true;
  //     }
  //   }
  // }

  preloadImages() {
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const tempImage = new Image();

      tempImage.addEventListener("load", this.trackProgress.bind(this), true);
      tempImage.src = file.img;

      file["loadedImg"] = tempImage;

      switch (file.category) {
        case "Creative Coding":
          this.brandFiles.push(file);
          break;
        case "Car":
          this.carFiles.push(file);
          break;
        case "Language":
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

    if (this.stageWidth * 0.25 < 250) {
      this.statusRadius = this.stageWidth * 0.3;
      this.statusFontSize = this.stageWidth * 0.3;
    } else {
      this.statusRadius = 250;
      this.statusFontSize = 250;
    }

    this.status.resize(this.stageWidth, this.stageHeight, this.statusRadius);
    this.menu.resize(this.stageWidth, this.stageHeight);
    // this.icon.resize(this.stageWidth, this.stageHeight);
    // this.logo.resize(this.stageWidth, this.stageHeight);
    this.card.resize(this.stageWidth, this.stageHeight);

    this.createSnowparticles();
    this.createSnowballs();
  }

  createSnowparticles() {
    this.stageWidth < 768
      ? (this.snowParticlesCnt = 40)
      : (this.snowParticlesCnt = 75);

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
        -this.snowball.radius,
        this.snowball.radius,
        Math.random() * this.snowball.speed + this.snowball.speed,
        this.curFiles[this.curFile]
      )
    );

    this.curFile++;
  }

  addSnowballTop() {
    this.snowball.x =
      Math.random() * (this.stageWidth - this.snowball.radius * 4) +
      this.snowball.radius;
    this.snowball.y = -this.snowball.radius;

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
          this.snowball.y = -this.snowball.radius;
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
        -this.snowball.radius,
        this.snowball.radius,
        Math.random() * this.snowball.speed + this.snowball.speed,
        this.curFiles[this.curFile]
      )
    );
    this.curFile++;
  }

  addSnowballBottom() {
    this.snowball.x =
      Math.random() * (this.stageWidth - this.snowball.radius * 4) +
      this.snowball.radius;
    this.snowball.y = this.stageHeight + this.snowball.radius * 0.25;

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
          this.snowball.y = this.stageHeight + this.snowball.radius;
        }
      }
    }

    this.curFile--;

    if (this.curFile <= 0) {
      this.curFile = this.curFiles.length;
    }
    this.snowballs.unshift(
      new Snowball(
        this.snowball.x,
        this.snowball.y,
        this.stageHeight + this.snowball.radius * 0.25,
        this.snowball.radius,
        Math.random() * this.snowball.speed + this.snowball.speed,
        this.curFiles[this.curFile - 1]
      )
    );
  }

  addSnowpack(x, y, radius) {
    this.snowpacks.push(new Snowpack(x, y, radius));
  }

  onClickAbout() {
    this.aboutDiv.style.display = "block";
  }

  onClickAboutClose() {
    this.aboutDiv.style.display = "none";
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

    this.status.accentColor = this.accentColor;
    this.status.secondaryColor = this.normColor;
    this.status.textColor = this.textColor;

    this.menu.textColor = this.textColor;

    this.status.draw(this.ctx, this.curFile, this.curFiles.length);
    this.menu.draw(this.ctx, this.page);

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

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }
        break;

      case 2:
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }
        break;

      case 3:
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          this.moveX *= 0.9;
          this.moveY *= 0.975;
          snowball.sx += this.moveX;

          // if (this.moveY > 0) {
          snowball.sy += this.moveY;
          // }

          if (snowball.sy > this.stageHeight + snowball.radius * 0.25) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.addSnowballTop();
            this.snowballs.splice(i, 1);
          } else if (snowball.sy < -snowball.radius) {
            this.snowballs.splice(i, 1);
            this.addSnowballBottom();
          }
        }

        this.status.radius += 30;
        this.status.fontSize -= 10;
        if (this.status.radius >= this.statusRadius * 0.75) {
          this.status.radius = this.statusRadius * 0.75;
        }

        if (this.status.fontSize <= this.statusRadius * 0.75) {
          this.status.fontSize = this.statusRadius * 0.75;
        }

        break;
      case 4:
        // moving back to position
        for (let i = this.snowballs.length - 1; i >= 0; i--) {
          const snowball = this.snowballs[i];
          this.moveY *= 0.975;

          // if (this.moveY > 0) {
          snowball.sy += this.moveY;
          // }

          if (snowball.sx < snowball.x) {
            snowball.sx += 50;
            if (snowball.sx > snowball.x) {
              snowball.sx = snowball.x;
            }
          } else if (snowball.sx > snowball.x) {
            snowball.sx -= 50;
            if (snowball.sx < snowball.x) {
              snowball.sx = snowball.x;
            }
          }

          if (snowball.sy > this.stageHeight + snowball.radius * 0.25) {
            this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
            this.addSnowballTop();
            this.snowballs.splice(i, 1);
          } else if (snowball.sy < -snowball.radius) {
            this.snowballs.splice(i, 1);
            this.addSnowballBottom();
          }

          this.status.radius -= 10;
          this.status.fontSize += 10;
          if (this.status.radius <= 0) {
            this.status.radius = 0;
          }

          if (this.status.fontSize >= this.statusRadius) {
            this.status.fontSize = this.statusRadius;
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

          if (this.moveX > 0) {
            snowball.sx += 100;
          } else if (this.moveX <= 0) {
            snowball.sx -= 100;
          }

          // snowball.sx += this.moveX * 5;

          if (
            snowball.sx >= this.stageWidth + snowball.radius ||
            snowball.sx <= -snowball.radius
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

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
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

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }

        break;

      // card
      case 7:
        this.card.textColor = this.textColor;
        this.card.cardColor = this.cardColor;
        this.cardOpened = true;
        this.card.posY = easeIn(this.card.posY, this.stageHeight * 0.9, 0.1);

        this.card.draw(this.ctx);
        this.card.showContent(this.ctx, this.selected);
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

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }
        break;

      case 8:
        this.card.draw(this.ctx);
        this.card.showContent(this.ctx, this.selected);
        break;

      case 9:
        break;

      case 10:
        this.card.posY = easeIn(this.card.posY, 0, 0.2);
        this.card.draw(this.ctx);

        if (this.card.posY <= +30) {
          this.card.posY = 0;
          this.cardOpened = false;
          this.step = 2;
        }
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }
        this.selected = null;
        break;

      case 11:
        this.status.radius -= 10;
        this.status.fontSize += 10;
        if (this.status.radius <= 0) {
          this.status.radius = 0;
        }

        if (this.status.fontSize >= this.statusRadius) {
          this.status.fontSize = this.statusRadius;
        }
        break;

      // open link
      case 12:
        this.card.textColor = this.textColor;
        this.card.cardColor = this.cardColor;
        this.card.posY = easeIn(this.card.posY, this.stageHeight * 1.1, 0.2);

        this.card.draw(this.ctx);
        this.card.showLoadingText(this.ctx, this.selected);

        if (this.card.posY >= this.stageHeight * 1.1 - 1) {
          this.card.posY = this.stageHeight * 1.1;
          this.step = 13;
        }

        break;
      case 13:
        this.card.textColor = this.textColor;

        this.card.posY = this.stageHeight * 1.2;
        this.card.draw(this.ctx);
        this.card.showLoadingText(this.ctx, this.selected);
        window.location = `${this.selected.url}`;
        break;
      case 14:
        // for (let i = this.snowballs.length - 1; i >= 0; i--) {
        //   const snowball = this.snowballs[i];
        //   this.moveX *= 0.9;
        //   this.moveY *= 0.975;
        //   snowball.sx += this.moveX;

        //   if (this.moveY < 0) {
        //     snowball.sy -= this.moveY;
        //   }

        //   if (snowball.sy >= this.stageHeight + snowball.radius / 2) {
        //     this.addSnowpack(snowball.x, snowball.sy, snowball.radius);
        //     this.addSnowball();
        //     this.snowballs.splice(i, 1);
        //   }
        // }

        // this.status.radius += 30;
        // this.status.fontSize -= 10;
        // if (this.status.radius >= this.statusRadius * 0.75) {
        //   this.status.radius = this.statusRadius * 0.75;
        // }

        // if (this.status.fontSize <= this.statusRadius * 0.75) {
        //   this.status.fontSize = this.statusRadius * 0.75;
        // }
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
    this.mouseCursor.style.transform = `translate(${
      e.clientX - this.mouseCursor.offsetWidth / 2
    }px, ${e.clientY - this.mouseCursor.offsetHeight / 2}px)`;

    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
      this.moveY = e.clientY - this.offsetY;
      this.offsetY = e.clientY;

      if (Math.abs(this.moveY) > Math.abs(this.moveX) && this.moveY < 0) {
        this.arrowUp.classList.add("cusor__arrow-up--active");
        this.arrowDown.classList.remove("cusor__arrow-down--active");
        this.arrowLeft.classList.remove("cusor__arrow-left--active");
        this.arrowRight.classList.remove("cusor__arrow-right--active");
      } else if (
        Math.abs(this.moveY) > Math.abs(this.moveX) &&
        this.moveY > 0
      ) {
        this.arrowDown.classList.add("cusor__arrow-down--active");
        this.arrowUp.classList.remove("cusor__arrow-up--active");
        this.arrowLeft.classList.remove("cusor__arrow-left--active");
        this.arrowRight.classList.remove("cusor__arrow-right--active");
      } else if (
        Math.abs(this.moveX) > Math.abs(this.moveY) &&
        this.moveX < 0
      ) {
        this.arrowLeft.classList.add("cusor__arrow-left--active");
        this.arrowUp.classList.remove("cusor__arrow-up--active");
        this.arrowDown.classList.remove("cusor__arrow-down--active");
        this.arrowRight.classList.remove("cusor__arrow-right--active");
      } else if (
        Math.abs(this.moveX) > Math.abs(this.moveY) &&
        this.moveX > 0
      ) {
        this.arrowRight.classList.add("cusor__arrow-right--active");
        this.arrowUp.classList.remove("cusor__arrow-up--active");
        this.arrowDown.classList.remove("cusor__arrow-down--active");
        this.arrowLeft.classList.remove("cusor__arrow-left--active");
      } else {
        this.arrowRight.classList.remove("cusor__arrow-right--active");
        this.arrowUp.classList.remove("cusor__arrow-up--active");
        this.arrowDown.classList.remove("cusor__arrow-down--active");
        this.arrowLeft.classList.remove("cusor__arrow-left--active");
      }
    }

    this.mouseCursor.classList.remove("cursor--active");

    if (!this.cardOpened) {
      for (let i = 0; i < this.snowballs.length; i++) {
        const snowball = this.snowballs[i];
        const dist = distance(snowball.x, snowball.sy, e.clientX, e.clientY);

        if (dist < snowball.radius) {
          this.mouseCursor.classList.add("cursor--active");
        }
      }
    } else {
      if (
        e.clientX >= this.stageWidth * 0.88 &&
        e.clientY >= this.stageHeight * 0.12 &&
        e.clientX <= this.stageWidth * 0.88 + 30 &&
        e.clientY <= this.stageHeight - 30
      ) {
        this.mouseCursor.classList.add("cursor--active");
      }
    }
  }

  onUp(e) {
    this.isDown = false;
    this.endX = e.clientX;
    this.endY = e.clientY;

    this.arrowUp.classList.remove("cusor__arrow-up--active");
    this.arrowDown.classList.remove("cusor__arrow-down--active");
    this.arrowLeft.classList.remove("cusor__arrow-left--active");
    this.arrowRight.classList.remove("cusor__arrow-right--active");

    if (!this.cardOpened) {
      this.handleSwipe();
    } else {
      this.cardBtn();
    }
  }

  onWheel(e) {
    // e.preventDefault();
    window.clearTimeout(this.isScrolling);
    if (!this.isBeingAnimated && !this.cardOpened) {
      this.step = 3;
    }
    this.moveY = e.deltaY * 0.175;
    this.isScrolling = setTimeout(()=> {
      this.step = 2;
    }, 500);
  }

  cardBtn() {
    if (
      this.endX >= this.stageWidth * 0.88 &&
      this.endY >= this.stageHeight * 0.12 &&
      this.endX <= this.stageWidth * 0.88 + 30 &&
      this.endY <= this.stageHeight - 30
    ) {
      this.step = 10;
      this.nav.style.display = "block";
      this.cursorUp.style.display = "block";
      this.arrowUp.style.display = "block";

      this.cursorDown.style.display = "block";
      this.arrowDown.style.display = "block";

      this.cursorLeft.style.display = "block";
      this.arrowLeft.style.display = "block";

      this.cursorRight.style.display = "block";
      this.arrowRight.style.display = "block";
    }
  }

  handleSwipe() {
    this.deltaX = this.endX - this.startX;
    this.deltaY = this.endY - this.startY;

    // Scroll left

    // !this.isBeingAnimated - remove and condense

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
          this.step = 14;
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

    // click snowball
    if (Math.abs(this.deltaX) < 20 && Math.abs(this.deltaY) < 20) {
      if (!this.isBeingAnimated) {
        for (let i = 0; i < this.snowballs.length; i++) {
          const snowball = this.snowballs[i];
          const dist = distance(snowball.x, snowball.sy, this.endX, this.endY);

          if (dist < snowball.radius) {
            this.selected = snowball.file;
          }
        }
        if (this.step === 3 && this.selected) {
          if (this.selected.category === "Creative Coding") {
            this.step = 12;

            if (!this.cardOpened) {
              this.nav.style.display = "none";
              this.cursorUp.style.display = "none";
              this.arrowUp.style.display = "none";

              this.cursorDown.style.display = "none";
              this.arrowDown.style.display = "none";

              this.cursorLeft.style.display = "none";
              this.arrowLeft.style.display = "none";

              this.cursorRight.style.display = "none";
              this.arrowRight.style.display = "none";
            }
          } else {
            this.step = 7;

            if (!this.cardOpened) {
              this.nav.style.display = "none";
              this.cursorUp.style.display = "none";
              this.arrowUp.style.display = "none";

              this.cursorDown.style.display = "none";
              this.arrowDown.style.display = "none";

              this.cursorLeft.style.display = "none";
              this.arrowLeft.style.display = "none";

              this.cursorRight.style.display = "none";
              this.arrowRight.style.display = "none";
            }
          }
        } else {
          this.step = 4;
        }
      }
    }

    switch (this.page) {
      case 1:
        this.cursorLeft.innerHTML = "words";
        this.cursorRight.innerHTML = "cars";
        break;
      case 2:
        this.cursorLeft.innerHTML = "projects";
        this.cursorRight.innerHTML = "words";
        break;
      case 3:
        this.cursorLeft.innerHTML = "cars";
        this.cursorRight.innerHTML = "projects";
        break;
    }
  }
}

window.onload = () => {
  new App();
};
