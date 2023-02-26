import { Component, OnInit } from '@angular/core';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {

  receipes:Receipe[] = [
    new Receipe("Parotta","parotta salna",
    "https://image.shutterstock.com/image-photo/parotta-indian-bread-made-flour-260nw-2198775675.jpg")
  ];

  constructor(){

  }

  ngOnInit(): void {
    console.log('Method not implemented.');
  }

}
