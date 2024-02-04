import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { AccountsService } from './shared/accounts.service';
import { LoggingService } from './shared/logging.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  providers: [
    AccountsService,
    RecipeService,
    LoggingService,
    DataStorageService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true, //allow multiple interceptors
    },
  ],
})
export class CoreModule {}
