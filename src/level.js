/* TODO
contains level loader inner class.

it must be able to let tile and enemy know about the level, when a level is loaded. 
*/

// have a level have all the levels and a a current loaded level
import Player from "player.js"
import Enemy from "enemy.js"
import Tile from "tile.js"

export default class level{
    // props:
    //     levels[] //level files 
    //     tiles[] //array of tiles 

    constructor(){
        this.levels = []; // array of json level objects e.g. [{["levelID":0, "levelMatrix":["#####","####0", ...]}, {....}]
        this.tiles  = [];
        this.currLevel = 0;

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

        for (let i = 0; i <data.length(); i++){ // iterates through each level
            let level = {};
            //==============================
            //creates matrix for a single level and fills it
            let levelRows = data[i].split('\n'); // each row of data[i]
            //==============================

            level.push({"levelID":i,"levelMatrix":levelRows})
            this.levels.push(level)
        }
    }

    unpack(ctx){
        let levelMatrix = this.levels[this.currLevel].levelMatrix

        for (let y = 0; y < levelMatrix.length(); i++){
    
            let levelRow = levelMatrix.Split('\n');
            let entityRow = [];

            for (let x = 0; x < levelRow.length(); x++){
                let entity = levelRow[y][x];
                let entityProp;
                let tiles = [];

                switch (entity){
                    case 'S':
                        entityProp ={
                                        "nametag":"Ant", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined
                                    };
                        tiles.push(new Player(entityProp))

                    case 'D':
                        entityProp ={
                                        "nametag":"End", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined
                                    };
                        tiles.push(new Tile(entityProp))

                    case '#':
                        entityProp ={
                                        "nametag":"Wall", 
                                        "pos":[x,y], 
                                        "visible":true, 
                                        "collides":true,
                                        "ctx":ctx, 
                                        "spriteInfo":undefined
                                    };
                        tiles.push(new Tile(entityProp))

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
                }
            }
        }
    }

    incLevel(){
        this.currLevel += 1;
    }

    resLevel(){
        this.currLevel = 0;
    }
    //     update() //updates level

    //     draw()   // draws stuff


}


