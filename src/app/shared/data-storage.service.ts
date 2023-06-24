import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ReceipeService } from "./receipe.service";
import { Receipe } from "../receipes/receipe.model";
import { map, tap } from "rxjs";
import { Ingredient } from "./ingredient.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipesSvc: ReceipeService
  ) {}

  //sect18:280
  storeRecipes() {
    //get all recipes from recipe service
    const recipes = this.recipesSvc.getReceipes();

    //firebase requires us to use put request for updating all data stored
    this.httpClient
      .put(
        "https://ng-course-recipebook-ae827-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  //sect18:283
  fetchRecipes() {
    //we would subscribe to recipes in headersComponent
    return this.httpClient
      .get<Receipe[]>(
        "https://ng-course-recipebook-ae827-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Receipe[]) => {
          this.recipesSvc.setRecipes(recipes);
        })
      );
  }
}
