export class Logo {
  constructor(textColor) {
    this.textColor = textColor;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx) {
    ctx.fillStyle = `rgb(${this.textColor.r},${this.textColor.g},${this.textColor.b})`;
    ctx.font = "32px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("noon", this.stageWidth * 0.5, this.stageHeight * 0.05);
  }
}
