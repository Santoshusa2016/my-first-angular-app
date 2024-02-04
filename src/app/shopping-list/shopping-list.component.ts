import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientsChanged: Subscription; //sec14

  //ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  //chap09: DI & Services
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList'); //sect26:393
    console.log(this.ingredients);
    /*
    //all initialization logic goes to nginit
    this.ingredients = this.slService.getIngredients();

    //subscribe to new ingredients added event
    this.ingredientsChanged = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    */
  }

  //sect14
  ngOnDestroy(): void {
    //this.ingredientsChanged.unsubscribe();
  }

  //sect16-221: Pass index to subject so it can be listened anywhere else
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
