import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './cmpbindingApp/server/server.component';
import { ServersComponent } from './cmpbindingApp/servers/servers.component';
import { HeaderComponent } from './header/header.component';
import { ReceipesComponent } from './receipes/receipes.component';
import { ReceipeListComponent } from './receipes/receipe-list/receipe-list.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { ReceipeItemComponent } from './receipes/receipe-list/receipe-item/receipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { CockpitComponent } from './dataBindingApp/cockpit/cockpit.component';
import { ServerElementComponent } from './dataBindingApp/server-element/server-element.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { DropDownDirective } from './shared/dropdown.directive';
import { UnlessDirective } from './directives/unless.directive';
import { AccountComponent } from './servicesApp/account/account.component';
import { NewAccountComponent } from './servicesApp/new-account/new-account.component';
import { LoggingService } from './shared/logging.service';
import { AccountsService } from './shared/accounts.service';
import { ShoppingListService } from './shared/shopping-list.service';

import { ServersService } from './routingApp/servers/servers.service';
import { HomeComponent } from './routingApp/home/home.component';
import { UsersComponent } from './routingApp/users/users.component';
import { UserComponent } from './routingApp/users/user/user.component';
import { EditServerComponent } from './routingApp/servers/edit-server/edit-server.component';
import { ServerComponent as routeServerComp} from './routingApp/servers/server/server.component';
import { ServersComponent as routeServersComp } from './routingApp/servers/servers.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { AppRoutesModule } from './app-routes.module';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    HeaderComponent,
    ReceipesComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    CockpitComponent,
    ServerElementComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropDownDirective,
    AccountComponent,
    NewAccountComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    routeServerComp,
    routeServersComp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [
      LoggingService
    , AccountsService
    , ShoppingListService
    , ServersService
    , AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
