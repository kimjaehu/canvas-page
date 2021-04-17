export class Menu {
  constructor(textColor) {
    this.textColor = textColor;
    this.alpha = 1;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, page) {
    ctx.fillStyle = `rgba(${this.textColor.r},${this.textColor.g},${this.textColor.b},${this.alpha})`;
    ctx.font = `200 26px Montserrat`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    switch (page) {
      // Creative Coding
      case 1:
        ctx.fillText(
          "Projects",
          this.stageWidth * 0.5,
          this.stageHeight * 0.75
        );
        break;
      case 2:
        ctx.fillText("Notes", this.stageWidth * 0.5, this.stageHeight * 0.75);
        break;
      case 3:
        ctx.fillText("Words", this.stageWidth * 0.5, this.stageHeight * 0.75);
        break;
    }
  }
}
