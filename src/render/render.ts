import { BULLET, TARGET } from '../config';
import { Bullet } from '../models/bullet.model';
import { Ship } from '../models/ship.model';
import { Target } from '../models/target.model';

export class Renderer {
  constructor(private ctx: CanvasRenderingContext2D) { }

  drawShip(ship: Ship) {
    this.ctx.drawImage(ship.image, ship.x, ship.y, ship.width, ship.height);
  }

  drawBullet(bullet: Bullet) {
    if (bullet.destroyed) return;
    this.ctx.beginPath();
    this.ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = BULLET.COLOR;
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawTargets(targets: Target[]) {
    targets.forEach(t => {
      if (t.destroyed) return;
      this.ctx.fillStyle = TARGET.COLORS[Math.floor(Math.random() * TARGET.COLORS.length)];
      this.ctx.fillRect(t.x, t.y, t.width, t.height);
    });
  }

  drawScore(score: number) {
    const ctx = this.ctx;

    const { width } = ctx.canvas;
        this.ctx.font = 'bold 20px Courier New';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Score: ${score}`, width / 2, 30);
  }

  drawEndGame() {
    const ctx = this.ctx;
    const { width, height } = ctx.canvas;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 48px "Courier New", monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);

    ctx.font = '20px "Courier New", monospace';
  }

  clear() {
    this.ctx.clearRect(0, 0, 800,600);
  }

    drawRestartInstruction() {
    const ctx = this.ctx;
    const { width, height } = ctx.canvas;
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Haz clic en el botón Reset para volver a jugar', width / 2, height * 0.75);
  }
}
