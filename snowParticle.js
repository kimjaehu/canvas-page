export class SnowParticle {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = Math.random() * this.stageWidth;
    this.y = Math.random() * this.stageHeight;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 0.25 + this.radius / 4;
    this.alpha = 1 - this.radius * 0.1;
  }

  draw(ctx) {
    this.y += this.speed;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}
