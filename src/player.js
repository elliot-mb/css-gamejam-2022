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
        this.lastMoved = 0;
        this.cooldown = 100;
        this.visualPos = [0,0];
        this.interp = 30;
        
        //properties defined after level is passed
        this.grid;
        this.end;
        this.progress;
    }

    setPos(_pos){
        this.pos = _pos;
    }

    setGrid(_grid){
        this.grid = _grid;
    }

    setEnd(_end){
        this.end = _end;
    }

    setProgress(progressCallback) {
        this.progress = progressCallback;
    }

    setOffset(_offset){
        this.xOff = _offset[0];
        this.yOff = _offset[1];
    }

    coolingDown(ts){
        return (ts - this.lastMoved) < this.cooldown;
    }

    moveDown(ts){
        if(this.coolingDown(ts)) { return; }
        let y = this.pos[1];
        while(this.grid[y + 1][this.pos[0]].nametag !== "Wall" && y < this.grid.length){
            y++;
        }
        this.pos[1] = y;
        this.lastMoved = ts;
    }

    moveUp(ts){
        if(this.coolingDown(ts)) { return; }
        let y = this.pos[1];

        while(this.grid[y - 1][this.pos[0]].nametag !== "Wall" && y >= 0){
            y--;
        }
        this.pos[1] = y;
        this.lastMoved = ts;
    }

    moveRight(ts){
        if(this.coolingDown(ts)) { return; }
        let x = this.pos[0];
 
        while(this.grid[this.pos[1]][x + 1].nametag !== "Wall" && x < this.grid[0].length - 1){
            x++;
        }
        this.pos[0] = x;
        this.lastMoved = ts;
    }

    moveLeft(ts){
        if(this.coolingDown(ts)) { return; }
        let x = this.pos[0];

        while(this.grid[this.pos[1]][x - 1].nametag !== "Wall" && x >= 0){
            x--;
        }
        this.pos[0] = x;
        this.lastMoved = ts;
    }

    update(dt){
        this.visualPos[0] += (((this.pos[0] * this.scale) + this.xOff - this.visualPos[0]) / this.interp) * dt;
        this.visualPos[1] += (((this.pos[1] * this.scale) + this.yOff - this.visualPos[1]) / this.interp) * dt;
        console.log(this.xOff, this.yOff);
        if(this.end[0] === this.pos[0] && this.end[1] === this.pos[1]) { this.progress(this.ctx); }  //here we pass level the necessary context to process the level change 
    }

    draw(c, ts){
        c.fillStyle = this.coolingDown(ts) ? "#920" : "#fff";
        //console.log(this.coolingDown(ts));
        c.fillRect(this.visualPos[0], this.visualPos[1], this.scale, this.scale);
        
    }
}