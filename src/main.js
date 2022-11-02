import UI from "./ui.js";

let canvas = document.getElementById("canvas"); 
let c = canvas.getContext("2d"); 
const INITIAL_WIDTH = 1920;
const INITIAL_HEIGHT = 1080;

const ui = new UI(); ui.toMenu();

let fsm = new StateMachine({
    init: 'menu',
    transitions: [
        {name: 'play', from: 'menu', to: 'game'},
        {name: 'play', from: 'game', to: 'game'},
        {name: 'play', from: 'shop', to: 'shop'},
        {name: 'play', from: 'death', to: 'death'},
        {name: 'visit', from: 'menu', to: 'shop'},
        {name: 'visit', from: 'shop', to: 'shop'},
        {name: 'visit', from: 'game', to: 'game'},
        {name: 'quit', from: ['menu', 'game', 'death', 'shop'], to: 'menu'},
        {name: 'lose', from: 'game', to: 'death'},
        {name: 'restart', from: 'death', to: 'game'}
    ],
    methods: {
        onPlay: function() { 
            background.colour = "#111";
            ui.toPlay();
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

let keyListener = {
    pressed: {}, //set of pressed keys
    methods: {
        "a": () => {},
        "d": () => {},
        "s": () => {
            fsm.visit();
        },
        "w": () => {
            
        },
        " ": () => { 
            
        },
        "Enter": () => {
            fsm.play();
        },
        "Backspace": () => {
            fsm.quit();
        }
    },
    update: () => {
        for(let k in keyListener.pressed) {
            let methodOrUndefined = keyListener.methods[k];
            
            if(methodOrUndefined){
                methodOrUndefined();
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

const makeFrame = (timestamp) => {
    dt = timestamp - pt;
    pt = timestamp;
    
    background.draw();
    keyListener.update();

    ui.draw(c);

    requestAnimationFrame(makeFrame);
}

makeFrame();