/* TODO 
inherited
props:
    ray 
    position
    health //tiles dubiously need health???
    hitbox

methods:
    move() 
    update()
    animate()
    collide() //checks neighbours of entity (all entities are indexed on a grid)
    draw() 

used and additional
props: 
    health
    damage

methods:
    pathfind(player)

*/

const spriteDimensions = 16; //Dimension of each individual sprite
const spriteAnimations = []; //Maps from name to frames
const staggerFrames = 15; //Number of gameFrames between updates

import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(_properties){
        super(_properties);
        this.speed = Math.random() * 3 + 0
    }
}

