const PI2 = Math.PI * 2;

export class Cloud {
  constructor(x, y, speed, radius) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx) {
    this.x += this.speed;

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    ctx.closePath();
    ctx.fill();
  }
}
