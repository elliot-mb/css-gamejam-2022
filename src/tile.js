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
        c.fillStyle = this.visible ? (this.nametag === "End" ? "#2f2" : "#222" ) : "#0000";
        c.fillRect((this.pos[0] * this.scale)  + this.xOff, (this.pos[1] * this.scale) + this.yOff, this.scale, this.scale);
        
    }
}   