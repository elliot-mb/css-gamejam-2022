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

used/additional
props:
    items[]

methods:
    use(items)


subclass: 
    item
    
*/

import Entity from "./entity.js";

export default class Player extends Entity {
    constructor(_properties){
        super(_properties);
    }

    setPos(_pos){
        this.pos = _pos;
    }

    move(direction){
        switch(direction){
            case "u":
                this.pos[1]--;
                break;
            case "d":
                this.pos[1]++;
                break;
            case "l":
                this.pos[0]--;
                break;
            case "r":
                this.pos[0]++;
                break;
            default:
                console.error("not a direction "+direction);
        }
    }

    draw(c){
        c.fillStyle = "#fff";
        c.fillRect(this.pos[0] * this.scale, this.pos[1] * this.scale, this.scale, this.scale)
    }
}