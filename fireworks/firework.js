export class Firework {
  constructor(cx, cy, stageWidth, stageHeight) {
    this.gravity = 0.2;
    this.cx = cx;
    this.cy = cy;
    this.ox = stageWidth / 2;
    this.oy = stageHeight * 0.8;
    this.velX = 0;
    this.velY = -(Math.random() * 3 + stageHeight / 70);
  }

  draw(ctx) {
    if (this.velY >= 0) {
      this.gravity = 0;
    }

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(this.cx, this.oy, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    this.velY += this.gravity;
    this.oy += this.velY;

    if (this.velY >= 0) {
      return { isExploded: true, x: this.cx, y: this.oy };
    }
    return { isExploded: false };
  }
}
