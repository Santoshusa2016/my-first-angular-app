import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService {
  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let recipes = this.recipeService.getReceipes();

    //sect18:286
    if (recipes.length == 0) {
      //no need to subscribe to "fetchRecipes" since angular resolve will take care of it
      this.dataService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
