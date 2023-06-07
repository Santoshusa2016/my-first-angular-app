import { EventEmitter } from "@angular/core";
import { Ingredient } from "./ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>(); //sec14
    startedEditing = new Subject<number>(); //sec16
    
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
        this.ingredients.push(...ingredients); //spread operator
        //this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    //sec16
    getIngredient(index: number){
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1); //splice allows to delete item at given index and remove 1 item
        this.ingredientsChanged.next(this.ingredients);
    }
}