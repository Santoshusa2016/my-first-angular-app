import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import {
  AddIngredient,
  DeleteIngredient,
  UpdateIngredient,
} from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  //sect16:212
  subscription: Subscription;
  editMode = false;
  editedItemIndex = -1;
  editedIngredient: Ingredient;
  @ViewChild('f', { static: false }) slform: NgForm;

  //sect26:398
  // constructor(
  //   private slService: ShoppingListService,
  //   private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  // ) {}
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      //method to be called on item edit
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true; //we are editing item
        this.editedIngredient = this.slService.getIngredient(index);
        this.slform.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onAddItemv1(nameInput: any): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onSubmitv1(form: NgForm): void {
    const value = form.value; //get values in form as JSON
    console.log(value);

    //name, amount are input control name
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset(); //reset the form-224
  }

  //sect26:394,396
  onSubmit(form: NgForm): void {
    const value = form.value; //get values in form as JSON
    console.log(value);

    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      );
    } else {
      this.store.dispatch(AddIngredient({ payload: newIngredient }));
    }
    this.editMode = false;
    form.reset(); //reset the form-224
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onClear() {
    this.slform.reset();
    this.editMode = false;
  }

  onDelete() {
    //sect26:396
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }
}
