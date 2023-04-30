import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  private ingredientsChanged: Subscription; //sec14
  ingredients: Ingredient[];

  //chap09: DI & Services
  constructor(private slService: ShoppingListService){}
  

  ngOnInit(): void {
    //all initialization logic goes to nginit
    this.ingredients = this.slService.getIngredients();
    
    //subscribe to new ingredients added event
    this.ingredientsChanged = this.slService.ingredientsChanged.subscribe(
                          (ingredients: Ingredient[]) => {
                            this.ingredients = ingredients;
                          }
    );
  }

  ngOnDestroy(): void {
    //sec14
    this.ingredientsChanged.unsubscribe();
  }
}
