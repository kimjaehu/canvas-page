export class Status {
  constructor() {
    this.radius = 0;
    this.fontSize = 200;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, current, total) {
    ctx.fillStyle = `rgba(255,255,255,1)`;
    ctx.beginPath();
    ctx.arc(
      this.stageWidth * 0.5,
      this.stageHeight * 0.5,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();

    ctx.fillStyle = `rgba(90, 200, 250, 1)`;
    ctx.font = `200 ${this.fontSize}px Montserrat`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(current, this.stageWidth * 0.5, this.stageHeight * 0.5);

    ctx.fillStyle = `rgba(142, 142, 147,1)`;
    ctx.font = `200 ${this.fontSize * 0.25}px Montserrat`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `/ ${total}`,
      this.stageWidth / 2 + this.fontSize * 0.5,
      this.stageHeight / 2 + this.fontSize * 0.25
    );

    ctx.closePath();
  }
}
