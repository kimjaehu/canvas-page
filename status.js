export class Status {
  constructor() {
    this.radius = 200;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, current, total) {
    ctx.fillStyle = `rgba(255,255,255,1)`;
    ctx.beginPath();
    ctx.arc(
      this.stageWidth / 2,
      this.stageHeight / 2,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();

    ctx.fillStyle = `rgba(0,0,0,1)`;
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(current, this.stageWidth / 2, this.stageHeight / 2);
    ctx.closePath();
  }
}
