/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file app.ts
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Wednesday, 15th March 2023
 */

import { Bullet } from "./models/bullet.model";
import { Ship } from "./models/ship.model";
import { Target } from "./models/target.model";

// Crear el canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

let githubUser: string = 'radapls';

// Crear la nave espacial
const ship: Ship = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
    image: new Image()
};

ship.image.src = 'https://cdn-icons-png.flaticon.com/512/1985/1985828.png';

const bullet: Bullet = {
    x: ship.x + ship.width / 2,
    y: ship.y,
    radius: 5,
    speed: 10,
    destroyed: true
};

let targets: Target[] = [
    { x: 100, y: 100, width: 50, height: 50, destroyed: false },
    { x: 200, y: 200, width: 50, height: 50, destroyed: false },
    { x: 300, y: 300, width: 50, height: 50, destroyed: false }
];

// Inicializar el contador
let score = 0;

// Dibujar la nave espacial
function drawShip()
{
    context.drawImage(ship.image, ship.x, ship.y, ship.width, ship.height);
}

// Dibujar el contador
function drawScore(): void
{
    context.font = 'bold 20px Courier New';
    context.fontKerning
    context.fillStyle = 'white';
    context.fillText('Score: ' + score, 8, 20);
}

// Mover la nave espacial
function moveShip(direction: string): void
{
    if (direction === 'left')
    {
        ship.x -= ship.speed;
    } else if (direction === 'right')
    {
        ship.x += ship.speed;
    }
    if (ship.x < 0)
    {
        ship.x = 0;
    } else if (ship.x > canvas.width - ship.width)
    {
        ship.x = canvas.width - ship.width;
    }
}

function drawBullet()
{
    context.beginPath();
    context.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}

function generateColor(): string
{
    const colors = [ '#39d353', '#26a641', '#006d32', '#0e4429' ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[ randomIndex ];
}

        // Dibujar los objetivos
        function drawTargets(): void
        {
            targets.forEach((target: any) =>
            {
                if (!target.destroyed)
                {
                    context.beginPath();
                    context.rect(target.x, target.y, target.width, target.height);
                    context.shadowBlur = 20;
                    context.lineWidth = 15;
                    context.fillStyle = generateColor();
                    context.lineWidth = 2;
                    context.strokeStyle = 'white';
                    context.fill();
                    context.closePath();
                    context.strokeRect(0, 0, canvas.width, canvas.height); // for white background
                }
            });
        }

        // Mover los objetivos
        function moveTargets(): void
        {
            targets.forEach((target: any) =>
            {
                if (!target.destroyed)
                {
                    target.y += 1;
                    if (target.y > canvas.height)
                    {
                        target.y = 0;
                        target.x = Math.random() * canvas.width;
                    }
                }
            });
        }

        // Detectar colisiones
        function detectCollisions()
        {
            targets.forEach((target: any) =>
            {
                if (!target.destroyed)
                {
                    if (ship.x < target.x + target.width &&
                        ship.x + ship.width > target.x &&
                        ship.y < target.y + target.height &&
                        ship.y + ship.height > target.y)
                    {
                        target.destroyed = true;
                        score++; // Incrementar el contador cuando se destruye un objetivo
                    }
                }
            });
        }

        function moveBullet()
        {
            if (!bullet.destroyed)
            {
                bullet.y -= bullet.speed;
                if (bullet.y < 0)
                {
                    bullet.destroyed = true;
                }
                targets.forEach((target: any) =>
                {
                    if (!target.destroyed)
                    {
                        if (bullet.x > target.x && bullet.x < target.x + target.width &&
                            bullet.y > target.y && bullet.y < target.y + target.height)
                        {
                            target.destroyed = true;
                            bullet.destroyed = true;
                            score++;
                        }
                    }
                });
            }
        }

        // Dibujar todo
        function draw()
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawShip();
            drawTargets();
            drawScore();
            if (!bullet.destroyed)
            {
                drawBullet();
            }
            moveTargets();
            detectCollisions();
            moveBullet();
            update(); // Llamamos la función update() para mover la nave en respuesta a las teclas presionadas.
            requestAnimationFrame(draw);
        }


// Obtener los commits de GitHub
fetch(`https://api.github.com/repos/${githubUser}/${githubUser}.github.io/commits`)
    .then((response) => response.json())
    .then((commits) =>
    {
        // Crear los objetivos (los commits de GitHub)
        targets = commits.map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            width: 12,
            height: 12,
            destroyed: false,
        }));



        // Iniciar el juego
        draw();
    });

// Crear un objeto para almacenar el estado actual de las teclas
const keys = {
    left: false,
    right: false,
    down: false, 
    up: false
};

document.addEventListener('keydown', event =>
    {
        if (event.code === 'ArrowLeft')
        {
            keys.left = true;
        } else if (event.code === 'ArrowRight')
        {
            keys.right = true;
        } else if (event.code === 'ArrowUp') // Add up movement
        {
            keys.up = true;
        } else if (event.code === 'ArrowDown') // Add down movement
        {
            keys.down = true;
        } else if (event.code === 'Space')
        {
            // Disparar la bala
            if (bullet.destroyed)
            {
                bullet.destroyed = false;
                bullet.x = ship.x + ship.width / 2;
                bullet.y = ship.y;
            }
        }
    });
    
    
    document.addEventListener('keyup', event =>
    {
        if (event.code === 'ArrowLeft')
        {
            keys.left = false;
        } else if (event.code === 'ArrowRight')
        {
            keys.right = false;
        } else if (event.code === 'ArrowUp') // Stop up movement
        {
            keys.up = false;
        } else if (event.code === 'ArrowDown') // Stop down movement
        {
            keys.down = false;
        } else if (event.code === 'Space')
        {
            // Disparar la bala
            if (bullet.destroyed)
            {
                bullet.destroyed = false;
                bullet.x = ship.x + ship.width / 2;
                bullet.y = ship.y;
            }
        }
    });
    
    // Update the moveShip function to handle up and down movement
    function update()
    {
        // Mover la nave si la tecla de flecha izquierda/derecha/arriba/abajo está presionada
        if (keys.left)
        {
            moveShip('left');
        }
        if (keys.right)
        {
            moveShip('right');
        }
        if (keys.up) // Move up
        {
            ship.y -= ship.speed;
            if (ship.y < 0) // Prevent moving out of bounds
            {
                ship.y = 0;
            }
        }
        if (keys.down) // Move down
        {
            ship.y += ship.speed;
            if (ship.y > canvas.height - ship.height) // Prevent moving out of bounds
            {
                ship.y = canvas.height - ship.height;
            }
        }
    }

// Obtener el botón de reinicio de juego
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

// Agregar un event listener al botón de reinicio de juego
resetButton.addEventListener('click', () =>
{
    // Reiniciar el juego

    // Reiniciar la nave espacial
    ship.x = canvas.width / 2;
    ship.y = canvas.height - 50;

    // Reiniciar el contador
    score = 0;

    // Reiniciar los objetivos
    targets.forEach(target =>
    {
        target.x = Math.random() * canvas.width;
        target.y = Math.random() * canvas.height / 2;
        target.destroyed = false;
    });

    // Reiniciar la bala
    bullet.x = ship.x + ship.width / 2;
    bullet.y = ship.y;
    bullet.destroyed = false;

});

