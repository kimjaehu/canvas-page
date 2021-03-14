export class Snowpack {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.melt = 0.01;
    this.alpha = 1;
  }

  draw(ctx) {
    // this.alpha <= 1 ? (this.alpha = 0) : (this.alpha += this.melt);

    this.alpha -= this.melt;

    ctx.beginPath();
    // ctx.fillStyle = `rgba(239,238,238, ${this.alpha})`;
    ctx.fillStyle = `rgba(255,255,255, ${this.alpha})`;

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.closePath();
  }
}
