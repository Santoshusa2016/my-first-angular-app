import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingSpinnerComponent } from "./loadingSpinner/loading-spinner.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [LoadingSpinnerComponent, DropDownDirective],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, DropDownDirective, CommonModule],
  //entryComponents: [AlertComponent],
  providers: [LoggingService],
})
export class SharedModule {}
