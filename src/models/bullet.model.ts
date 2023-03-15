/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file bullet.model.ts
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Wednesday, 15th March 2023
 */

export interface Bullet
{
    x: number;
    y: number;
    radius: number;
    speed: number;
    destroyed: boolean;
}
