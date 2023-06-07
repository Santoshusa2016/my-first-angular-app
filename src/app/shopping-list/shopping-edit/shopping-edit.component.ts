import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  //sec16:212
  subscription: Subscription; 
  editMode = false;
  editedItemIndex = -1;
  editedIngredient: Ingredient;
  @ViewChild('f', { static: false }) slform: NgForm;

  constructor(private slService: ShoppingListService){}


  ngOnInit() {
    this.subscription =  this.slService.startedEditing.subscribe(
      //method to be called on every edit item changed
      (index: number)=>{
        this.editedItemIndex = index;
        this.editMode= true; //we are editing item
        this.editedIngredient = this.slService.getIngredient(index);
        this.slform.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      });
  }

  onAddItemv1(nameInput:any):void{
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onSubmit(form: NgForm):void{
    const value = form.value; //get values in form
    console.log(value);

    //name, amount are input control name
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.slService.updateIngredient(this.editedItemIndex 
        ,newIngredient);        
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset(); //reset the form-224
  }

  ngOnDestroy(): void {    
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
