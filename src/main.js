import Animator, { characters } from "./animator.js";
import Hotbar from "./hotbar.js";
import Level from "./level.js";
import Player from "./player.js";
import UI from "./ui.js";

let canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d"); 

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

export const INITIAL_WIDTH = 1920;
export const INITIAL_HEIGHT = 1080;

const playerImage = new Image();
playerImage.src = '../img/snail.png';

const player = new Player({
    "nametag":"Ant", 
    "pos":[0,0], 
    "visible":true, 
    "collides":true,
    "ctx":ctx
}, "#fff", undefined); //grid that gets generated by level

const ui = new UI(() => {return player.coins;}); ui.toMenu();

//let animator = new Animator(characters.snail, characters.snail.jump);

let fsm = new StateMachine({
    init: 'menu',
    transitions: [
        {name: 'play', from: 'menu', to: 'game'},
        {name: 'visit', from: 'menu', to: 'shop'},
        {name: 'lose', from: 'game', to: 'death'},
        {name: 'win', from: 'game', to:'winscreen'},
        {name: 'quit', from: ['menu', 'game', 'death', 'shop', 'winscreen'], to: 'menu'},
        {name: 'restart', from: 'death', to: 'game'}
    ],
    methods: {
        onPlay: function() { 
            background.colour = "#111";
            ui.toPlay();
            level.resLevel(ctx);
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
            level.resLevel(ctx);
            level.start();
            ui.toPlay();
        },
        onWin: function(){
            background.colour = "#151";
            console.log("dammit");
            ui.toWin();
        }
    }
});

let keyListener = {
    pressed: {}, //set of pressed keys
    methods: {
        "a": (ts) => { //some methods take timestamp so all methods take timestamp
            if(fsm.state === "game") { player.moveX(ts, "l"); }
        },
        "d": (ts) => {
            if(fsm.state === "game") {  player.moveX(ts, "r"); }
        },
        "s": (ts) => {
            if(fsm.state === "game") { player.moveY(ts, "d"); }
            try { fsm.visit(); } catch { }
        },
        "w": (ts) => {
            if(fsm.state === "game") { player.moveY(ts, "u"); }
        },
        " ": (ts) => { 
            
        },
        "Enter": (ts) => {
            try { fsm.play(); } catch { }
            try { fsm.restart(); } catch {}
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

let level = new Level(player, 
    () => { try { fsm.lose(); } catch {}},
    () => { try { fsm.win(); } catch {}},
    keyListener.pressed
);
await level.parseLevel();
level.unpack(ctx);

document.body.addEventListener("keydown", (e) => {
    keyListener.pressed[e.key] = true;
});
document.body.addEventListener("keyup", (e) => {
    delete keyListener.pressed[e.key];

});

let background = {
    colour: "#555",
    draw: () => {
        ctx.fillStyle = background.colour;
        ctx.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);
    }
}

let dt = 0;
let pt = 0;
let frameID = 0;
let randDur = {"value":Math.floor(Math.random() * 3)}

const makeFrame = (timestamp) => {
    dt = timestamp - pt;
    pt = timestamp;
    
    background.draw();
    keyListener.update(timestamp);

    // console.log("timestamp mainloop:", timestamp)s
    level.update(timestamp, frameID);

    //animator.update(frameID);

    if (fsm.state === "game"){
        level.draw(ctx); 
        if(dt){
            //ui.hotbar.update(dt,frameID);
            //ui.hotbar.draw(ctx);
            player.update(dt, frameID);
            player.draw(ctx, timestamp);
        }
    } 
    ui.draw(ctx);
    //animator.draw(ctx, player.visualPos[0], player.visualPos[1], 165, 165);

    frameID++;
    requestAnimationFrame(makeFrame);
}

makeFrame();