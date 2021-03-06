export class SnowParticle {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = Math.random() * this.stageWidth;
    this.y = Math.random() * this.stageHeight;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 0.25 + 0.5;
  }

  draw(ctx) {
    this.y += this.speed;
    ctx.fillStyle = `rgba(255, 255, 255, 0.75)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}
