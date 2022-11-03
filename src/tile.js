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

import Animator, { characters } from "./animator.js";
import Entity from "./entity.js";

export default class Tile extends Entity {
    constructor(_properties, _colour){
        super(_properties);
        this.colour = _colour;
        this.animator = new Animator(characters.brick, characters.brick.idle);
        this.animator.set(Math.round(Math.random() * characters.brick.idle.frames));
    }

    update(frameID){
        //this.animator.update(frameID);
    }

    draw(ctx){
        ctx.fillStyle = this.visible ? this.colour : "#0000";
        ctx.fillRect((this.pos[0] * this.scale)  + this.xOff, (this.pos[1] * this.scale) + this.yOff, this.scale, this.scale);
        let [x, y] = this.toScreenCoords();
        if(this.nametag === "Wall"){
            this.animator.draw(ctx, 
                x, 
                y,
                this.scale,
                this.scale
            );
        }
    }
}   