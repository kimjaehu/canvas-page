export class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 0.75 + 0.5;
    this.twinkle = 0.01;
  }

  draw(ctx) {
    this.radius += this.twinkle;
    if (this.radius >= 1.5) {
      this.twinkle *= -1;
      this.radius += this.twinkle;
    } else if (this.radius < 0.5) {
      this.twinkle *= -1;
      this.radius += this.twinkle;
    }

    ctx.beginPath();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowBlur = 9;
    ctx.shadowColor = "rgb(255,255,255)";
    ctx.fill();
    ctx.closePath();
  }
}
