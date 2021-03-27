export class Background {
  constructor() {
    this.light = "#89cff0";
    this.dark = "#00a3e0";
  }

  backgroundColor(paths) {
    if (paths.length > 0) {
      document.body.style.backgroundColor = this.light;
      document.body.style.transition = "all 3s";
    } else {
      document.body.style.backgroundColor = this.dark;
      document.body.style.transition = "all 3s";
    }
  }
}
