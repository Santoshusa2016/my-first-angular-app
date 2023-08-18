import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ReceipeService } from "./receipe.service";

@Injectable({ providedIn: "root" })
export class RecipesResolverService {
  constructor(
    private dataService: DataStorageService,
    private recipeService: ReceipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let recipes = this.recipeService.getReceipes();

    //sect18:286
    if (recipes.length == 0) {
      //no need to subscribe since angular resolver will take care of it
      this.dataService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
