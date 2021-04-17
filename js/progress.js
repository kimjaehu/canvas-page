// export class Status {
//   constructor() {
//     this.radius = 100;
//   }

//   resize(stageWidth, stageHeight) {
//     this.stageWidth = stageWidth;
//     this.stageHeight = stageHeight;
//   }

//   draw(ctx, current, total, progress) {
//     ctx.fillStyle = `rgba(255,255,255,1)`;
//     // ctx.shadowOffsetX = 0;
//     // ctx.shadowOffsetY = 0;
//     // ctx.shadowBlur = 10;
//     // ctx.shadowColor = '#656565';
//     ctx.beginPath();
//     ctx.arc(
//       this.stageWidth / 2,
//       this.stageHeight / 2,
//       this.radius,
//       0,
//       (Math.PI / 180) * progress,
//       false
//     );
//     ctx.fill();
//     ctx.closePath();
//   }
// }
