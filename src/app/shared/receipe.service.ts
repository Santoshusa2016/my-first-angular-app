import { EventEmitter, Injectable } from "@angular/core";
import { Receipe } from "../receipes/receipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class ReceipeService{
 
    //receipe selected in "receipe-item.component.ts"
    public receipeSelected = new EventEmitter<Receipe>();

    private receipes:Receipe[] = [
        new Receipe(
            "Parotta",
            "parotta salna",
            "https://image.shutterstock.com/image-photo/parotta-indian-bread-made-flour-260nw-2198775675.jpg",
            [
                new Ingredient('small onion', 4),
                new Ingredient('coconut', 1)
            ]),
        new Receipe(
            "Idly Vada",
            "Idly(2) Vada(1)",
            "https://sanidli.com/wp-content/uploads/2020/03/idlii.jpg",
            [
                new Ingredient('urad dal', 1),
                new Ingredient('onion', 2)
            ]),
        new Receipe(
            "Poori Masala",
            "Poori(2) Masala",
            "https://rakskitchen.net/wp-content/uploads/2013/10/10183927034_e8f964d086_z.jpg",
            [
                new Ingredient('potato', 3),
                new Ingredient('chana dal', 20)
            ]),
        new Receipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
              new Ingredient('Meat', 1),
              new Ingredient('French Fries', 20)
            ]),
        new Receipe('Big Fat Burger',
                    'What else you need to say?',
                    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Meat', 1)
                ])
        
      ];

    constructor(private slService: ShoppingListService) {}

    getReceipe():Receipe[]{
        return this.receipes.slice(); //immutable array, return a copy
    }

    getRecipe(index: number) {
        return this.receipes[index];
      }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}