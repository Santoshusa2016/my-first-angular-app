import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthNGuard } from "../auth/auth.guard";
import { ReceipeDetailComponent } from "./receipe-detail/receipe-detail.component";
import { ReceipesComponent } from "./receipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipe-resolver.service";

const routes: Routes = [
  {
    path: "", //sect22:332 - removed path:"recipes"
    component: ReceipesComponent,
    canActivate: [AuthNGuard],
    children: [
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: ReceipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
