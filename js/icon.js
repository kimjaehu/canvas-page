export class Icon {
  constructor(iconColorNormal, iconColorActive) {
    this.iconColorNormal = iconColorNormal;
    this.iconColorActive = iconColorActive;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, page) {
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.strokeStyle = `rgba(${this.iconColorNormal.r},${this.iconColorNormal.g},${this.iconColorNormal.b}, 1)`;
    switch (page) {
      // Creative Coding
      case 1:
        ctx.beginPath();
        // ctx.beginPath();
        // ctx.moveTo(this.stageWidth * 0.5, this.stageHeight * 0.5);
        ctx.arc(
          this.stageWidth * 0.5,
          this.stageHeight * 0.75,
          45,
          0,
          Math.PI * 2,
          false
        );
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.closePath();
        ctx.stroke();

        break;

      // cars
      case 2:
        ctx.beginPath();
        // rear bottom
        ctx.moveTo(this.stageWidth * 0.5 - 65, this.stageHeight * 0.75 + 50);
        // front bottom
        ctx.lineTo(this.stageWidth * 0.5 + 65, this.stageHeight * 0.75 + 50);
        // front top
        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 + 90,
          this.stageHeight * 0.75 + 5,
          this.stageWidth * 0.5 + 30,
          this.stageHeight * 0.75 + 5
        );
        // end of hood
        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 + 20,
          this.stageHeight * 0.75 - 30,
          this.stageWidth * 0.5 + 10,
          this.stageHeight * 0.75 - 30
        );
        // top rear glass
        ctx.lineTo(this.stageWidth * 0.5 - 30, this.stageHeight * 0.75 - 30);

        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 - 40,
          this.stageHeight * 0.75 - 30,
          this.stageWidth * 0.5 - 50,
          this.stageHeight * 0.75 + 5
        );
        // top trunk
        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 - 70,
          this.stageHeight * 0.75,
          this.stageWidth * 0.5 - 65,
          this.stageHeight * 0.75 + 50
        );

        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.stageWidth * 0.5 + 20, this.stageHeight * 0.75 + 5);
        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 + 14,
          this.stageHeight * 0.75 - 22,
          this.stageWidth * 0.5 + 8,
          this.stageHeight * 0.75 - 22
        );
        ctx.lineTo(this.stageWidth * 0.5 - 10, this.stageHeight * 0.75 - 22);
        ctx.lineTo(this.stageWidth * 0.5 - 10, this.stageHeight * 0.75 + 5);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.stageWidth * 0.5 - 40, this.stageHeight * 0.75 + 5);
        ctx.lineTo(this.stageWidth * 0.5 - 16, this.stageHeight * 0.75 + 5);
        ctx.lineTo(this.stageWidth * 0.5 - 16, this.stageHeight * 0.75 - 22);
        ctx.lineTo(this.stageWidth * 0.5 - 30, this.stageHeight * 0.75 - 22);
        ctx.quadraticCurveTo(
          this.stageWidth * 0.5 - 40,
          this.stageHeight * 0.75 - 5,
          this.stageWidth * 0.5 - 40,
          this.stageHeight * 0.75 + 5
        );
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
          this.stageWidth * 0.5 + 55,
          this.stageHeight * 0.75 + 22,
          6,
          10,
          (Math.PI / 180) * 135,
          0,
          Math.PI * 2,
          true
        );
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(
          this.stageWidth * 0.5 - 55,
          this.stageHeight * 0.75 + 18,
          4,
          8,
          (Math.PI / 180) * 90,
          0,
          Math.PI * 2,
          true
        );
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          this.stageWidth * 0.5 - 35,
          this.stageHeight * 0.75 + 50,
          18,
          0,
          Math.PI * 2,
          true
        );

        ctx.moveTo(this.stageWidth * 0.5 + 35, this.stageHeight * 0.75);

        ctx.arc(
          this.stageWidth * 0.5 + 35,
          this.stageHeight * 0.75 + 50,
          18,
          0,
          Math.PI * 2,
          true
        );
        ctx.closePath();
        ctx.fill();
        break;

      //language
      case 3:
        ctx.beginPath();
        ctx.closePath();
        break;
    }
  }
}
