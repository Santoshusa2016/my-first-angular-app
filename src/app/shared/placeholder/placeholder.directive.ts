import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public viewcontainerRef: ViewContainerRef) {
    //dependency injection of VCRef will give access to point in component where this directive is used
  }
}
