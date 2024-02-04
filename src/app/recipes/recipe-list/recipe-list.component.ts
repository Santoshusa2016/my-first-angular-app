import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //event emitter,
  @Output() receipeItemSelected = new EventEmitter<Recipe>();
  receipes: Recipe[];
  subscription: Subscription;

  constructor(
    private receipeSvc: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //chap09: services & DI
  ngOnInit(): void {
    this.receipes = this.receipeSvc.getReceipes();

    //sect16:234
    this.subscription = this.receipeSvc.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.receipes = recipes;
      }
    );
  }

  //chapter06: 87: Event/Data binding
  onReceipeSelected(receipe: Recipe) {
    this.receipeItemSelected.emit(receipe);
  }

  //chapter11: Routing
  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route }); //relative route
  }

  //sect16:239
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
