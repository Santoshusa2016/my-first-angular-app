import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', //element selector
  // selector: '[app-servers]', //attribute-selector
  // selector: '.app-servers', //class-selector
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>
  // `,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit{
  //Data binding: property binding
  allowNewServer = false;  
  serverCount = 0;
  
  serverCreationStatus: string = "Creating...";
  serverName='Enter sever name'; //2way data-binding
  isServerCreated:boolean = false;
  servers:Array<string> = [];

  constructor(){
    setTimeout(() => {
      this.allowNewServer = true; //property binding
    }, 2000);
  }

  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  //Data binding: event handler
  onAddServer_Clicked(){
    this.serverCount++;
    this.servers.push(this.serverName);
    this.isServerCreated = true;
    this.serverCreationStatus = this.serverName + " server created"; 
  }

  onKeyPress(event: any){
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value; //targetcast to input type
  }
}
