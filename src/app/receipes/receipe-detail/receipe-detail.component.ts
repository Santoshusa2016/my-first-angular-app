import { Component, OnInit } from '@angular/core';
import { ReceipeService } from 'src/app/shared/receipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  //@Input() recipe:Receipe; //this will no longer be input but we would get ID from route param
  recipe:Receipe;
  id: number;

  constructor(private recipeService: ReceipeService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit(): void {
    //subscribe to params
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
}
