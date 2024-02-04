import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  //ingredientsChanged = new EventEmitter<Ingredient[]>();//sec11:120
  ingredientsChanged = new Subject<Ingredient[]>(); //sec14
  startedEditing = new Subject<number>(); //sec16: 221

  //data store
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('mango', 5),
    new Ingredient('banana', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientsChanged.emit(this.ingredients.slice());//sect10:120
    this.ingredientsChanged.next(this.ingredients.slice()); //sect14
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); //spread operator
    //this.ingredientsChanged.emit(this.ingredients.slice()); //sect10:123
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //sect16
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1); //splice allows to delete item at given index and remove 1 item
    this.ingredientsChanged.next(this.ingredients);
  }
}
