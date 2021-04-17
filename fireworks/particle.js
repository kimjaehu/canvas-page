export class Particle {
  constructor(x, y, color, light) {
    this.x = x;
    this.y = y;

    this.friction = 0.96;
    this.gravity = 0.1;
    this.speed = Math.random() + 4;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 5 + 3;
    this.spark = 2;
    this.particleRadius = Math.random() * 2 + 1;
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = 1;
    this.va = 0.01;
    this.light = light;
  }

  draw(ctx) {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    this.speed *= this.friction;

    this.a -= this.va;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;

    ctx.arc(this.x, this.y, this.particleRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    if (this.light) {
      ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a / 50})`;
      ctx.arc(this.x, this.y, this.particleRadius * 50, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }

    if (this.a <= 0) return true;
  }
}
