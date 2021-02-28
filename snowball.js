export class Snowball {
  constructor(x, y, radius, speed, file) {
    this.x = x;
    this.y = y;
    this.sy = -radius;
    this.variance = 50;
    this.radius = radius;
    this.speed = speed;
    this.file = file;
  }

  draw(ctx, moveY) {
    this.sy <= this.y ? (this.sy += this.speed) : (this.speed = 0);

    this.sy += moveY;

    // ctx.fillStyle = `rgba(239,238,238, 1)`;
    ctx.fillStyle = `rgba(242, 242, 247, 1)`;
    ctx.strokeStyle = `rgba(255,255,255,0.2)`;
    ctx.lineWidth = 10;

    ctx.shadowColor = `rgba(255,255,255,0.83)`;
    ctx.shadowBlur = 26;
    ctx.shadowOffsetX = -6;
    ctx.shadowOffsetY = -6;

    ctx.beginPath();

    ctx.arc(this.x, this.sy, this.radius, 0, Math.PI * 2, false);

    ctx.save();

    ctx.fill();

    ctx.restore();

    ctx.shadowColor = `rgba(217,210,200,0.51)`;
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;

    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(this.file, this.x, this.sy);

    ctx.closePath();
  }
}
