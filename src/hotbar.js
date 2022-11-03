import Animator, { characters } from "./animator.js";
import Entity from "./entity.js";


export default class Hotbar extends Entity {
    constructor(_properties){
        super(_properties);
        this.slots = [0,0,0,0];
        this.index = 0;
    
        //animator
        this.slots.forEach(int => {
            this.animator = new Animator(characters.hotbar, characters.hotbar.wait);
        });
    }

    setPos(_pos){
        this.pos = _pos;
    }

    update(dt, frameID){

        this.animator.update(frameID);

            // this.visualPos[0] += (((this.pos[0] * this.scale) + this.xOff - this.visualPos[0]) / this.interp) * dt;
            // this.visualPos[1] += (((this.pos[1] * this.scale) + this.yOff - this.visualPos[1]) / this.interp) * dt;
            // console.log(this.xOff, this.yOff);
            // if(this.end[0] === this.pos[0] && this.end[1] === this.pos[1]) { this.progress(this.ctx); }  //here we pass level the necessary context to process the level change 
            //     this.animator.update(frameID);
            }
    

    draw(ctx, ts){
        // ctx.fillStyle = this.coolingDown(ts) ? "#920" : "#fff";
        this.animator.draw(ctx, this.pos[0], this.pos[0], 1000, 1000);
        //console.log(this.coolingDown(ts));
        //c.fillRect(this.visualPos[0], this.visualPos[1], this.scale, this.scale);
    }
}