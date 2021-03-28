export class Card {
  constructor(textColor, cardColor) {
    this.textColor = textColor;
    this.cardColor = cardColor;
    this.posY = 0;
    this.alpha = 0;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.cardColor.r},${this.cardColor.g},${this.cardColor.b}, 1)`;

    ctx.moveTo(0, 0);
    ctx.lineTo(this.stageWidth, 0);
    ctx.lineTo(this.stageWidth, this.posY * 0.9);
    ctx.quadraticCurveTo(this.stageWidth / 2, this.posY, 0, this.posY * 0.9);

    ctx.fill();

    ctx.closePath();
  }

  showContent(ctx, selected) {
    ctx.fillStyle = `rgb(${this.textColor.r},${this.textColor.g},${this.textColor.b})`;
    ctx.font = "20px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      selected.title,
      this.stageWidth * 0.5,
      this.posY - this.stageHeight * 0.85
    );

    ctx.drawImage(
      selected.loadedImg,
      this.stageWidth * 0.5 - selected.loadedImg.width * 0.5,
      this.posY - this.stageHeight * 0.8
    );

    ctx.strokeStyle = `rgb(${this.textColor.r},${this.textColor.g},${this.textColor.b})`;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.stageWidth * 0.88, this.stageHeight * 0.12);
    ctx.lineTo(this.stageWidth * 0.88 + 30, this.stageHeight * 0.12 + 30);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.stageWidth * 0.88, this.stageHeight * 0.12 + 30);
    ctx.lineTo(this.stageWidth * 0.88 + 30, this.stageHeight * 0.12);
    ctx.stroke();
    ctx.closePath();
  }

  showLoadingText(ctx, selected) {
    ctx.fillStyle = `rgb(${this.textColor.r},${this.textColor.g},${this.textColor.b})`;
    ctx.font = "20px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(selected.title, this.stageWidth * 0.5, this.stageHeight * 0.5);
  }
}
