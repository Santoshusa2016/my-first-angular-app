import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReceipeService } from '../shared/receipe.service';
import { Receipe } from './receipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css'],
  providers:[ReceipeService]
})

export class ReceipesComponent implements OnInit, OnDestroy {
  selectedReceipe: Receipe; //initial undefined
  private recipeSelectedSub : Subscription;

  constructor(private receipeService: ReceipeService) {}

  ngOnDestroy(): void {
    this.recipeSelectedSub.unsubscribe();  
  }

  ngOnInit(): void {
    this.recipeSelectedSub = this.receipeService.recipeSelected.subscribe(
      (data:Receipe) => this.selectedReceipe = data
    );
  }
}
