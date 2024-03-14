import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe; //initial undefined
  private recipeSelectedSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  
  ngOnInit(): void {
    this.recipeSelectedSub = this.recipeService.recipeSelected.subscribe(
      (data: Recipe) => (this.selectedRecipe = data)
      );
    }
    
    ngOnDestroy(): void {
      this.recipeSelectedSub.unsubscribe();
    }
}
