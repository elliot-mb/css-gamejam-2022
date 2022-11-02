export default class UI{
    constructor(){
        this.layout = () => {};
        this.header = {
            h1: '150px sans-serif',
            h2: '100px sans-serif',
            h3: '50px sans-serif',
            h4: '35px sans-serif'
        }
    };

    toPlay(){
        // show hearts and corrupt bar
        this.layout = (c) => {
            c.fillStyle = "#99f";
            c.font = this.header.h3;
            c.fillText("Health", 40, 100);
            c.fillText("Corruption", 450, 100);
            c.fillText("$", 1050, 100);
            c.font = this.header.h4;
            c.fillText("<- Backspace to abandon run", 40, 150);
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
            c.fillStyle = "#fff";
            c.font = this.header.h1;
            c.fillText("You died", 40, 130);
            
        };
    }

    toGame(){

    }

    update(){

    }

    draw(c){
        this.layout(c);
    }
}