/* TODO 
keyhandler (inner class) updates this.

collides(walls, enemies), must let 

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
    collide()
    draw() 
*/

import Entity from "./entity.js";

export default class Tile extends Entity {
    constructor(_properties){
        super(_properties);
    }

    draw(c){
        c.fillStyle = this.visible ? "#222" : "#0000";
        c.fillRect(this.pos[0] * this.scale, this.pos[1] * this.scale, this.scale, this.scale);
        
    }
}   