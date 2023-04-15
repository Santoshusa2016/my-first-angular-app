import { Component, Input, OnInit } from '@angular/core';
import { ReceipeService } from 'src/app/shared/receipe.service';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  @Input() recipe:Receipe;
  constructor(private recipeService: ReceipeService) { }
  
  ngOnInit(): void {
    console.log(this.recipe);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
