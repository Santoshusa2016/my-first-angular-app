import { Component } from "@angular/core";


//we use curly braces for import is because from file we are importing we can import other items too
@Component({
selector: 'app-server',
templateUrl: './server.component.html',
styles: [`
    .online{
        color: white;
    }
`]
})

export class ServerComponent{

    //Data binding: string interpolation
    serverId: number = 10;
    servername: string = "mycomputer";
    serverstatus: string = "offline";

    /**
     *
     */
    constructor() {
        let randomNum = Math.random();
        console.log(randomNum);
        this.serverstatus = randomNum > 0.50 ? "online": "offline";        
    }

    getServerStatus(){
        return this.serverstatus;
    }

    getColor(){
        return this.serverstatus === "online" ? "green": "red";
    }
    
}