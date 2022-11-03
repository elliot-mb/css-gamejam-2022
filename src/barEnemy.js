import Enemy from "./enemy.js"

export default class barEnemy extends Enemy{

    constructor(_properties) {
        super(_properties);
        this.timeStamp = 0;
        this.colour;
        this.dead = false;
        this.colourCount = 0;
    }

    draw(c){
        // c.fillStyle = this.visible ? `#${this.colour}00` : "#0000" ;
        
        if (this.visible){
            switch(this.nametag){
                case("EnemyA"):
                    c.fillStyle = `#${this.colour}0000`
                    // c.fillStyle = "#F00"
                    break;
            }
            switch(this.nametag){
                case("EnemyB"):
                    c.fillStyle = `#0000${this.colour}`
                    // c.fillStyle = "#F00"
                    break;
            }
        }

        c.fillRect((this.pos[0] * this.scale)  + this.xOff, (this.pos[1] * this.scale) + this.yOff, this.scale, this.scale);
    }
    //void function which updates properties and changes colours
}