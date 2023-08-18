import { EventEmitter, Injectable } from "@angular/core";
import { Receipe } from "./receipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ReceipeService {
  //receipe selected in "receipe-item.component.ts"
  //public receipeSelected = new EventEmitter<Receipe>();
  public recipeSelected = new Subject<Receipe>(); //sec14
  public recipesChanged = new Subject<Receipe[]>(); //sec16: 234

  private receipes_old: Receipe[] = [
    new Receipe(
      "Parotta",
      "parotta salna",
      "https://image.shutterstock.com/image-photo/parotta-indian-bread-made-flour-260nw-2198775675.jpg",
      [new Ingredient("small onion", 4), new Ingredient("coconut", 1)]
    ),
    new Receipe(
      "Idly Vada",
      "Idly(2) Vada(1)",
      "https://sanidli.com/wp-content/uploads/2020/03/idlii.jpg",
      [new Ingredient("urad dal", 1), new Ingredient("onion", 2)]
    ),
    new Receipe(
      "Poori Masala",
      "Poori(2) Masala",
      "https://rakskitchen.net/wp-content/uploads/2013/10/10183927034_e8f964d086_z.jpg",
      [new Ingredient("potato", 3), new Ingredient("chana dal", 20)]
    ),
    new Receipe(
      "Tasty Schnitzel",
      "A super-tasty Schnitzel - just awesome!",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Receipe(
      "Big Fat Burger",
      "What else you need to say?",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    ),
  ];

  private recipes: Receipe[] = [];

  constructor(private slService: ShoppingListService) {}

  getReceipes(): Receipe[] {
    console.log("recipe.service >> getReceipes");
    console.log(this.recipes);
    return this.recipes.slice(); //immutable array, return a copy
  }

  getRecipe(index: number) {
    console.log("recipe.service >> getRecipe");
    console.log(this.recipes[index]);
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Receipe) {
    console.log("recipe.service >> addRecipe");
    console.log(recipe);

    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Receipe) {
    console.log("recipe.service >> updateRecipe");
    console.log(newRecipe);

    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  //sect16:235
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  //sect18:283
  setRecipes(recipes: Receipe[]) {
    console.log("recipe.service >> setRecipes");
    console.log(recipes);

    this.recipes = recipes;
    //push recipes to everyone
    this.recipesChanged.next(this.recipes.slice());
  }
}
