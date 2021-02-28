export class Snowpack {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.melt = 0.005;
    this.alpha = 1;
  }

  draw(ctx) {
    // this.alpha <= 1 ? (this.alpha = 0) : (this.alpha += this.melt);

    this.alpha -= this.melt;

    // ctx.fillStyle = `rgba(239,238,238, ${this.alpha})`;
    ctx.fillStyle = `rgba(255,255,255, ${this.alpha})`;
    ctx.strokeStyle = `rgba(255,255,255,0.2)`;
    ctx.lineWidth = 10;

    ctx.shadowColor = `rgba(255,255,255,0.83)`;
    ctx.shadowBlur = 26;
    ctx.shadowOffsetX = -6;
    ctx.shadowOffsetY = -6;

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.closePath();
  }
}
