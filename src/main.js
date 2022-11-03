import Level from "./level.js";
import Player from "./player.js";
import UI from "./ui.js";

let canvas = document.getElementById("canvas"); 
let c = canvas.getContext("2d"); 
export const INITIAL_WIDTH = 1920;
export const INITIAL_HEIGHT = 1080;

const playerImage = new Image();
playerImage.src = '../img/snail.png';

const ui = new UI(); ui.toMenu();
const player = new Player({
    "nametag":"Ant", 
    "pos":[0,0], 
    "visible":true, 
    "collides":true,
    "ctx":c, 
    // "spriteInfo":undefined
}); //grid that gets generated by level

let fsm = new StateMachine({
    init: 'menu',
    transitions: [
        {name: 'play', from: 'menu', to: 'game'},
        {name: 'visit', from: 'menu', to: 'shop'},
        {name: 'quit', from: ['menu', 'game', 'death', 'shop'], to: 'menu'},
        {name: 'lose', from: 'game', to: 'death'},
        {name: 'restart', from: 'death', to: 'game'}
    ],
    methods: {
        onPlay: function() { 
            background.colour = "#111";
            ui.toPlay();
            level.start();
        },
        onVisit: function() {
            background.colour = "#445";
            ui.toShop();
        },
        onQuit: function() {
            background.colour = "#555";
            ui.toMenu();
        },
        onLose: function() {  
            background.colour = "#511";
            ui.toLose();
        },
        onRestart: function() {
            background.colour = "#111"
            ui.toGame();
        }
    }
});

let level = new Level(player, () => {
    fsm.lose();
});
await level.parseLevel();
level.unpack(c);

let keyListener = {
    pressed: {}, //set of pressed keys
    methods: {
        "a": (ts) => { //some methods take timestamp so all methods take timestamp
            player.moveLeft(ts);
        },
        "d": (ts) => {
            player.moveRight(ts);
        },
        "s": (ts) => {
            player.moveDown(ts);
            try { fsm.visit(); } catch { }
        },
        "w": (ts) => {
            player.moveUp(ts);
        },
        " ": (ts) => { 
            
        },
        "Enter": (ts) => {
            try { fsm.play(); } catch { }
        },
        "Backspace": (ts) => {
            try { fsm.quit(); } catch { }
        }
    },
    update: (timestamp) => {
        for(let k in keyListener.pressed) {
            let methodOrUndefined = keyListener.methods[k];
            
            if(methodOrUndefined){
                methodOrUndefined(timestamp);
            }
        }
    }
};

document.body.addEventListener("keydown", (e) => {
    keyListener.pressed[e.key] = true;
});
document.body.addEventListener("keyup", (e) => {
    delete keyListener.pressed[e.key];

});

let background = {
    colour: "#555",
    draw: () => {
        c.fillStyle = background.colour;
        c.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);
    }
}

let dt = 0;
let pt = 0;
let randDuration = Math.floor(Math.random() * 3);


const makeFrame = (timestamp) => {
    dt = timestamp - pt;
    pt = timestamp;
    
    background.draw();
    keyListener.update(timestamp);
    level.update(timestamp, randDuration);


    if (fsm.state === "game"){
        level.draw(c); 
        if(dt){
            player.update(dt);
            player.draw(c, timestamp);
        }
    } 
    ui.draw(c);


    requestAnimationFrame(makeFrame);
}

makeFrame();