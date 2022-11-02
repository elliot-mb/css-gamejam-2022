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
        this.lastMoved = 0;
    }

    setPos(_pos){
        this.pos = _pos;
    }

    setGrid(_grid){
        this.grid = _grid;
    }

    moveDown(){
        let y = this.pos[1];
        while(this.grid[y + 1][this.pos[0]].nametag !== "Wall" && y < this.grid.length){
            y++;
        }
        this.pos[1] = y;
    }

    moveUp(){
        let y = this.pos[1];

        while(this.grid[y - 1][this.pos[0]].nametag !== "Wall" && y >= 0){
            y--;
        }
        this.pos[1] = y;
    }

    moveRight(){
        let x = this.pos[0];
 
        while(this.grid[this.pos[1]][x + 1].nametag !== "Wall" && x < this.grid[0].length - 1){
            x++;
        }
        this.pos[0] = x;
    }

    moveLeft(){
        let x = this.pos[0];

        while(this.grid[this.pos[1]][x - 1].nametag !== "Wall" && x >= 0){
            x--;
        }
        this.pos[0] = x;
    }

    draw(c){
        c.fillStyle = "#fff";
        c.fillRect(this.pos[0] * this.scale, this.pos[1] * this.scale, this.scale, this.scale)
    }
}