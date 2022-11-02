/* TODO
contains level loader inner class.

it must be able to let tile and enemy know about the level, when a level is loaded. 
*/

// have a level have all the levels and a a current loaded level

class level{

    // props:
    //     levels[] //level files 
    //     tiles[] //array of tiles 

    constructor(){
        this.levels = []; // array of json level objects e.g. {["levelID":0, ["#####","####0", ...], ....}
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

    incLevel(){
        this.level += 1;
    }

    resLevel(){
        this.level = 0;
    }
    //     update() //updates level

    //     draw()   // draws stuff


}

