export class Snowball {
  constructor(x, y, sy, radius, speed, file) {
    this.x = x;
    this.y = y;
    this.sx = x;
    this.sy = sy;
    this.variance = 50;
    this.radius = radius;
    this.speed = speed;
    this.file = file;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(239,238,238, 1)`;
    // systemGray: { r: 142, g: 142, b: 147 },
    // ctx.fillStyle = `rgba(142, 142, 147, 1)`;
    ctx.strokeStyle = `rgba(255,255,255,0.2)`;
    ctx.lineWidth = 2;

    ctx.save();

    ctx.beginPath();

    ctx.arc(this.sx, this.sy, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Performance check
    // Shadow top

    // ctx.save();
    // ctx.shadowColor = `rgba(255,255,255,0.83)`;

    // ctx.shadowBlur = 26;
    // ctx.shadowOffsetX = -6;
    // ctx.shadowOffsetY = -6;

    // ctx.fill();
    // ctx.restore();

    // Shadow bottom

    // ctx.shadowColor = `rgba(217,210,200,0.51)`;
    // ctx.shadowBlur = 16;
    // ctx.shadowOffsetX = 6;
    // ctx.shadowOffsetY = 6;

    // ctx.fill();

    ctx.save();

    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.radius * 0.95, 0, Math.PI * 2, false);
    ctx.closePath();

    ctx.clip();
    
    let sx, sy, dWidth, dHeight;

    if (this.file.loadedImg.width >= this.file.loadedImg.height) {
      sx = (this.file.loadedImg.width - this.file.loadedImg.height) * 0.5;
      sy = 0;
      dWidth = this.file.loadedImg.height;
      dHeight = this.file.loadedImg.height;
    } else {
      sx = 0;
      sy = (this.file.loadedImg.height - this.file.loadedImg.width) * 0.5;
      dWidth =  this.file.loadedImg.width;
      dHeight =  this.file.loadedImg.width;
    };

    ctx.drawImage(
      this.file.loadedImg,
      sx,sy,
      dWidth, dHeight,
      this.sx - this.radius,
      this.sy - this.radius,
      this.radius * 2,
      this.radius * 2,
    );

    ctx.restore();

    ctx.restore();

    return this.sy;
  }
}
