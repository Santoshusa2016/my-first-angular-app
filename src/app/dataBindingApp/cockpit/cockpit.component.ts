import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {

  /*Chapter:05 publish event*/
  @Output() serverCreated = new EventEmitter<
  {
    servername: string, 
    serverContent:string
  }>(); //adding parantheses would call constructor of event emitter to create a new event emitter
  @Output('bpCreated') blueprintCreated = new EventEmitter<{servername: string, serverContent:string}>();
 
  //2-way binding
  //newServerName = '';
  //newServerContent = '';

  //local reference
  @ViewChild('serverContentInput') serverContentInput:ElementRef;

  onAddServer(nameInput){
    console.log(nameInput.value); //get value from HTML element
    this.serverCreated.emit(
      {
        servername:nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
      });
  }

  onAddBlueprint(nameInput){
    this.blueprintCreated.emit(
      {
        servername:nameInput.value,
        //serverContent: this.newServerContent
        serverContent: this.serverContentInput.nativeElement.value
      });
  }
}
