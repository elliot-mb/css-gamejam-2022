import Animator, {characters} from "./animator.js";
import Tile from "./tile.js";

export default class Coin extends Tile{
    constructor(properties, _colour, _playerPosition, _playerGetCoin){
        super(properties);
        this.colour = _colour;
        this.playerPosition = _playerPosition; //callback to get player position
        this.playerGetCoin = _playerGetCoin; //callback to perform actions on recieving coin
        
        this.animator = new Animator(characters.coin, characters.coin.idle);
        this.framesLeft = characters.coin.collect.frames * characters.coin.collect.stagger; 
        this.hasReset = false;
    }

    playerOnMe(pos){ //gliding over a coin
        if(pos[0] === this.pos[0] && pos[1] === this.pos[1] && this.visible === true){
            this.playerGetCoin();
            this.visible = false;
        }
    }   

    update(frameID){ //landing on a coin
        this.playerOnMe(this.playerPosition());
        this.animator.update(this.visible ? frameID : this.framesLeft);
        if(!this.visible) this.framesLeft--;
    }

    draw(ctx){
        let [x, y] = this.toScreenCoords();
        if(this.visible) { 
            this.animator.draw(ctx, 
            x, 
            y,
            this.scale,
            this.scale
            );
        }else{
            this.animator.setMode(characters.coin.collect);
            if(!this.hasReset) {
                this.animator.reset();
                this.hasReset = true;
            }
            if(this.framesLeft >= 0){
                this.animator.draw(ctx, 
                    x, 
                    y,
                    this.scale,
                    this.scale
                    );
            }
        }
    }
}