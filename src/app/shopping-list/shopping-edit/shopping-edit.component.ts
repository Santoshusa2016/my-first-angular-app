import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild("amountInput", {static: false}) refAmountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(nameInput:any):void{
    //pass data from child component to parent component
    const newIngredient = new Ingredient(nameInput.value, this.refAmountInput.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
  }
}
