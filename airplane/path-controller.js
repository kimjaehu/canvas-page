import { Path } from "./path.js";

export class PathController {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.paths = [];
    this.cur = 0;

    this.drawLine = false;
    this.drawPoints = false;
    // this.airplaneController = new AirplaneController();
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    // this.airplaneController.resize(stageWidth, stageHeight);
  }

  //   addPath(ctx, cx, cy) {
  //     this.paths.push(new Path(ctx, cx, cy, this.stageWidth, this.stageHeight));
  //   }

  draw(ctx, t) {
    this.path = new Path(
      ctx,
      this.cx,
      this.cy,
      this.stageWidth,
      this.stageHeight
    );
    this.path.draw(ctx, t, this.drawLine, this.drawPoints);
    // for (let i = 0; i < this.paths.length; i++) {

    //     this.paths[i].draw(ctx, t);

    //   this.airplaneController.draw(ctx, t, this.paths[i]);
    // }
  }
}
