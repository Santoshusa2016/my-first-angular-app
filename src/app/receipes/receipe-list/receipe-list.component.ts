import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  //event
  @Output() receipeItemSelected = new EventEmitter<Receipe>();

  receipes:Receipe[] = [
    new Receipe("Parotta","parotta salna",
    "https://image.shutterstock.com/image-photo/parotta-indian-bread-made-flour-260nw-2198775675.jpg"),
    new Receipe("Idly Vada","Idly(2) Vada(1)",
    "https://sanidli.com/wp-content/uploads/2020/03/idlii.jpg"),
    new Receipe("Poori Masala","Poori(2) Masala",
    "https://rakskitchen.net/wp-content/uploads/2013/10/10183927034_e8f964d086_z.jpg")
    
  ];

  constructor(){
  }

  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  //chapter06: Event/Data binding
  onReceipeSelected(receipe:Receipe){
    this.receipeItemSelected.emit(receipe);
  }

}
