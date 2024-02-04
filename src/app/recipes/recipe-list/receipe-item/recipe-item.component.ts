import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent implements OnInit {
  @Input() receipe: Recipe;
  @Input() index: Number;

  //87: Display selected recipe in details page
  //@Output() receipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    console.log(this.receipe);
  }

  onSelected(): void {
    console.log('item selected');
    //this.receipeSelected.emit();

    //sect10:119 (instead of emitting event we will use service)
    //this event sub will be handled by receipeservice
    this.recipeService.recipeSelected.next(this.receipe);
  }
}
