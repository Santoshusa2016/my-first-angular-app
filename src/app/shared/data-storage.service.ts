import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";

import { ReceipeService } from "../receipes/receipe.service";
import { Receipe } from "../receipes/receipe.model";
import { AuthService } from "../auth/auth-service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipesSvc: ReceipeService,
    private authSvc: AuthService
  ) {}

  //sect18:280
  storeRecipes() {
    //get all recipes from recipe service
    const recipes = this.recipesSvc.getReceipes();

    console.log("data-storage.service>> storeRecipes");
    console.log(recipes);

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
    //we would subscribe to recipes in headersComponent menu select event
    //take operator: just subscribe once and then unsubscribe
    //exhaustMap operator: chain observables. Input from user >> exhaustmap
    return this.authSvc.user.pipe(
      take(1),
      exhaustMap((user) => {
        //return new observable
        return this.httpClient.get<Receipe[]>(
          "https://ng-course-recipebook-ae827-default-rtdb.firebaseio.com/recipes.json",
          {
            params: new HttpParams().set("auth", user.token), //sect20:302 Add query param
          }
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          console.log("data-storage.service>> fetchRecipes");
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes: Receipe[]) => {
        //set recipes in recipeService
        this.recipesSvc.setRecipes(recipes);
      })
    );
  }
}
