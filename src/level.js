/* TODO
contains level loader inner class.

it must be able to let tile and enemy know about the level, when a level is loaded. 
*/

// have a level have all the levels and a a current loaded level
import Player from "./player.js";
import Tile from "./tile.js";
import { INITIAL_HEIGHT, INITIAL_WIDTH } from "./main.js";
import Enemy from "./enemy.js";
import barEnemy from "./barEnemy.js";
import Coin from "./coin.js";

export default class Level{
    // props:
    //     levels[] //level files 
    //     tiles[] //array of tiles 

    constructor(_player, _deathCallback, _winCallback){
        this.levels = []; // array of json level objects e.g. [{["levelID":0, "levelMatrix":["#####","####0", ...]}, {....}]
        this.tiles  = [];
        this.enemies = [];
        this.barEnemies= [];
        this.barDurations = {};

        this.deathCallback = _deathCallback; //function that does cool things (tells main to change state to death)
        this.winCallback = _winCallback;

        this.currLevel = 0;
        this.player = _player;
        this.playerStart = []; //array of jsons of start positions 
        this.scales = [];
        this.offsets = [];
        this.dims = [];
    }
    
    // methods: 
    //     unpack(level file) //basically just makes an array of tiles according to the text file 
    async parseLevel(){
        let data;
        try{
            const levelPromise = await fetch("./data/levels/levels.txt"); // promise kinda like a pipe that has a buffer
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
            let [scale, xOff, yOff] = this.centre(levelRows.length - 1, levelRows.map(x => x.length).reduce((x, y) => Math.max(x, y), 0));
            this.scales.push(scale);
            this.offsets.push([xOff, yOff]);
            this.dims.push([levelRows.length - 1, levelRows.map(x => x.length).reduce((x, y) => Math.max(x, y), 0)]);
            
        }
        console.log(this.scales);
        
    }

    centre(rows, columns){
        let scaleY = INITIAL_HEIGHT/rows;
        let scaleX = INITIAL_WIDTH/columns;
        let scale = Math.min(scaleY, scaleX);
        let xOff = 0, yOff = 0;
        if(scaleY < scaleX){ //centre on the x axis 
            let width = scaleY * columns;
            xOff = (INITIAL_WIDTH - width) / 2;
        }else{
            let height = scaleX * rows;
            yOff = (INITIAL_HEIGHT - height) / 2;
        }
        console.log(scale, xOff, yOff);
        return [scale, xOff, yOff]; //return scale and x and y offset 
    }

    unpack(ctx){
        this.tiles  = [];
        this.enemies = [];
        this.barEnemies= [];

        let levelMatrix = this.levels[this.currLevel].levelMatrix;
        let scale = this.scales[this.currLevel];
        let offset = this.offsets[this.currLevel];

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
                        this.player.setOffset(offset);
                        this.player.setLevelDims();

                        this.playerStart.push({x: x, y: y});

                        this.player.scale = scale;
                        tiles.push(this.player);
                        break;
                    case 'D':

                        entityProp ={
                                        "nametag":"End", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        // "spriteInfo":undefined,
                                        "scale":scale,
                                        "xOff":offset[0],
                                        "yOff":offset[1]
                                    };
                        t = new Tile(entityProp, "#2f2", undefined);
                        tiles.push(t)
                        this.player.setEnd([x,y]);
                        break;
                    case '#':

                        entityProp ={
                                        "nametag":"Wall", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        // "spriteInfo":undefined,
                                        "scale":scale,
                                        "xOff":offset[0],
                                        "yOff":offset[1]
                                    };
                        t = new Tile(entityProp, "#222", undefined);
                        tiles.push(t)
                        break;
                    case `p`:

                        entityProp ={
                                        "nametag":"Path", 
                                        "pos":[x,y], 
                                        "visible":false, 
                                        "collides":false,
                                        "ctx":ctx, 
                                        // "spriteInfo":undefined,
                                        "scale":scale,
                                        "xOff":offset[0],
                                        "yOff":offset[1]
                                    };
                        t = new Tile(entityProp, "#0000", undefined);
                        tiles.push(t);
                        break;
                    case '@':
                        let coin = new Coin(
                            {
                                "nametag":"Coin",
                                "pos":[x,y],
                                "visible":true,
                                "collides":true,
                                "ctx":ctx,
                                "scale":scale,
                                "xOff":offset[0],
                                "yOff":offset[1]
                            },
                            "#aa0",
                            () => {
                                return this.player.pos;
                            },
                            () => {this.player.addCoins(1);}
                        );
                        tiles.push(coin);
                        this.player.addCoinRef(coin);
                        break;
                    default:
                        if (entity.match(/[A-Z]/g)){
                            entityProp =
                            {
                                "nametag":`Enemy${entity}`, 
                                "pos":[x,y], 
                                "visible":true, 
                                "collides":true,
                                "ctx":ctx, 
                                // "spriteInfo":undefined,
                                "scale":scale,
                                "xOff":offset[0],
                                "yOff":offset[1]
                            };
                            entityProp["visible"] = false;
                            if (this.barDurations[entityProp["nametag"]] === undefined){
                                this.barDurations[entityProp["nametag"]] = Math.floor(Math.random() * 3000) + 5000
                                console.log(this.barDurations[entityProp["nametag"]])
                            }
                            let enemy = new barEnemy(entityProp);

                            tiles.push(enemy);
                            this.barEnemies.push(enemy)
                            console.log("pusshing bar enemy ")
                            this.enemies.push(enemy)


                            // console.log(this.barDurations)
                            // console.log(this.barEnemies)
                            console.log(entityProp.nametag)
                            console.log(this.barEnemies)
                        }
                        else if (entity.match(/([0-9])/g)){
                            entityProp =
                                {
                                    "nametag":`Enemy${entity}`, 
                                    "pos":[x,y], 
                                    "visible":true, 
                                    "collides":true,
                                    "ctx":ctx, 
                                    // "spriteInfo":undefined,
                                    "scale":scale,
                                    "xOff":offset[0],
                                    "yOff":offset[1]
                                };
                                let enemy = new Enemy(entityProp, "#f22");
                                tiles.push(enemy);
                                this.enemies.push(enemy);
                                
                        }    
                        break;
                }
            }
            this.tiles.push(tiles);
            
        }
        this.player.setGrid(this.tiles);
        this.player.setProgress((ctx) => { this.incLevel(ctx); });
        console.log(this);
        
    }

    resetForLoad(){
        this.tiles = [];
    }

    incLevel(ctx){
        console.log(this.currLevel);
        if(this.currLevel > this.levels.length - 2) { 
            console.log("END!");
            return this.winCallback(); 
        }
        //this.player.reset([this.playerStart[this.currLevel].x, this.playerStart[this.currLevel].y]);
        this.player.resetPos([this.playerStart[this.currLevel].x, this.playerStart[this.currLevel].y]);
        this.currLevel += 1;
        this.resetForLoad();
        this.unpack(ctx);
    }

    resLevel(ctx){
        this.currLevel = 0;
        this.player.reset();
        this.resetForLoad();
        this.unpack(ctx);
    }
    //     update() //updates level

    start(){
        console.log(this.playerStart[this.currLevel]);
        let coords = this.playerStart[this.currLevel];

        this.player.setPos([coords.x, coords.y]);
    }

    update(timestamp, frameID){
        // if(this.enemies.map(e => e.pos[0] === this.player.pos[0] && e.pos[1] === this.player.pos[1]).reduce((x, y) => x || y), false) { 
        //     console.log("collision with enemy here")
        //     this.deathCallback();
        // }
        this.barEnemies.forEach((e, index) => {
            let timeElapsed = (timestamp - e.timeStamp)
            // console.log("timeElapsed:", timeElapsed)
            // console.log("enemytype:", e)
            if (timeElapsed < this.barDurations[e.nametag] && e.colourCount <= 254){

                e.visible = true;
                e.colourCount += 0.5;
                e.colour = Math.floor(e.colourCount).toString(16);
                e.dead = false;

            } else{
                e.timeStamp = timestamp
                // e.visible = true;
                e.dead = true;
                e.colourCount = 0;
                e.colour = e.colourCount.toString(16);
            }
            // console.log(e.colour)

        })

        this.enemies.forEach((e, index) => {
            if (e.nametag.match(/[0-9]/g) && e.pos[0] === this.player.pos[0] && e.pos[1] === this.player.pos[1]){
                console.log("dead 2")
                this.deathCallback();
            }
            else if (e.dead === true && e.pos[0] === this.player.pos[0] && e.pos[1] === this.player.pos[1]){
                console.log("dead 1")
                this.deathCallback();
            }

        })

    
    }

    draw(c){
        this.tiles.map(x => { x.map(y => {
            if(y.nametag !== "Ant" && y.nametag !== "Coin") y.draw(c);
        }); });
        //this.player.draw(c);

    }


}


//commit