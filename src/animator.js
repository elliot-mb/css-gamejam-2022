/*
What does this class do?
It can belong to any entity class, and it can be used to render the enemy. 
It takes a frame ID for its draw method. It may have several modes for animating a spritesheet. 
This can be defined in a minimal json.
 */

//information about all the animated sprites in the game
export const characters = {
    snail: {
        resolution: 32,
        stagger: 10,
        image: () => { 
            // let b = await fetch('snail.png').then(r => r.blob());
            const playerImage = new Image();
            playerImage.src = '../img/snail.png';
            return playerImage;
        },
        //moves
        jump: {
            row: 0,
            frames: 4
        }
    }
    //other characters like enemies 
};



export default class Animator{
    constructor(_character, initMode){
        this.character = _character; //of toplevel characters json
        this.frame = 0;
        this.mode = initMode;
        this.cropping = {
            //cropping dimensions
            sx: 0,
            sy: 0, 
            sw: 0,
            sh: 0
        }

        this.update(0);
    }

    reset(){ this.frame = 0; }

    update(frameID){
        if(frameID % this.character.stagger === 0){
            const f = this.frame % this.mode.frames;
            this.cropping = {
                sx: this.character.resolution * f,
                sy: this.mode.row * this.character.resolution, 
                sw: this.character.resolution,
                sh: this.character.resolution
            }
            this.frame++;
        }
    }

    draw(ctx, dx, dy, dw, dh){
        ctx.drawImage(this.character.image(), 
            this.cropping.sx, 
            this.cropping.sy,
            this.cropping.sw,
            this.cropping.sh,
            dx, dy, dw, dh);
    }
}