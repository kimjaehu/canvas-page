export class GradientBox {
  constructor(y) {
    this.y = y;
    this.vy = Math.random() * 16 - 8;
    this.minHeight = 800;
    this.maxHeight = 1400;
    this.height = this.randomHeight();
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, color, stageWidth, stageHeight, translateX, translateY, scale) {
    this.y += this.vy;

    if (this.y < 0 - stageWidth / scale) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight + this.height / scale) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.save();
    ctx.translate((stageWidth - translateX) / scale, -translateY);
    ctx.rotate((Math.PI / 180) * 120);

    ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;

    const grd = ctx.createLinearGradient(
      stageWidth / 2,
      this.y,
      stageWidth / 2,
      this.y + this.height
    );

    grd.addColorStop(0, `rgba(${color.r},${color.g},${color.b}, 0)`);
    grd.addColorStop(0.5, `rgba(${color.r},${color.g},${color.b}, 1)`);
    grd.addColorStop(1, `rgba(${color.r},${color.g},${color.b}, 0)`);

    ctx.fillStyle = grd;
    ctx.fillRect(
      0,
      this.y,
      Math.sqrt(stageWidth * stageWidth + stageHeight * stageHeight) / scale,
      this.height
    );
    ctx.restore();
  }

  randomHeight() {
    return Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
  }
}
