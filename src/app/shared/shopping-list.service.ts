import { EventEmitter } from "@angular/core";
import { Ingredient } from "./ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>(); //sec14

    private ingredients: Ingredient[] =[
        new Ingredient("apple", 5),
        new Ingredient("mango", 5),
        new Ingredient("banana", 5)
      ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice()); //sec14
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        //this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());//sec14
      }
}