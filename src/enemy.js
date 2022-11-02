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

import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(_properties){
        super(_properties);
    }
}

