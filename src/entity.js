/* TODO 
methods:
    collide() //checks neighbours of entity (all entities are indexed on a grid)
    draw() 
*/
const spriteDimensions = 16; //Dimension of each individual sprite
const spriteAnimations = []; //Maps from name to frames
const staggerFrames = 15; //Number of gameFrames between updates

export default class Entity {
    constructor(properties){
        this.scale = properties.scale;
        this.nametag = properties.nametag;
        this.pos = properties.pos;
        this.visible = properties.visible;
        this.colliding = []; //comprehensive list of collisions with current object
        this.collides = properties.collides;
        this.ctx = properties.ctx;
        this.spriteInfo = properties.spriteInfo;
        this.health = properties.health;
        this.xOff = properties.xOff;
        this.yOff = properties.yOff;
        //this.dims = properties.dims;
        //this.vel = properties.vel;        
        //this.camera = properties.camera;
        //this.colour = properties.colour;
        //this.jumpable = properties.jumpable;
        //this.grav = properties.grav; //is effected by gravity
        //this.simulated = properties.simulated;
        //this.drag = properties.drag;
        if(this.spriteInfo){ 
          this.spriteInfo.spriteStates.forEach((state, index) => {
            let frames = {
                    loc: [],
                }

                for (let i = 0; i < state.frames; i++) {
                    let positionX = i * spriteDimensions;
                    let positionY = index * spriteDimensions;
                    frames.loc.push({x: positionX, y: positionY});
                }
                spriteAnimations[state.name] = frames;
            });  
        }
        


    }

    move() { //Done in enemy/player, tiles do not need to move

    }

    update(strategy) { //same as move() 
        this.pos = strategy(pos)
    }

    animate(anim, gameFrame) { //Takes in name of animation and gameFrame and draws the proper image at proper location
        let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[anim].loc.length;
        let frameX = spriteDimensions * position;
        let frameY = spriteAnimations[anim].loc[position].y
        this.draw(frameX, frameY);
    }

    draw() { //renders the sprite
        this.ctx.drawImage(this.spriteInfo.spriteSheet, frameX, frameY, spriteDimensions, spriteDimensions, pos.x, pos.y, spriteDimensions, spriteDimensions);
    }

    collide() { //idk

    }
    
}
