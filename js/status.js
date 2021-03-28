export class Status {
  constructor(statusFontSize, accentColor, secondaryColor, textColor) {
    // this.statusFontSize = statusFontSize;
    this.radius = 0;
    this.fontSize = statusFontSize;
    this.accentColor = accentColor;
    this.secondaryColor = secondaryColor;
    this.textColor = textColor;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, current, total) {
    ctx.fillStyle = `rgba(255,255,255,1)`;

    ctx.arc(
      this.stageWidth * 0.5,
      this.stageHeight * 0.45,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();

    ctx.fillStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 1)`;
    ctx.font = `200 ${this.fontSize}px Montserrat`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(current, this.stageWidth * 0.5, this.stageHeight * 0.45);

    ctx.fillStyle = `rgba(${this.secondaryColor.r}, ${this.secondaryColor.g}, ${this.secondaryColor.b}, 1)`;
    ctx.font = `200 ${this.fontSize * 0.25}px Montserrat`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `/ ${total}`,
      this.stageWidth * 0.5 + this.fontSize * 0.5,
      this.stageHeight * 0.45 + this.fontSize * 0.25
    );
  }
}
