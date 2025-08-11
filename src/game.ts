import { InputManager } from './input/inputManager';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SHIP } from './config';
import { createTarget, Target } from './models/target.model';
import { Renderer } from './render/render';
import { createShip, Ship } from './models/ship.model';
import { fetchCommits } from './services/github';
import { Bullet, createBullet } from './models/bullet.model';

export class Game {
  private ship: Ship;
  private bullet: Bullet;
  private targets: Target[] = [];
  private score = 0;

  private input = new InputManager();
  private renderer: Renderer;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.renderer = new Renderer(canvas.getContext('2d')!);

    this.ship = createShip(canvas);
    this.bullet = createBullet(this.ship);
  }

  async init() {
    const commits = await fetchCommits();
    this.targets = commits.map(() => createTarget(this.canvas));
  }

  start() {
    requestAnimationFrame(() => this.loop());
  }

  private loop = () => {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  };

  private update() {
    this.handleInput();
    this.moveTargets();
    this.moveBullet();
    this.detectCollisions();
  }

  private handleInput() {
    if (this.input.isPressed('ArrowLeft')) this.ship.x -= SHIP.SPEED;
    if (this.input.isPressed('ArrowRight')) this.ship.x += SHIP.SPEED;
    if (this.input.isPressed('ArrowUp')) this.ship.y -= SHIP.SPEED;
    if (this.input.isPressed('ArrowDown')) this.ship.y += SHIP.SPEED;

    // Bounding
    this.ship.x = Math.min(Math.max(this.ship.x, 0), this.canvas.width - SHIP.WIDTH);
    this.ship.y = Math.min(Math.max(this.ship.y, 0), this.canvas.height - SHIP.HEIGHT);

    if (this.input.isPressed('Space'))
      if (this.bullet.destroyed) {
        this.bullet.destroyed = false;
        this.bullet.x = this.ship.x + this.ship.width / 2;
        this.bullet.y = this.ship.y;
      };

  }

  private moveTargets() {
    this.targets.forEach(t => {
      if (t.destroyed) return;
      t.y += 1;
      if (t.y > this.canvas.height) {
        t.y = 0;
        t.x = Math.random() * this.canvas.width;
      }
    });
  }

  private moveBullet() {
    if (this.bullet.destroyed) return;
    this.bullet.y -= this.bullet.speed;
    if (this.bullet.y < 0) this.bullet.destroyed = true;

    this.targets.forEach(t => {
      if (t.destroyed) return;
      if (
        this.bullet.x > t.x &&
        this.bullet.x < t.x + t.width &&
        this.bullet.y > t.y &&
        this.bullet.y < t.y + t.height
      ) {
        t.destroyed = true;
        this.bullet.destroyed = true;
        this.score++;
      }
    });
  }

  private detectCollisions() {
    this.targets.forEach(t => {
      if (t.destroyed) return;
      if (
        this.ship.x < t.x + t.width &&
        this.ship.x + SHIP.WIDTH > t.x &&
        this.ship.y < t.y + t.height &&
        this.ship.y + SHIP.HEIGHT > t.y
      ) {
        t.destroyed = true;
        this.score++;
      }
    });
  }

  private render() {
    if (this.targets.every(t => t.destroyed)) {
      this.endGame();
      return;
    }

    this.renderer.clear();
    this.renderer.drawShip(this.ship);
    this.renderer.drawBullet(this.bullet);
    this.renderer.drawTargets(this.targets);
    this.renderer.drawScore(this.score);
  }

  async reset() {

    await this.init();
    this.ship = createShip(this.canvas);
    this.bullet = createBullet(this.ship);
    this.score = 0;

    this.targets.forEach(t => {
      t.destroyed = false;
      t.x = Math.random() * this.canvas.width;
      t.y = Math.random() * this.canvas.height / 2;
    });

    this.start();

  }

  private endGame() {
    this.renderer.clear();
    this.renderer.drawEndGame();

    this.renderer.drawRestartInstruction();
  }
}
