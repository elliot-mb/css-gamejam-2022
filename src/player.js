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


import Animator, { characters } from "./animator.js";
import Entity from "./entity.js";

export default class Player extends Entity {
    constructor(_properties){
        super(_properties);
        this.lastMoved = 0;
        this.cooldown = 100;
        this.visualPos = [0,0];
        this.interp = 3;
        
        //animator
        this.animator = new Animator(characters.snail, characters.snail.jump);
        this.justMoved = false;
        this.framesLeft = 0;

        //properties defined after level is passed
        this.grid;
        this.width;
        this.end;
        this.progress;
        this.levelDims;
        this.coinRefs = []; // list of all coins

        //progress
        this.coins = 0;
    }

    reset(){
        this.coins = 0;
        this.coinRefs = [];
    }

    setPos(_pos){
        this.pos = _pos;
    }

    setGrid(_grid){
        this.grid = _grid;
        this.width = this.grid.map(row => row.length).reduce((x, y) => Math.max(x,y), 0);
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

    setLevelDims(dims){
        this.levelDims = dims;
    }

    addCoinRef(c){
        this.coinRefs.push(c);
    }

    addCoins(count){
        this.coins += count;
    }

    coolingDown(ts){
        return (ts - this.lastMoved) < this.cooldown;
    }

    moveY(ts, dir, level, _fDead){
        let moves = dir === "u" ? -1 : 1;
        let y = this.pos[1];
        let enemyStationary = level.enemies.filter(e => e.nametag.match(/[0-9]/g))
        // console.log(enemyStationary)
        while(this.grid[y + moves][this.pos[0]].nametag !== "Wall" && y < this.grid.length - 1 && y > 0){
            this.coinRefs.map(c => c.playerOnMe([this.pos[0], y]));
            enemyStationary.forEach((e, index) => {
                if (e.pos[0] === this.pos[0] && e.pos[1] === y){
                    console.log("dead 2")
                    _fDead();
                }

            })
            y += moves;
        }
        this.pos[1] = y;
        this.lastMoved = ts;
        this.justMoved = this.framesLeft === 0 ? true : false;
    }

    moveX(ts, dir, level, _fDead){
        let moves = dir === "l" ? -1 : 1;
        let x = this.pos[0];
        let enemyStationary = level.enemies.filter(e => e.nametag.match(/[0-9]/g))
 
        while(this.grid[this.pos[1]][x + moves].nametag !== "Wall" && x < this.width - 1 && x > 0){
            this.coinRefs.map(c => c.playerOnMe([x, this.pos[1]]));
            enemyStationary.forEach((e, index) => {
                if (e.pos[0] === x && e.pos[1] === this.pos[1]){
                    console.log("dead 2")
                    _fDead();
                }

            })
            x += moves;
        }
        this.pos[0] = x;
        this.lastMoved = ts;
        this.justMoved = this.framesLeft === 0 ? true : false;
    }

    update(dt, frameID){
        this.visualPos[0] += (((this.pos[0] * this.scale) + this.xOff - this.visualPos[0]) / this.interp);
        this.visualPos[1] += (((this.pos[1] * this.scale) + this.yOff - this.visualPos[1]) / this.interp);
        if(this.end[0] === this.pos[0] && this.end[1] === this.pos[1]) { this.progress(this.ctx); }  //here we pass level the necessary context to process the level change 
    
        this.animatorController(frameID);

        this.coinRefs.map(c => c.update(frameID));
    }

    animatorController(frameID){
        if(this.justMoved === true){
            this.justMoved = false;
            this.animator.reset();
            this.framesLeft = characters.snail.jump.frames * characters.snail.jump.stagger;
        }

        //jumping animination
        if(this.framesLeft > 0){
            this.animator.update(frameID);
            this.framesLeft--;
        }
        if(this.framesLeft === 1) this.animator.reset();
    }

    draw(ctx, ts){
        ctx.fillStyle = this.coolingDown(ts) ? "#920" : "#fff";
        this.animator.draw(ctx, this.visualPos[0], this.visualPos[1], this.scale, this.scale);
        this.coinRefs.map(c => c.draw(ctx));
        //console.log(this.coolingDown(ts));
        //c.fillRect(this.visualPos[0], this.visualPos[1], this.scale, this.scale);
    }
}