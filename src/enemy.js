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
    constructor(_properties, _colour){
        super(_properties);
        this.colour = _colour;
        // this.speed = Math.random() * 3 + 0
    }

    draw(ctx){
        // c.fillStyle = this.visible ? (this.nametag === "Enemy0" ? "#F00" : "#0000" ) : "#0000";

        if (this.visible){
            switch(this.nametag){
                case("Enemy0"):
                    ctx.fillStyle = "#F00";
                    break;
            }
        }

        ctx.fillRect((this.pos[0] * this.scale)  + this.xOff, (this.pos[1] * this.scale) + this.yOff, this.scale, this.scale);

    }
}


