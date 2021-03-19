export class Card {
  constructor() {
    this.posY = 0;
    this.alpha = 0;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(239,238,238, 1)`;

    ctx.moveTo(0, 0);
    ctx.lineTo(this.stageWidth, 0);
    ctx.lineTo(this.stageWidth, this.posY * 0.9);
    ctx.quadraticCurveTo(this.stageWidth / 2, this.posY, 0, this.posY * 0.9);

    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,0,${this.alpha})`;
    ctx.arc(
      this.stageWidth / 2,
      this.posY - this.stageHeight * 0.8,
      50,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
    ctx.closePath();
  }
}
