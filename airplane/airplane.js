export class Airplane {
  constructor(img, stageWidth, stageHeight) {
    this.img = img;

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 360;
    this.imgHeight = 300;

    this.airplaneWidth = 180;
    this.airplaneHeight = 150;

    this.airplaneWidthHalf = this.airplaneWidth / 2;
    this.airplaneHeightHalf = this.airplaneHeight / 2;

    this.x = stageWidth + this.airplaneWidth;
    this.y = stageHeight + this.airplaneHeight;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;

    this.percent = 0;

    this.path;
  }

  animate(ctx, t, points, speed) {
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;

    if (now > this.fpsTime) {
      this.time = t;
      this.curFrame += 1;
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }

    this.percent += speed;

    if (this.percent < 0) {
      this.percent = 0;
    }
    if (this.percent == 100) {
      this.percent = 0;
    }

    if (!points) {
      return this.percent;
    }

    this.draw(ctx, points, this.percent);

    return this.percent;
  }

  draw(ctx, points, percent) {
    let point = this.getQuadBezierPoint(
      points.x1,
      points.y1,
      points.x2,
      points.y2,
      points.x3,
      points.y3,
      percent
    );
    this.drawAirplane(ctx, point);
  }

  drawAirplane(ctx, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(point.rotation);
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.airplaneWidthHalf,
      -this.airplaneHeightHalf,
      this.airplaneWidth,
      this.airplaneHeight
    );
    ctx.restore();
  }

  getQuadBezierPoint(x1, y1, x2, y2, x3, y3, percent) {
    percent = percent / 100;
    const x = this.getQuadBezierValue(x1, x2, x3, percent);
    const y = this.getQuadBezierValue(y1, y2, y3, percent);

    const tx = this.quadTangent(x1, x2, x3, percent);
    const ty = this.quadTangent(y1, y2, y3, percent);
    const rotation = -Math.atan2(tx, ty) + (270 * Math.PI) / 180;

    return { x: x, y: y, rotation: rotation };
  }

  getQuadBezierValue(p0, p1, p2, percent) {
    return (
      Math.pow(1 - percent, 2) * p0 +
      2 * (1 - percent) * percent * p1 +
      Math.pow(percent, 2) * p2
    );
  }

  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}
