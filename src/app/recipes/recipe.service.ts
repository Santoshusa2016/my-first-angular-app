import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AddIngredients } from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  //receipe selected in "receipe-item.component.ts"
  //public recipeSelected = new EventEmitter<Receipe>(); //sect11:119

  public recipeSelected = new Subject<Recipe>(); //sec14
  public recipesChanged = new Subject<Recipe[]>(); //sec16: 234

  private receipes_old: Recipe[] = [
    new Recipe(
      'Parotta',
      'parotta salna',
      'https://image.shutterstock.com/image-photo/parotta-indian-bread-made-flour-260nw-2198775675.jpg',
      [new Ingredient('small onion', 4), new Ingredient('coconut', 1)]
    ),
    new Recipe(
      'Idly Vada',
      'Idly(2) Vada(1)',
      'https://sanidli.com/wp-content/uploads/2020/03/idlii.jpg',
      [new Ingredient('urad dal', 1), new Ingredient('onion', 2)]
    ),
    new Recipe(
      'Poori Masala',
      'Poori(2) Masala',
      'https://rakskitchen.net/wp-content/uploads/2013/10/10183927034_e8f964d086_z.jpg',
      [new Ingredient('potato', 3), new Ingredient('chana dal', 20)]
    ),
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState> //
  ) {}

  //sect10:118
  getReceipes(): Recipe[] {
    console.log('recipe.service >> getReceipes');
    return this.recipes.slice(); //immutable array, return a copy
  }

  getRecipe(index: number) {
    console.log('recipe.service >> getRecipe');
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //sect10:123
    //this.slService.addIngredients(ingredients);
    //sect26:395
    this.store.dispatch(new AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    console.log('recipe.service >> addRecipe');
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    console.log('recipe.service >> updateRecipe');
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice()); //return new copy of recipe modified
  }

  //sect16:235
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice()); //return the new copy
  }

  //sect18:283
  setRecipes(recipes: Recipe[]) {
    console.log('recipe.service >> setRecipes');
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); //return the new copy
  }
}
