import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { AlertComponent } from './shared/alert/alert.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({ shoppingList: ShoppingListReducer }),
  ],
  bootstrap: [AppComponent],
  //320: Entry components : Not required for angular 9 & above
  entryComponents: [AlertComponent],
})
export class AppModule {}
