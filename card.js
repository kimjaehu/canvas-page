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

  draw(ctx, selected) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.cardColor.r},${this.cardColor.g},${this.cardColor.b}, 1)`;

    ctx.moveTo(0, 0);
    ctx.lineTo(this.stageWidth, 0);
    ctx.lineTo(this.stageWidth, this.posY * 0.9);
    ctx.quadraticCurveTo(this.stageWidth / 2, this.posY, 0, this.posY * 0.9);

    ctx.fill();

    if (selected) {
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
        this.stageWidth / 2 - selected.loadedImg.width / 2,
        this.posY - this.stageHeight * 0.8
      );
    }
  }
}
