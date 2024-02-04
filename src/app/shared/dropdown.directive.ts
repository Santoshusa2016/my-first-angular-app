import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false; //css class to open dropdown

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    console.log(
      'drop-down directive:',
      this.elRef.nativeElement.contains(event.target)
    );
    this.isOpen = !this.isOpen;
  }

  constructor(private elRef: ElementRef) {}
}
