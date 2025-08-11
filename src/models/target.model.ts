import { GameObject } from './gameObject';
import { TARGET } from '../config';

export interface Target extends GameObject {
  destroyed: boolean;
}

export const createTarget = (canvas: HTMLCanvasElement): Target => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height / 2,
  width: TARGET.WIDTH,
  height: TARGET.HEIGHT,
  destroyed: false,
});
