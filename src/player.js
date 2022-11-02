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
        this.grid;
    }

    setPos(_pos){
        this.pos = _pos;
    }

    setGrid(_grid){
        this.grid = _grid;
    }

    move(direction){
        switch(direction){
            case "u":
                this.moveUp();
                break;
            case "d":
                this.moveDown();
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

    moveDown(){
        let y = this.pos[1];
        console.log(this.grid);
        while(this.grid[y][this.pos[0]].nametag !== "Wall" && y < this.grid.length){
            y++;
        }
        this.pos[1] = y - 1;
    }

    moveUp(){
        let y = this.pos[1];
        console.log(this.grid);
        while(this.grid[y][this.pos[0]].nametag !== "Wall" && y >= 0){
            y--;
        }
        this.pos[1] = y + 1;
    }

    draw(c){
        c.fillStyle = "#fff";
        c.fillRect(this.pos[0] * this.scale, this.pos[1] * this.scale, this.scale, this.scale)
    }
}