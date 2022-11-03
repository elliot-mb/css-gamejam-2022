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
        image: () => { 
            // let b = await fetch('snail.png').then(r => r.blob());
            const i = new Image();
            i.src = '../img/snail.png';
            return i;
        },
        //modes
        jump: {
            stagger: 10,
            row: 0,
            frames: 4
        }
    },

    hotbar: {
        resolution: 32,
        image: () => { 
            // let b = await fetch('snail.png').then(r => r.blob());
            const playerImage = new Image();
            playerImage.src = '../img/snail.png';
            return playerImage;
        },
        //moves
        wait: {
            row: 0,
            frames: 4,
            stagger: 10
            },
        },
    coin: {
        resolution: 32,
        image: () => {
            const i = new Image();
            i.src = '../img/coin.png';
            return i;
        },
        //modes
        idle: {
            stagger: 10,
            row: 0,
            frames: 4
        },
        collect: {
            stagger: 2,
            row: 1,
            frames: 5
        }
    },
    rock: {
        resolution: 32,
        image: () => {
            const i = new Image();
            i.src = '../img/rock.png';
            return i;
        },
        idle: {
            stagger: 1,
            row: 0,
            frames: 1
        }
    },
    brick: {
        resolution: 32,
        image: () => {
            const i = new Image();
            i.src = '../img/brick.png';
            return i;
        },
        idle: {
            stagger: 30,
            row: 0,
            frames: 5

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

    reset(){ 
        this.frame = 0;
        this.cropping = this.cropOnFrame(0);
    }

    setMode(m){
        this.mode = m;
    }

    cropOnFrame(f){
        return {
            sx: this.character.resolution * f,
            sy: this.mode.row * this.character.resolution, 
            sw: this.character.resolution,
            sh: this.character.resolution
        };
    }

    update(frameID){ //changes the frame
        if(frameID % this.mode.stagger === 0){
            const f = this.frame % this.mode.frames;
            this.cropping = this.cropOnFrame(f);
            this.frame++;
        }
    }

    draw(ctx, dx, dy, dw, dh){ //draws the frame
        ctx.drawImage(this.character.image(), 
            this.cropping.sx, 
            this.cropping.sy,
            this.cropping.sw,
            this.cropping.sh,
            dx, dy, dw, dh);
    }
}