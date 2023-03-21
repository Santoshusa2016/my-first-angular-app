import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReceipeService } from 'src/app/shared/receipe.service';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  //event emitter
  //@Output() receipeItemSelected = new EventEmitter<Receipe>();
  receipes: Receipe[];

  constructor(private receipeSvc: ReceipeService){
  }

  //chap09: services & DI
  ngOnInit(): void {
    this.receipes = this.receipeSvc.getReceipe();
  }

  //chapter06: Event/Data binding
  /*onReceipeSelected(receipe:Receipe){
    this.receipeItemSelected.emit(receipe);
  }*/

}
