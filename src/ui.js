import Hotbar from "./hotbar.js";

export default class UI{
    constructor(){
        this.layout = () => {};
        this.header = {
            h1: '150px sans-serif',
            h2: '100px sans-serif',
            h3: '50px sans-serif',
            h4: '35px sans-serif'
        }
        this.hotbar = new Hotbar(
            {
                "nametag":"hotbar",
                "pos":[960, 1080], //should be bottom mid of screen
                "visible":true,
                "collides":false,   
            }
        )
    };

    toPlay(){
        // show hearts and corrupt bar
        this.layout = (c) => {
            c.fillStyle = "#99f";
            c.font = this.header.h3;
            c.fillText("Health", 10, 50);
            c.fillText("Corruption", 425, 50);
            c.fillText("$", 1025, 50);
            c.font = this.header.h4;
            c.fillText("<- Backspace to abandon run", 10, 1070);
            // this.hotbar.update(dt,frameID);
            // this.hotbar.draw(c);
            c.fillText("HOTBAR", 960, 1080);
        }
    }

    toShop(){
        // show shop items
        this.layout = (c) => {
            c.fillStyle = "#f99";
            c.font = this.header.h2;
            c.fillText("Shop", 40, 150);
            c.font = this.header.h4;
            c.fillText("<- Backspace to return to menu", 40, 225);
            // hotbar.update(dt,frameID);
            // hotbar.draw(ctx);
        }
    }

    toMenu(){
        // show menu
        this.layout = (c) => {
            c.fillStyle = "#fff";
            c.font = this.header.h1;
            c.fillText("Bugger!", 40, 150);
            c.font = this.header.h2;
            c.fillText("Menu", 75, 300);
            c.font = this.header.h4;
            c.fillText("-> Enter to begin a run", 75, 375);
            c.fillText("-> 'S' to enter the shop", 75, 425);
        };
    }

    toLose(){
        // 
        this.layout = (c) => {
            c.fillStyle = "#f11";
            c.font = this.header.h1;
            c.fillText("You died", 40, 130);
            
        };
    }

    update(){

    }

    draw(c){
        this.layout(c);
    }
}