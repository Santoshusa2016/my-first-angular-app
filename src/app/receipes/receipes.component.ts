import { Component, OnInit } from '@angular/core';
import { ReceipeService } from '../shared/receipe.service';
import { Receipe } from './receipe.model';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css'],
  providers:[ReceipeService]
})

export class ReceipesComponent implements OnInit {
  selectedReceipe: Receipe; //initial undefined
  /**
   *
   */
  constructor(private receipeService: ReceipeService) {}

  ngOnInit(): void {
    this.receipeService.receipeSelected.subscribe(
      (data:Receipe) => this.selectedReceipe = data
    );
  }
}
