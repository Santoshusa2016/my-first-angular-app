import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ServerComponent } from "./cmpbindingApp/server/server.component";
import { ServersComponent } from "./cmpbindingApp/servers/servers.component";
import { HeaderComponent } from "./header/header.component";
import { ReceipesComponent } from "./receipes/receipes.component";
import { ReceipeListComponent } from "./receipes/receipe-list/receipe-list.component";
import { ReceipeDetailComponent } from "./receipes/receipe-detail/receipe-detail.component";
import { ReceipeItemComponent } from "./receipes/receipe-list/receipe-item/receipe-item.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { LoggingService } from "./shared/logging.service";
import { AccountsService } from "./shared/accounts.service";
import { ShoppingListService } from "./shared/shopping-list.service";

/* Routing */
import { AuthService } from "./shared/auth.service";
import { AppRoutesModule } from "./app-routes.module";
import { AuthGuard } from "./shared/auth-guard.service";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RecipeEditComponent } from "./receipes/recipe-edit/recipe-edit.component";

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
    ServersComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    LoggingService,
    AccountsService,
    ShoppingListService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
