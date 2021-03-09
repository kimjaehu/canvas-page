export class Snowball {
  constructor(x, y, radius, speed, file) {
    this.x = x;
    this.y = y;
    this.sx = x;
    this.sy = -radius;
    this.variance = 50;
    this.radius = radius;
    this.speed = speed;
    this.file = file;
  }

  draw(ctx) {
    // this.sy <= this.y ? (this.sy += this.speed) : (this.speed = 0);

    // this.sx += moveX;
    // this.sy += moveY;

    ctx.fillStyle = `rgba(239,238,238, 1)`;
    ctx.strokeStyle = `rgba(255,255,255,0.2)`;
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(this.sx, this.sy, this.radius, 0, Math.PI * 2, false);

    ctx.shadowColor = `rgba(255,255,255,0.83)`;

    ctx.shadowBlur = 26;
    ctx.shadowOffsetX = -6;
    ctx.shadowOffsetY = -6;

    // ctx.save();
    ctx.stroke();
    ctx.fill();
    // ctx.restore();

    ctx.shadowColor = `rgba(217,210,200,0.51)`;
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;

    ctx.fill();

    ctx.save();

    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.radius * 0.97, 0, Math.PI * 2, false);

    ctx.clip();
    ctx.drawImage(
      this.file.loadedImg,
      this.sx - this.radius,
      this.sy - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.closePath();

    ctx.restore();

    ctx.closePath();

    return this.sy;
  }
}
