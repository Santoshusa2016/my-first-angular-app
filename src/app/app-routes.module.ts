import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';


import { ReceipesComponent } from './receipes/receipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ReceipeStartComponent } from './receipes/receipe-start/receipe-start.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { RecipeEditComponent } from './receipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  //{path:'', component: HomeComponent}, //default route when app is loaded
  {
    path:'',
    redirectTo:'/receipes', 
    pathMatch: 'full'
  },  
  {
    path:'receipes',
    component:ReceipesComponent,
    children: [
      {path:'', component: ReceipeStartComponent},
      {path:'new', component: RecipeEditComponent, pathMatch: 'full'},
      {path:':id', component: ReceipeDetailComponent},
      {path:':id/edit', component: RecipeEditComponent}
    ]
  },
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'**', redirectTo: '/error-not-found'} //catch-all routes
];

@NgModule({
  declarations: [],
  imports: [
    //RouterModule.forRoot(appRoutes, {useHash: true}) //#mode routing. location strategies
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
})
export class AppRoutesModule { }
