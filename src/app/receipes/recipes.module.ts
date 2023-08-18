import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReceipesComponent } from "./receipes.component";
import { ReceipeListComponent } from "./receipe-list/receipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReceipeDetailComponent } from "./receipe-detail/receipe-detail.component";
import { ReceipeItemComponent } from "./receipe-list/receipe-item/receipe-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations: [
    ReceipesComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    RecipeEditComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [RecipesRoutingModule],
})
export class RecipesModule {}
