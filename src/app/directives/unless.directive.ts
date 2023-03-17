import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  //turn input prop to a method. the setter gets executed whenever prop changes
  @Input() set appUnless(condition: boolean){
    if(condition === false){
      this.vcRef.createEmbeddedView(this.tempRef);
    }else{
      this.vcRef.clear();
    }
  }

  constructor(private tempRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
