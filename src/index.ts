import { Game } from './game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Canvas no encontrado');
}

const game = new Game(canvas);
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

(async () => {
  await game.init();
  game.start();
})();

resetButton.addEventListener('click', () => game.reset());
