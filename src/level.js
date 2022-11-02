/* TODO
contains level loader inner class.

it must be able to let tile and enemy know about the level, when a level is loaded. 
*/

// have a level have all the levels and a a current loaded level
import Player from "./player.js";
import Enemy from "./enemy.js";
import Tile from "./tile.js";
import { INITIAL_HEIGHT } from "./main.js";

export default class Level{
    // props:
    //     levels[] //level files 
    //     tiles[] //array of tiles 

    constructor(_player){
        this.levels = []; // array of json level objects e.g. [{["levelID":0, "levelMatrix":["#####","####0", ...]}, {....}]
        this.tiles  = [];
        this.currLevel = 0;
        this.player = _player;
        this.playerStart = []; //array of jsons of start positions 
        this.scales = [];
    }
    
    // methods: 
    //     unpack(level file) //basically just makes an array of tiles according to the text file 
    async parseLevel(){
        let data;
        try{
            const levelPromise = await fetch("../data/levels/levels.txt"); // promise kinda like a pipe that has a buffer
            data = await (await levelPromise.text()).split('----'); // waits for promise to come and converts it into an array of strings

        } catch(err){
            console.error(err);
        }

        for (let i = 0; i < data.length; i++){ // iterates through each level
            let level = {};
            //==============================
            //creates matrix for a single level and fills it
            let levelRows = data[i].split('\n'); // each row of data[i]
            //==============================

            level["levelID"] = i;
            level["levelMatrix"] = levelRows;
            this.levels.push(level)
            this.scales.push(INITIAL_HEIGHT/(levelRows.length - 1));
        }
        console.log(this.scales);
        
    }

    unpack(ctx){
        let levelMatrix = this.levels[this.currLevel].levelMatrix;
        let scale = this.scales[this.currLevel];

        for (let y = 0; y < levelMatrix.length; y++){
    
            let levelRow = levelMatrix[y];
            let tiles = [];

            for (let x = 0; x < levelRow.length; x++){
                let entity = levelRow[x];
                let entityProp;
                let t;

                switch (entity){
                    case 'S':
                        this.player.setPos([x,y]);

                        this.playerStart.push({x: x, y: x});

                        this.player.scale = scale;
                        tiles.push(this.player);
                        break;
                    case 'D':
                        console.log(`recognises D`);
                        entityProp ={
                                        "nametag":"End", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined,
                                        "scale":scale
                                    };
                        t = new Tile(entityProp);
                        tiles.push(t)
                        break;
                    case '#':
                        console.log(`recognises #`);
                        entityProp ={
                                        "nametag":"Wall", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined,
                                        "scale":scale
                                    };
                        t = new Tile(entityProp);
                        tiles.push(t)
                        break;
                    case `p`:
                        console.log(`recognises p`);
                        entityProp ={
                                        "nametag":"Path", 
                                        "pos":[x,y], 
                                        "visible":false, 
                                        "collides":false,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined,
                                        "scale":scale
                                    };
                        t = new Tile(entityProp);
                        tiles.push(t);
                        break;
                    default:
                        if (entity.match(/([A-Z]\[S,D])/g)){
                            //create death bar object

                        }
                        else if (entity.match(/([0-9])/g)){
                            entityProp =
                                {
                                    "nametag":`Enemy${entity}`, 
                                    "pos":[x,y], 
                                    "visible":true, 
                                    "collides":true,
                                    "ctx":ctx, 
                                    "spriteInfo":undefined
                                };
                                tiles.push(new Enemy(entityProp))
                        }    
                        break;
                }
            }
            this.tiles.push(tiles);
            
        }
        this.player.setGrid(this.tiles);
        console.log(this);
    }

    incLevel(){
        this.currLevel += 1;
    }

    resLevel(){
        this.currLevel = 0;
    }
    //     update() //updates level

    start(){
        console.log(this.playerStart[this.currLevel]);
        let coords = this.playerStart[this.currLevel];

        this.player.setPos([coords.x, coords.y]);
    }

    draw(c){
        this.tiles.map(x => { x.map(y => {
            if(y.nametag !== "Ant") y.draw(c);
        }); });
        //this.player.draw(c);

    }


}


