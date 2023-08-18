import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./shared/logging.service";
import { ReceipeService } from "./receipes/receipe.service";
import { AccountsService } from "./shared/accounts.service";

@NgModule({
  providers: [
    ShoppingListService,
    AccountsService,
    ReceipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true, //allow multiple interceptors
    },
  ],
})
export class CoreModule {}
