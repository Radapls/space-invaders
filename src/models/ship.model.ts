import { SHIP } from "../config";
import { GameObject } from "./gameObject";

export interface Ship extends GameObject {
  speed: number;
  image: HTMLImageElement;
}

export const createShip = (canvas: HTMLCanvasElement): Ship => {
  const img = new Image();
  img.src = SHIP.IMAGE_SRC;
  return {
    x: canvas.width / 2,
    y: canvas.height - SHIP.HEIGHT - 10,
    width: SHIP.WIDTH,
    height: SHIP.HEIGHT,
    speed: SHIP.SPEED,
    image: img,
    destroyed: false
  };
};
