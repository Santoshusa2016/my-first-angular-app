import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReceipeService } from 'src/app/shared/receipe.service';
import { Receipe } from '../../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})

export class ReceipeItemComponent implements OnInit {
 @Input()receipe: Receipe;
 @Input()index: Number;
 
 //@Output() receipeSelected = new EventEmitter<void>();

 constructor(private receipeService: ReceipeService){
 }

 ngOnInit(): void {
  console.log(this.receipe);
  } 

onSelected():void{
  //this.receipeSelected.emit(); //this event sub will be handled by receipeservice
  this.receipeService.receipeSelected.emit(this.receipe);
}

}
