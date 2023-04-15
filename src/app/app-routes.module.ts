import { NgModule } from '@angular/core';
import { HomeComponent } from './routingApp/home/home.component';
import { UsersComponent } from './routingApp/users/users.component';
import { UserComponent } from './routingApp/users/user/user.component';
import { ServersComponent} from './routingApp/servers/servers.component';

import { RouterModule, Routes } from '@angular/router';
import { EditServerComponent } from './routingApp/servers/edit-server/edit-server.component';
import { ServerComponent } from './routingApp/servers/server/server.component';
import { PageNotFoundComponent } from './routingApp/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth-guard.service';
import { CanDeactivateGuard } from './routingApp/servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './routingApp/error-page/error-page.component';
import { ServerResolver } from './routingApp/servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'users', component: UsersComponent, children:[
    {path:':id/:name', component: UserComponent}
  ]},
  
  {
    path:'servers', 
    //canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    component: ServersComponent, 
    children:[
    {
      path: ':id', 
      component:ServerComponent, 
      resolve:{server: ServerResolver} //data returned by resolver will be stored in "server" prop
    },
    {
      path: ':id/edit', 
      component:EditServerComponent,
      canActivate:[CanDeactivateGuard] //route to stop user from navigating away
    }
  ]},
  {path:'not-found', component: PageNotFoundComponent, pathMatch: 'full'},
  {path:'error-not-found', component:ErrorPageComponent, data:{message:'Page not found'}},
  {path:'**', redirectTo: '/error-not-found'}

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
