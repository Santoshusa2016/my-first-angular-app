import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loadingSpinner/loading-spinner.component';
import { DropDownDirective } from './dropdown.directive';
import { LoggingService } from './logging.service';
import { DataStorageService } from './data-storage.service';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropDownDirective,
    PlaceholderDirective,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropDownDirective,
    CommonModule,
    PlaceholderDirective,
    AlertComponent,
  ],
})
//without exports the module referring SharedModule will not have access to Common, LoadingSpinner or DropDownDirective
export class SharedModule {}
