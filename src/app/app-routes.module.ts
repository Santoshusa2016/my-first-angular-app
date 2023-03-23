import { NgModule } from '@angular/core';
import { HomeComponent } from './routingApp/home/home.component';
import { UsersComponent } from './routingApp/users/users.component';
import { UserComponent } from './routingApp/users/user/user.component';
import { ServersComponent} from './routingApp/servers/servers.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'users', component: UsersComponent},
  {path:'users/:id/:name', component: UserComponent},
  {path:'servers', component: ServersComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
})
export class AppRoutesModule { }
