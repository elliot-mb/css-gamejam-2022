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
            c.fillText("Health", 50, 100);
            c.fillText("Corruption", 250, 100);
            c.fillText("$", 650, 100);
        }
    }

    toShop(){
        // show shop items
        this.layout = (c) => {
            c.fillStyle = "#f99";
            c.font = this.header.h2;
            c.fillText("Shop", 40, 150);
        }
    }

    toMenu(){
        // show menu
        this.layout = (c) => {
            c.fillStyle = "#fff";
            c.font = this.header.h2;
            c.fillText("Menu", 40, 150);
            
        };
    }

    toLose(){
        // 
        this.layout = (c) => {
            c.fillStyle = "#fff";
            c.font = this.header.h1;
            c.fillText("You died", 40, 150);
            
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