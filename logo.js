export class Logo {
  constructor(stageWidth, stageHeight) {
    this.x = stageWidth / 2;
    this.y = stageHeight * 0.075;
  }

  draw(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "32px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("noon", this.x, this.y);
  }
}
