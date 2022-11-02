/* TODO 
props:
    position 
    health //tiles dubiously need health???
    hitbox

methods:
    move() 
    update()
    animate()
    collide() //checks neighbours of entity (all entities are indexed on a grid)
    draw() 
*/

const spriteDimensions = 16;
const spriteAnimations = [];

export default class Entity {
    constructor(properties){
        this.nametag = properties.nametag;
        this.pos = properties.pos;
        this.visible = properties.visible;
        this.colliding = []; //comprehensive list of collisions with current object
        this.collides = properties.collides;
        this.ctx = properties.ctx;
        this.spriteInfo = properties.spriteInfo;
        //this.dims = properties.dims;
        //this.vel = properties.vel;        
        //this.camera = properties.camera;
        //this.colour = properties.colour;
        //this.jumpable = properties.jumpable;
        //this.grav = properties.grav; //is effected by gravity
        //this.simulated = properties.simulated;
        //this.drag = properties.drag;

        this.spriteInfo.array.forEach((state, index) => {
            let frames = {
                loc: [],
            }

            for (let i = 0; i < state.frames; i++) {
                let positionX = i * spriteDimensions;
                let positionY = index * spriteDimensions;
                frames.loc.push({x: positionX, y: positionY});
            }
            spriteAnimations[state.name] = frames
        });


    }

    move(target) {
        
    }

    update() {

    }

    animate() {

    }

    draw() {

    }

    collide() {

    }
    
}
