import { GameObject } from './gameObject';
import { BULLET } from '../config';
import { Ship } from './ship.model';

export interface Bullet extends GameObject {
  radius: number;
  speed: number;
  destroyed: boolean;
}

export const createBullet = (ship: Ship): Bullet => ({
  x: ship.x + ship.width / 2,
  y: ship.y,
  radius: BULLET.RADIUS,
  speed: BULLET.SPEED,
  width: 2,
  height: 2,
  destroyed: true
});
